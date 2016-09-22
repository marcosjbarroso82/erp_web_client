var myApp = angular.module('myApp', [
    'ng-admin',
    'ng-admin.jwt-auth',
    'cart',
]);

// custom API flavor
var apiFlavor = require('./api_flavor');
myApp.config(['RestangularProvider', apiFlavor.requestInterceptor]);
//myApp.config(['RestangularProvider', apiFlavor.responseInterceptor]);



// custom 'amount' type
myApp.config(['NgAdminConfigurationProvider', 'FieldViewConfigurationProvider', function(nga, fvp) {
    nga.registerFieldType('amount', require('./types/AmountField'));
    fvp.registerFieldView('amount', require('./types/AmountFieldView'));
}]);

// custom directives
myApp.directive('dashboardSummary', require('./dashboard/dashboardSummary'));

// custom controllers
myApp.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html
    $scope.username =  $window.localStorage.getItem('posters_galore_login');
}]);


myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create the admin application
    var admin = nga.application('ERP')
        .baseApiUrl('http://127.0.0.1:8000/api/v1/');

    // add entities
    admin.addEntity(nga.entity('addresses'));
    admin.addEntity(nga.entity('orderItems').url('order-items'));
    admin.addEntity(nga.entity('orders'));

    admin.addEntity(nga.entity('deliveries'));
    admin.addEntity(nga.entity('deliveryGroups').url('delivery-groups'));
    admin.addEntity(nga.entity('distributions'));

    admin.addEntity(nga.entity('clients'));
    admin.addEntity(nga.entity('employees'));
    admin.addEntity(nga.entity('providers'));
    
    admin.addEntity(nga.entity('products'));
    admin.addEntity(nga.entity('productsStock').url('products-stock'));
    admin.addEntity(nga.entity('IOProductsStock').url('io-products-stock'));

    admin.addEntity(nga.entity('payments'));

    admin.addEntity(nga.entity('itemResources').url('item-resources'));
    admin.addEntity(nga.entity('resourcesStock').url('resources-stock'));
    admin.addEntity(nga.entity('IOResourcesStock').url('io-resources-stock'));

    // configure entities
    require('./addresses/config')(nga, admin);
    require('./order-items/config')(nga, admin);
    require('./orders/config')(nga, admin);

    require('./deliveries/config')(nga, admin);
    require('./delivery_groups/config')(nga, admin);
    require('./distributions/config')(nga, admin);

    require('./clients/config')(nga, admin);
    require('./employees/config')(nga, admin);
    require('./providers/config')(nga, admin);

    require('./products/config')(nga, admin);
    require('./products_stock/config')(nga, admin);
    require('./io_products_stock/config')(nga, admin);

    require('./payments/config')(nga, admin);
    
    require('./item_resources/config')(nga, admin);
    require('./resources_stock/config')(nga, admin);
    require('./io_resources_stock/config')(nga, admin);

    admin.dashboard(require('./dashboard/config')(nga, admin));
    admin.header(require('./header.html'));
    admin.menu(require('./menu')(nga, admin));

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);


myApp.config(function ($stateProvider, $urlRouterProvider) {

   $stateProvider.state('cart', {
        parent: 'main',
        url: '/cart',
//        params: { id: null },
        controller: 'CartCtrl',
        controllerAs: 'vm',
        templateUrl: '/js/cart/templates/cart.html'
    });
    $urlRouterProvider.otherwise('/login');
});


myApp.config(['ngAdminJWTAuthConfiguratorProvider',
    function (ngAdminJWTAuthConfigurator) {
        ngAdminJWTAuthConfigurator.setJWTAuthURL('http://127.0.0.1:8000/api/v1/api-token-auth');
        ngAdminJWTAuthConfigurator.setCustomAuthHeader({
            name: 'Authorization',
            template: 'JWT {{token}}'
        });
        ngAdminJWTAuthConfigurator.setCustomLoginTemplate('/login.html');
        ngAdminJWTAuthConfigurator.setLoginSuccessCallback(function () {
            window.location.href = '/';
        })
    }
    ]);

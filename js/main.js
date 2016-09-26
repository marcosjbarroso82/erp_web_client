var endpoint = 'http://127.0.0.1:8000/api/v1/';

var myApp = angular.module('myApp', [
    'ng-admin',
    'ng-admin.jwt-auth',
    //'cart',
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

function fix_url(url){

}

myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create the admin application
    var admin = nga.application('ERP')
        .baseApiUrl(endpoint);

    // add entities
    admin.addEntity(nga.entity('addresses'));
    admin.addEntity(nga.entity('tickets'));
    admin.addEntity(nga.entity('balances'));
    admin.addEntity(nga.entity('orderItems').url(function(entityName, viewType, identifierValue, identifierName) {
        var url = 'order-items';
        return (identifierValue != undefined) ? url + '/' + identifierValue : url;
    }));
    admin.addEntity(nga.entity('orders'));

    admin.addEntity(nga.entity('deliveries'));
    admin.addEntity(nga.entity('deliveryGroups').url(function(entityName, viewType, identifierValue, identifierName) {
        var url = 'delivery-groups';
        return (identifierValue != undefined) ? url + '/' + identifierValue : url;
    }));
    admin.addEntity(nga.entity('distributions'));

    admin.addEntity(nga.entity('clients'));
    admin.addEntity(nga.entity('employees'));
    admin.addEntity(nga.entity('providers'));
    
    admin.addEntity(nga.entity('products'));
    admin.addEntity(nga.entity('productsStock').url(function(entityName, viewType, identifierValue, identifierName) {
        var url = 'products-stock';
        return (identifierValue != undefined) ? url + '/' + identifierValue : url;
    }));
    admin.addEntity(nga.entity('IOProductsStock').url(function(entityName, viewType, identifierValue, identifierName) {
        var url = 'io-products-stock';
        return (identifierValue != undefined) ? url + '/' + identifierValue : url;
    }));

    admin.addEntity(nga.entity('payments'));

    admin.addEntity(nga.entity('itemResources').url(function(entityName, viewType, identifierValue, identifierName) {
        var url = 'item-resources';
        return (identifierValue != undefined) ? url + '/' + identifierValue : url;
    }));
    admin.addEntity(nga.entity('resourcesStock').url(function(entityName, viewType, identifierValue, identifierName) {
        var url = 'resources-stock';
        return (identifierValue != undefined) ? url + '/' + identifierValue : url;
    }));
    admin.addEntity(nga.entity('IOResourcesStock').url(function(entityName, viewType, identifierValue, identifierName) {
        var url = 'io-resources-stock';
        return (identifierValue != undefined) ? url + '/' + identifierValue : url;
    }));

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
    require('./tickets/config')(nga, admin);
    require('./balances/config')(nga, admin);

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


myApp.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('es', {
      'BACK': 'Atras',
      'DELETE': 'Eliminar',
      'CREATE': 'Crear',
      'EDIT': 'Editar',
      'EXPORT': 'Exportar',
      'ADD_FILTER': 'Filtrar',
      'SEE_RELATED': 'Ver {{ entityName }} asociados.',
      'LIST': 'Lista',
      'SHOW': 'Detalle',
      'SAVE': 'Guardar',
      'N_SELECTED': '{{ length }} seleccionados',
      'ARE_YOU_SURE': 'Este cambio es permanente. ¿Puede confirmar?',
      'YES': 'Si',
      'NO': 'No',
      'FILTER_VALUES': 'Filtros',
      'CLOSE': 'Cerrar',
      'CLEAR': 'Limpiar',
      'CURRENT': 'Actual',
      'REMOVE': 'Eliminar',
      'ADD_NEW': 'Agregar un nuevo {{ name }}',
      'BROWSE': 'Navegador',
      'N_COMPLETE': '{{ progress }}% terminado',
      'CREATE_NEW': 'Crear',
      'SUBMIT': 'Enviar',
      'SAVE_CHANGES': 'Guardar cambios',
      'BATCH_DELETE_SUCCESS': 'Eliminacion registrada',
      'DELETE_SUCCESS': 'Se elimino con exito.',
      'ERROR_MESSAGE': 'Error en el servidor (codigo: {{ status }})',
      'INVALID_FORM': 'Formulario invalido',
      'CREATION_SUCCESS': 'Se creo con exito.',
      'EDITION_SUCCESS': 'Se modifico con exito.',
      'ACTIONS': 'Acciones',
      'PAGINATION': '<strong>{{ begin }}</strong> - <strong>{{ end }}</strong> en <strong>{{ total }}</strong>',
      'NO_PAGINATION': 'No hay resultados.',
      'PREVIOUS': '« Anterior',
      'NEXT': 'Siguiente »',
      'DETAIL': 'Detalle',
      'STATE_CHANGE_ERROR': 'Error de rutas: {{ message }}',
      'NOT_FOUND': 'Página no encontrada',
      'NOT_FOUND_DETAILS': 'La página solicitada no existe. Volver a la página anterior y probar algo diferente.',
    });
    $translateProvider.preferredLanguage('es');
}]);
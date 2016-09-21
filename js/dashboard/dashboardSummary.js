import dashboardSummaryTemplate from './dashboardSummary.html';


var has_seen_alert = false;

function dashboardSummary(Restangular) {
    'use strict';

    return {
        restrict: 'E',
        scope: {},
        controller: function($scope) {
            $scope.stats = {};
            $scope.has_seen_alert = has_seen_alert;
            $scope.dismissAlert = () => {
                has_seen_alert = true;
                $scope.has_seen_alert = true;
            };
            Restangular
                .all('products')
                .getList({range: '[1,100]', filter: '{stock_lte: 18}'})
                .then(products => {
                    $scope.stats.products_low_stock = products.data.reduce(nb => ++nb, 0)
                });
            Restangular
                .all('clients')
                .getList()
                .then(clients => {
                   $scope.stats.users = clients.data.reduce(nb => ++nb, 0)
                });
            Restangular
                .all('orders')
                .getList({range: '[1,100]', filter: '{"status":"payment-pending"}'})
                .then(orders => {
                    $scope.stats.pending_orders = orders.data.reduce(nb => ++nb, 0)
                });
        },
        template: dashboardSummaryTemplate
    };
}

dashboardSummary.$inject = ['Restangular'];

export default dashboardSummary;

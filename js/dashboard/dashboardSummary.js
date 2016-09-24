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
                .getList({stock_lte: 10})
                .then(products => {
                    $scope.stats.products_low_stock = products.data.reduce(nb => ++nb, 0)
                });
            Restangular
                .all('item-resources')
                .getList({stock_lte: 10})
                .then(resources => {
                   $scope.stats.resources_low_stock = resources.data.reduce(nb => ++nb, 0)
                });
            Restangular
                .all('orders')
                .getList({status: 1 })
                .then(orders => {
                    $scope.stats.pending_orders = orders.data.reduce(nb => ++nb, 0)
                });
        },
        template: dashboardSummaryTemplate
    };
}

dashboardSummary.$inject = ['Restangular'];

export default dashboardSummary;

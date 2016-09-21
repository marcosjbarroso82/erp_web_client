(function () {
    'use strict';

    angular
        .module('cart.controllers')
        .controller('CartCtrl', CartCtrl);

    CartCtrl.$inject = ['Cart','$scope', 'notification'];

    /**
     * @namespace CartCtrl
     */
    function CartCtrl(Cart, $scope, notification) {
        var vm = this;
        vm.data = {};
        vm.cart = {};
        vm.variants = [];
        vm.temp_extra_item = {};
        vm.alerts = [];
        vm.extra_item = {};

        // Initialize Controller
        activate();


        function activate(){
            console.log("CartCtrl activate");
            vm.extra_item = {'quantity': 1};
            Cart.get().then(function (data){
                vm.cart = data['data'];

            }, function (data){
                vm.alerts.push({type: 'danger', msg: 'Ha ocurrido un problema. Vuelve a cargar la página'});
            });

            Cart.get_variants().then(function (data){
                console.log('get variants succes');
                vm.variants = data.data;
                vm.selected = { value: vm.variants[0] };
            }, function (data){
                vm.alerts.push({type: 'danger', msg: 'Ha ocurrido un problema. Vuelve a cargar la página'});
            });

            $scope.$watch('vm.temp_extra_item', function(){
                vm.extra_item['product'] = vm.temp_extra_item['id'];
            });
            notification.log('Some values are invalid, see details in the form', { addnCls: 'humane-flatty-error' });
        }

        vm.addItem = function(){
            vm.alerts = [];
            vm.extra_item.data = {};

            if(vm.extra_item.product && vm.extra_item.quantity) {

                var temp_cart = angular.copy(vm.cart)
                temp_cart.items.push(vm.extra_item);

                Cart.update_cart(temp_cart).then(function (data){
                    vm.cart = data['data'];
                    vm.temp_extra_item = {};
                    vm.alerts.push({type: 'success', msg: 'Item Agregado!'});

                    vm.cart['items'].forEach(function(item) {
                        if(item['msg'] != '') {
//                            vm.alerts.push({msg: item['msg']});
                            alert(item['msg']);
                        }
                    });

                }, function (data){
//                    vm.alerts.push({type: 'danger', msg: 'No se ha podido agregar el producto!'});
                    alert('No se ha podido agregar el producto!');
                });
            }
        }

        vm.removeItem = function(index){
            vm.alerts = [];
            var temp_cart = angular.copy(vm.cart)
            temp_cart.items[index]['quantity'] = 0;

            Cart.update_cart(temp_cart).then(function (data){
                vm.alerts.push({type: 'success', msg: 'Producto borrado!'});
                vm.cart = data['data'];
                vm.extra_item = {};
            }, function (data){
                vm.alerts.push({type: 'danger', msg: 'No se ha podido borra el producto!'});
            });
        }

        vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
        };

    }
})();
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
        vm.extra_item = {};

        // Initialize Controller
        activate();


        function activate(){
            console.log("CartCtrl activate");
            vm.extra_item = {'quantity': 1};
            Cart.get().then(function (data){
                vm.cart = data['data'];

            }, function (data){
                notification.log('Ha ocurrido un problema. Vuelve a cargar la página', { addnCls: 'humane-flatty-error' });
            });

            Cart.get_variants().then(function (data){
                console.log('get variants succes');
                vm.variants = data.data;
                vm.selected = { value: vm.variants[0] };
            }, function (data){
                notification.log('Ha ocurrido un problema. Vuelve a cargar la página', { addnCls: 'humane-flatty-error' });
            });

            $scope.$watch('vm.temp_extra_item', function(){
                vm.extra_item['product'] = vm.temp_extra_item['id'];
            });
        }

        vm.addItem = function(){
            vm.extra_item.data = {};

            if(vm.extra_item.product && vm.extra_item.quantity) {

                var temp_cart = angular.copy(vm.cart)
                temp_cart.items.push(vm.extra_item);

                Cart.update_cart(temp_cart).then(function (data){
                    vm.cart = data['data'];
                    vm.temp_extra_item = {};
                    notification.log('Item Agregado!', { addnCls: 'humane-flatty-success' });

                    vm.cart['items'].forEach(function(item) {
                        if(item['msg'] != '') {
                            notification.log(item['msg'], { addnCls: 'humane-flatty-error' });
                        }
                    });

                }, function (data){
                    notification.log('No se ha podido agregar el producto!', { addnCls: 'humane-flatty-error' });
                });
            }
        }

        vm.removeItem = function(index){
            var temp_cart = angular.copy(vm.cart)
            temp_cart.items[index]['quantity'] = 0;

            Cart.update_cart(temp_cart).then(function (data){
                notification.log('Producto borrado!', { addnCls: 'humane-flatty-success' });
                vm.cart = data['data'];
                vm.extra_item = {};
            }, function (data){
                notification.log('No se ha podido borra el producto!', { addnCls: 'humane-flatty-error' });
            });
        }


    }
})();
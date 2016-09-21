(function () {
    'use strict';

    angular
        .module('cart.services')
        .factory('Cart', Cart);

    Cart.$inject = ['$http'];

    function Cart($http) {
        var base_url = 'http://127.0.0.1:8000'
        var Cart = {
			get: get,
			update_cart: update_cart,
            get_variants: get_variants
        };
        return Cart;

        function get(){
//            debugger;
            var token = window.localStorage.getItem('userToken');

            var req = {
             method: 'GET',
             url: base_url + '/api/v1/new-cart',
             headers: {
               'Authorization': 'JWT ' + token
             }
            }

            return $http(req);


//            return $http.get(base_url + '/api/v1/new-cart');
        }
        function update_cart(cart){
            var token = window.localStorage.getItem('userToken');

            var req = {
             method: 'POST',
             url: base_url + '/api/v1/new-cart',
             headers: {
               'Authorization': 'JWT ' + token
             },
                data: cart
            }

            return $http(req);

//            return $http.post(base_url + '/api/v1/new-cart', cart);
        }

        function get_variants(){
            var token = window.localStorage.getItem('userToken');
            var req = {
             method: 'GET',
             url: base_url + '/api/v1/products-variants',
             headers: {
               'Authorization': 'JWT ' + token
             }
            }
            return $http(req);
        }
    }

})();
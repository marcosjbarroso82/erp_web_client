(function () {
    'use strict';

    angular
        .module('util.services')
        .factory('ItemImages', ItemImages);

    ItemImages.$inject = ['$http'];

    /**
     * @namespace Item
     * @returns {Factory}
     */
    function ItemImages($http) {
        var Images = {
            create: create,
            destroy: destroy,
            change_default: change_default
        };

        return Images;

        function destroy(image){
            return $http.delete(window.endpoint + 'products-images/' + image.id);
        }

        function create(image){
            var fd = new FormData();
            fd.append('default', image.default);
            fd.append('product', image.product);
            fd.append('image', image.file);

            return $http.post(window.endpoint + 'products-images', fd, {
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'JWT ' + window.localStorage.getItem('userToken')
                },
                transformRequest: angular.identity
            });
        }

        function change_default(image){
            return $http.get(window.endpoint + 'products-images/'+ String(image.id) + '/default', {
                headers: {
                    'Authorization': 'JWT ' + window.localStorage.getItem('userToken'),
                    'Access-Control-Allow-Methods': '*'
                }
            });
        }

    }

})();
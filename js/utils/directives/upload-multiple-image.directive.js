(function () {
    'use strict';

    angular
        .module('util.directives')
        .directive('uploadImages', uploadImages);

    uploadImages.$inject = ['$parse']
    /**
     * @namespace uploadImages
     */
    function uploadImages($parse) {

        var directive = {
            controller: 'UploadMultipleImagesController as vm',
            restrict: 'EA',
            templateUrl: '/js/utils/templates/upload-multiple-images.html',
            link: link,
            scope: {
                filesModel: '@',
                uploadedImages: '@',
                itemId: '@'
            }
        };

        function link(scope, element, attrs) {
            console.log("DATA DIRECTIVE");
            console.log(attrs);
            scope.vm.itemId = attrs.itemId;

            if(attrs.uploadedImages){
                scope.vm.images = eval(attrs.uploadedImages);
            }else{
                scope.vm.images = [];
            }
        }

        return directive;
    }
})();
function requestInterceptor(RestangularProvider) {
    // use the custom query parameters function to format the API request correctly
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        if (operation == "getList") {
            // custom pagination params
            if (params._page) {
                params.page = params._page;
                delete params._page;
                delete params._perPage;
            }
            // custom sort params
            if (params._sortField) {
                if(params._sortDir != 'DESC'){
                    params.ordering = params._sortField
                }else{
                    params.ordering = "-" + params._sortField
                }
                delete params._sortField;
                delete params._sortDir;
            }
            // custom filters
            if (params._filters) {
                for (var filter_name in params._filters) {
                    params[filter_name] = params._filters[filter_name];
                }
                delete params._filters;
            }
            if (headers['Content-Range']) {
                headers['X-Total-Count'] = headers['Content-Range'].split('/').pop();
            }

        }
        return { params: params, headers: headers , url: url + '/' };
    });
}

function responseInterceptor(RestangularProvider, $stateProvider) {
    console.log("RESPONSE INTERCEPTOR+1");

//    if(window.localStorage.getItem('token')){
//        pass;
//        RestangularProvider.setDefaultHeaders({'Authorization': 'Token ' + window.localStorage.getItem('token')});
//    }else{
//        console.log("Not user authenticated+1");
//        //$state.go('login');
//    }

//    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
//
//
//        if (operation == "getList") {
//            var contentRange = response.headers('Content-Range');
//            response.totalCount = contentRange.split('/')[1];
//        }
//        return data;
//    });
}

export default { requestInterceptor, responseInterceptor }

export default function (nga, admin) {
    var productsStock = admin.getEntity('productsStock');
    productsStock.listView()
        .title('Products stock')
        .fields([
            nga.field('id'),
            nga.field('quantity'),
            nga.field('item', 'reference')
                .targetEntity(nga.entity('products'))
                .targetField(nga.field('name'))
                .singleApiCall(ids => ({'id': ids }))
        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ]);

    
    return productsStock;
}

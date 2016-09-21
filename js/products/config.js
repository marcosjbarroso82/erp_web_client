
export default function (nga, admin) {

    var products = admin.getEntity('products')
        .label('Products');
    products.listView()
        .title('All Products')
        .fields([
            nga.field('id', 'number'),
            nga.field('name', 'text'),
            nga.field('price', 'number'),
        ]).filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('price_gte', 'number')
            .label('Min price'),
        nga.field('priceh_lte', 'number')
            .label('Max price'),
        nga.field('stock_lte', 'template')
            .label('Low stock')
            .defaultValue(10)
    ])
        .listActions(['edit', 'delete'])
    ;
    products.creationView()
        .title('Create new Product')
        .fields([
            nga.field('name')
                .validation({required: true }),
            nga.field('price', 'float').validation({required: true}),
            nga.field('description', 'wysiwyg')
        ]);

    products.editionView()
        .fields(
            products.creationView().fields(),
    );

    return products;
}

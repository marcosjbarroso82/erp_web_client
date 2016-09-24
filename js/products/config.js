
export default function (nga, admin) {

    var products = admin.getEntity('products')
        .label('Products');
    products.listView()
        .title('All Products')
        .fields([
            nga.field('id', 'number'),
            nga.field('name', 'text'),
            nga.field('price', 'amount'),
        ]).filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('price_gte', 'float')
            .label('Precio menor a'),
        nga.field('price_lte', 'float')
            .label('Precio mayor a'),
        nga.field('stock_lte', 'number')
            .label('Stock menor a')
            .defaultValue(10)
    ])
        .listActions(['edit', 'delete'])
    ;
    products.creationView()
        .title('Create new Product')
        .fields([
            nga.field('name').validation({required: true }),
            nga.field('sku').validation({required: true }),
            nga.field('price', 'float').validation({required: true}),
            nga.field('description', 'wysiwyg')
        ]);

    products.editionView()
        .fields(
            products.creationView().fields(),
    );

    return products;
}

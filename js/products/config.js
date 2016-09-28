
export default function (nga, admin) {

    var products = admin.getEntity('products')
        .label('Productos');
    products.listView()
        .title('Productos')
        .fields([
            nga.field('id', 'number'),
            nga.field('name', 'text')
                .label('Nombre'),
            nga.field('price', 'amount')
                .label('Precio'),
            nga.field('stock_quantity', 'number')
                .label('Stock'),
            nga.field('reserved_stock_quantity', 'number')
                .label('Stock Reservado'),
            nga.field('available_stock_quantity', 'number')
                .label('Stock Disponible')
        ]).filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Buscar" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('price_gte', 'float')
            .label('Precio menor a'),
        nga.field('price_lte', 'float')
            .label('Precio mayor a'),
        nga.field('stock_lte', 'number')
            .label('Stock menor a')
            .defaultValue(10)
    ])
        .listActions([])
    ;
    products.creationView()
        .title('Crear producto')
        .fields([
            nga.field('name')
                .label('Nombre')
                .validation({required: true }),
            nga.field('sku')
                .label('SKU')
                .validation({required: true }),
            nga.field('price', 'number')
                .format('0.00')
                .label('Precio')
                .validation({required: true}),
            nga.field('description', 'wysiwyg')
                .label('Descripcion')
        ]);

    products.editionView()
        .title('Editar {{ entry.values.name }}')
        .fields(
            products.creationView().fields(),
    );

    return products;
}

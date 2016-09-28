
export default function (nga, admin) {

    var productsVariants = admin.getEntity('productsVariants')
        .label('Variaciones de Productos');
    productsVariants.listView()
        .title('Variaciones de Productos')
        .fields([
            nga.field('id', 'number'),
            nga.field('name', 'text')
                .label('Nombre'),
            nga.field('price', 'amount')
                .label('Precio'),
            nga.field('stock_quantity', 'number')
                .label('Stock')
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
            .defaultValue(10),
        nga.field('category', 'reference')
            .label('Categoria')
            .targetEntity(admin.getEntity('categories'))
            .targetField(nga.field('name'))
    ]);
    productsVariants.creationView()
        .title('Crear variacion de producto')
        .fields([
            nga.field('name')
                .label('Nombre')
                .validation({required: true }),
            nga.field('sku')
                .label('SKU')
                .validation({required: true }),
            nga.field('product', 'reference')
                .targetEntity(admin.getEntity('products'))
                .targetField(nga.field('name')),
            nga.field('price', 'float')
                .label('Precio')
                .map(function truncate(value, entry) {
                    //return parseFloat(value).toFixed(2);
                    return parseFloat(value);
                })
                .validation({required: true})
        ]);

    productsVariants.editionView()
        .title('Editar {{ entry.values.name }}')
        .fields(
            productsVariants.creationView().fields(),
    );

    return productsVariants;
}

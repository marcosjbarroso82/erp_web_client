
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
                .label('Stock')
        ]).filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Buscar" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('category', 'reference')
            .label('Categoria')
            .targetEntity(admin.getEntity('categories'))
            .targetField(nga.field('name'))
    ]);

    products.creationView()
        .title('Crear producto')
        .fields([
            nga.field('name')
                .label('Nombre')
                .validation({required: true }),
            nga.field('category', 'reference')
                .targetEntity(admin.getEntity('categories'))
                .targetField(nga.field('name')),
            nga.field('price', 'float')
                .label('Precio')
                .map(function truncate(value, entry) {
                    return parseFloat(value);
                })
                .validation({required: true}),
            nga.field('description', 'wysiwyg')
                .label('Descripcion')
        ]);

    products.editionView()
        .title('Editar {{ entry.values.name }}')
        .fields(
            products.creationView().fields(),
            nga.field('images', 'embedded_list')
              .targetFields([ 
                  nga.field('image', 'file')
                    .label('Imagen'),
              ])
    );

    return products;
}

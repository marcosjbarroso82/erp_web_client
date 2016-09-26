
export default function (nga, admin) {

    var itemResources = admin.getEntity('itemResources')
        .label('Recursos ');
    itemResources.listView()
        .title('Recursos')
        .fields([
            nga.field('id', 'number'),
            nga.field('name')
                .label('Nombre'),
            nga.field('price', 'amount')
                .label('Precio'),
        ]).filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Buscar" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('price_gte', 'float')
            .label('Precio menor a'),
        nga.field('priceh_lte', 'float')
            .label('Precio mayor a'),
        nga.field('stock_lte', 'template')
            .label('Stock menor a')
            .defaultValue(10)
    ])
    .listActions(['edit', 'delete'])
    ;
    itemResources.creationView()
        .title('Crear Recurso')
        .fields([
            nga.field('name')
                .label('Nombre')
                .validation({required: true }),
            nga.field('price', 'float')
                .label('Precio')
                .validation({required: true}),
            nga.field('description', 'wysiwyg')
        ]);

    itemResources.editionView()
        .title('Editar {{ entry.values.name }}')
        .fields(
            itemResources.creationView().fields(),
    );

    return itemResources;
}

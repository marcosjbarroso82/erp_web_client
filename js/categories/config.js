export default function (nga, admin) {
    var categories = admin.getEntity('categories');
    categories.listView()
        .title('Categorias')
        .fields([
            nga.field('id'),
            nga.field('name')
                .label('Nombre')

        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Buscar" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ])
    .listActions(['<ma-filtered-list-button entity-name="products" filter="{ category: entry.values.id }" size="xs" label="Productos relacionados"></ma-filtered-list-button>', 'edit', 'delete']);

    categories.creationView()
        .title('Crear Categoria')
        .fields([
            nga.field('name')
                .label('Nombre')
            ]);

    categories.editionView()
        .title('Editando categoria {{ entry.values.name }}')
        .fields([
            nga.field('name')
                .label('Nombre')
        ]);

    return categories;
}

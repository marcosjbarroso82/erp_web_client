export default function (nga, admin) {
    var providers = admin.getEntity('providers');
    providers.listView()
        .title('Proveedores')
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
    .listActions(['edit', 'delete']);

    providers.creationView()
        .title('Crear proveedor')
        .fields([
            nga.field('name')
                .label('Nombre')
            ]);

    providers.editionView()
        .title('Editar {{ entry.values.name }}')
        .fields(providers.creationView().fields());

    return providers;
}

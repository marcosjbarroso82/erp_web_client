export default function (nga, admin) {

    var addresses = admin.getEntity('addresses');
    addresses.listView()
        .title('Direcciones')
        .fields([
            nga.field('id'),
            nga.field('street')
                .label('Direccion'),
        ]).filters([
        nga.field('q', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
    ])
        .listActions(['edit', 'delete']);

        addresses.creationView()
        .title('Crear direccion')
        .fields([
            nga.field('street')
                .label('Direccion')
                .validation({required: true }),
        ]);

    addresses.editionView()
        .title('Editar direccion')
        .fields(
            addresses.creationView().fields(),
    );
    return addresses;
}

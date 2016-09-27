export default function (nga, admin) {
    var clients = admin.getEntity('clients');
    clients.listView()
        .title('Clientes')
        .fields([
            nga.field('id'),
            nga.field('first_name')
                .label('Nombre')

        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Buscar" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ])
    .listActions(['edit', 'delete']);

    clients.creationView()
        .title('Crear Cliente')
        .fields([
            nga.field('first_name')
                .label('Nombre'),
            nga.field('address.street')
                .label('Direccion')
            ]);

    clients.editionView()
        .title('Editando a {{ entry.values.first_name }}')
        .fields([
            nga.field('first_name')
                .label('Nombre'),
            nga.field('address.street')
                .label('Direccion'),
            nga.field('balance', 'reference')
              .isDetailLink(true).editable(false)
              .label('Balance')
              .targetEntity(admin.getEntity('balances'))
              .targetField(nga.field('id', 'template').template('<p>Ver balance</p>'))
              .singleApiCall(ids => ({'id': ids }))
        ]);

    return clients;
}

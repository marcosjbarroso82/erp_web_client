export default function (nga, admin) {
    var clients = admin.getEntity('clients');
    clients.listView()
        .title('Clients')
        .fields([
            nga.field('id'),
            nga.field('first_name')
                .label('Name')

        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ])
    .listActions(['edit', 'delete']);

    clients.creationView()
        .title('Create a new Client')
        .fields([
            nga.field('first_name')
            ]);

    clients.editionView()
        .title('{{ entry.values.first_name }}\'s details')
        .fields([
            nga.field('first_name')
        ]);

    return clients;
}

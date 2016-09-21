export default function (nga, admin) {
    var providers = admin.getEntity('providers');
    providers.listView()
        .title('Providers')
        .fields([
            nga.field('id'),
            nga.field('name')
                .label('Name')

        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ])
    .listActions(['edit', 'delete']);

    providers.creationView()
        .title('Create a new Provider')
        .fields([
            nga.field('name')
            ]);

    providers.editionView()
        .title('{{ entry.values.name }}\'s details')
        .fields([
            nga.field('name')
        ]);

    return providers;
}

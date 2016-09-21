export default function (nga, admin) {

    var addresses = admin.getEntity('addresses');
    addresses.listView()
        .title('Addresses')
        .fields([
            nga.field('id'),
            nga.field('street'),
        ]).filters([
        nga.field('q', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
    ])
        .listActions(['edit', 'delete']);

        addresses.creationView()
        .title('Create new Address')
        .fields([
            nga.field('street')
                .validation({required: true }),
        ]);

    addresses.editionView()
        .fields(
            addresses.creationView().fields(),
    );
    return addresses;
}

export default function (nga, admin) {
    var distributions = admin.getEntity('distributions');
    
    distributions.listView()
        .title('Clients')
        .fields([
            nga.field('id'),
            nga.field('employee', 'reference')
                .targetEntity(nga.entity('employees'))
                .targetField(nga.field('first_name'))
                .singleApiCall(ids => ({'id': ids})),
            nga.field('date')

        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ])
    .listActions(['edit', 'delete']);

    distributions.creationView()
        .title('Create a new Distribution')
        .fields([
            nga.field('date', 'datetime'),
            nga.field('employee', 'reference')
              .targetEntity(nga.entity('employees'))
              .targetField(nga.field('first_name'))
              .attributes({ placeholder: 'Select employee...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              })
            ]);

    distributions.editionView()
        .fields(
            distributions.creationView().fields()
            );

    return distributions;
}

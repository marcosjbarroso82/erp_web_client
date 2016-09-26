export default function (nga, admin) {

    var delivery_status_choices = [
        {
            "label": "Cancelado",
            "value": 0
        },
        {
            "label": "Pendiente",
            "value": 1
        },
        {
            "label": "Completado",
            "value": 2
        }
    ];



    var deliveries = admin.getEntity('deliveries');
    deliveries.listView()
        .title('Deliveries')
        .fields([
            nga.field('id'),
            nga.field('quantity'),
            nga.field('item', 'reference')
                .targetEntity(admin.getEntity('orderItems'))
                .targetField(nga.field('product_name'))
                .singleApiCall(ids => ({'id': ids})),
            nga.field('status', 'choice').choices(delivery_status_choices),
            nga.field('distribution', 'reference')
                .targetEntity(admin.getEntity('distributions'))
                .targetField(nga.field('id'))
                .singleApiCall(ids => ({'id': ids})),
            nga.field('group', 'reference')
                .targetEntity(admin.getEntity('deliveryGroups'))
                .targetField(nga.field('id'))
                .singleApiCall(ids => ({'id': ids }))

        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ])
    .listActions(['edit', 'delete']);
    
    deliveries.creationView()
        .title('Create a new Delivery')
        .fields([
            nga.field('group', 'reference')
              .targetEntity(admin.getEntity('deliveryGroups'))
              .targetField(nga.field('id'))
              .attributes({ placeholder: 'Select delivery group...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),
            nga.field('item', 'reference')
              .targetEntity(admin.getEntity('orderItems'))
              .targetField(nga.field('product_name'))
              .attributes({ placeholder: 'Select item...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),

            nga.field('distribution', 'reference')
              .targetEntity(admin.getEntity('distributions'))
              .targetField(nga.field('id'))
              .attributes({ placeholder: 'Select distribution...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),
            nga.field('quantity', 'number'),
            nga.field('status', 'choice').choices(delivery_status_choices)
            ]);

    deliveries.editionView()
        .fields(
            deliveries.creationView().fields(),
            );


    return deliveries;
}

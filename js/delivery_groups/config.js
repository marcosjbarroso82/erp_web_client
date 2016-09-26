export default function (nga, admin) {

    var delivery_status_choices = [
        {
            "label": "Cancelada",
            "value": 0
        },
        {
            "label": "Pendiente",
            "value": 1
        },
        {
            "label": "Completada",
            "value": 2
        }
    ];


    var delivery_groups = admin.getEntity('deliveryGroups');
    delivery_groups.listView()
        .title('Delivery Groups')
        .fields([
            nga.field('id'),
             nga.field('address', 'reference')
                .targetEntity(admin.getEntity('addresses'))
                .targetField(nga.field('street'))
                .singleApiCall(ids => ({'id': ids})),
            nga.field('order', 'reference')
                .targetEntity(admin.getEntity('orders'))
                .targetField(nga.field('id'))
                .singleApiCall(ids => ({'id': ids})),
            nga.field('status', 'choice').choices(delivery_status_choices),

        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ])
    .listActions(['edit', 'delete']);

    delivery_groups.creationView()
        .title('Create a new Delivery Group')
        .fields([
            nga.field('order', 'reference')
              .targetEntity(admin.getEntity('orders'))
              .targetField(nga.field('id'))
              .attributes({ placeholder: 'Select order...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),

            nga.field('address', 'reference')
              .targetEntity(admin.getEntity('addresses'))
              .targetField(nga.field('street'))
              .attributes({ placeholder: 'Select address...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),

            nga.field('status', 'choice').choices(delivery_status_choices)
            ]);

    delivery_groups.editionView()
        .fields(
            nga.field('order', 'reference').editable(false)
              .label('Orden')
              .targetEntity(admin.getEntity('orders'))
              .targetField(nga.field('id'))
              .attributes({ placeholder: 'Seleciona una orden...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),
            nga.field('address', 'reference')
              .label('Direccion')
              .targetEntity(admin.getEntity('addresses'))
              .targetField(nga.field('street'))
              .attributes({ placeholder: 'Selecciona una direccion...' }),

            nga.field('status', 'choice').choices(delivery_status_choices),

            nga.field('deliveries', 'reference_many')
              .targetEntity(admin.getEntity('deliveries'))
              .targetField(nga.field('id', 'template').template('<p>111<p>'))
              .attributes({ placeholder: 'Selecciona paquetes para el envio...' })
              
        );

    return delivery_groups;
}

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
        .title('Entregas')
        .fields([
            nga.field('id'),
             nga.field('address', 'reference')
              .label('Direccion')
                .targetEntity(admin.getEntity('addresses'))
                .targetField(nga.field('street'))
                .singleApiCall(ids => ({'id': ids})),
            nga.field('order', 'reference')
              .label('Orden')
                .targetEntity(admin.getEntity('orders'))
                .targetField(nga.field('id'))
                .singleApiCall(ids => ({'id': ids})),
            nga.field('status', 'choice').choices(delivery_status_choices)
              .label('Estado'),

        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Buscar" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ])
    .listActions(['edit', 'delete']);

    delivery_groups.creationView()
        .title('Crear una entrega')
        .fields([
            nga.field('order', 'reference')
              .label('Orden')
              .targetEntity(admin.getEntity('orders'))
              .targetField(nga.field('id'))
              .attributes({ placeholder: 'Seleccionar orden...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),

            nga.field('address', 'reference')
              .label('Direccion')
              .targetEntity(admin.getEntity('addresses'))
              .targetField(nga.field('street'))
              .attributes({ placeholder: 'Seleccionar direccion...' })
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
              .attributes({ placeholder: 'Selecionar orden...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),
            nga.field('address', 'reference')
              .label('Direccion')
              .targetEntity(admin.getEntity('addresses'))
              .targetField(nga.field('street'))
              .attributes({ placeholder: 'Seleccionar direccion...' }),

            nga.field('status', 'choice').choices(delivery_status_choices)
              .label('Estado'),

            nga.field('deliveries', 'reference_many')
              .label('Paquetes')
              .targetEntity(admin.getEntity('deliveries'))
              .targetField(nga.field('id'))
              .attributes({ placeholder: 'Seleccionar paquetes para el envio...' })
              
        );

    return delivery_groups;
}

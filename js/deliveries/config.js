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
        .title('Paquetes')
        .description('Un paquete es un conjunto de un mismo producto ah entregar.')
        .fields([
            nga.field('id'),
            nga.field('quantity')
              .label('Cantidad'),
            nga.field('item', 'reference')
              .label('Producto')
                .targetEntity(admin.getEntity('orderItems'))
                .targetField(nga.field('product_name'))
                .singleApiCall(ids => ({'id': ids})),
            nga.field('group', 'reference')
              .label('Entrega')
                .targetEntity(admin.getEntity('deliveryGroups'))
                .targetField(nga.field('id'))
                .singleApiCall(ids => ({'id': ids }))

        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Buscar" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ])
    .listActions(['edit', 'delete']);
    
    deliveries.creationView()
        .title('Crear nuevo paquete')
        .fields([
            nga.field('group', 'reference')
              .label('Entrega')
              .targetEntity(admin.getEntity('deliveryGroups'))
              .targetField(nga.field('id'))
              .attributes({ placeholder: 'Selecciona la entrega a la que corresponde este paquete...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),
            nga.field('item', 'reference')
              .label('Producto')
              .targetEntity(admin.getEntity('orderItems'))
              .targetField(nga.field('product_name'))
              .attributes({ placeholder: 'Seleccione el producto...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),

            
            nga.field('quantity', 'number')
              .label('Cantidad'),
            nga.field('status', 'choice').choices(delivery_status_choices)
              .label('Estado')
            ]);

    deliveries.editionView()
        .fields(
            deliveries.creationView().fields(),
            );


    return deliveries;
}

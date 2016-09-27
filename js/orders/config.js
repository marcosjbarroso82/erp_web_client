export default function (nga, admin) {

    var order_status_choices = [
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
        },
        {
            "label": "Entregada",
            "value": 3
        },
        {
            "label": "Pagada",
            "value": 4
        }
    ];

    var orders = admin.getEntity('orders');
    orders.listView()
      .title('Ordenes')
        .fields([
            nga.field('id'),
            nga.field('status', 'choice').choices(order_status_choices)
              .label('Estado'),
            nga.field('total', 'amount')
              .label('Total'),
            nga.field('client', 'reference')
              .label('Cliente')
                .targetEntity(admin.getEntity('clients'))
                .targetField(nga.field('first_name'))
                .singleApiCall(ids => ({'id': ids }))
        ]).filters([
        nga.field('status', 'choice').choices(order_status_choices)
          .label('Estado'),
        nga.field('client', 'reference')
            .label('Cliente')
            .targetEntity(admin.getEntity('clients'))
            .targetField(nga.field('first_name'))
    ])

        .listActions([`<ma-create-button entity-name="payments" default-values="{ order: entry.values.id }" size="xs" label="Agregar pago"></ma-create-button>`]);
    
    orders.creationView()
        .fields([
            nga.field('status', 'choice').choices(order_status_choices)
              .label('Estado'),
            nga.field('total', 'float')
              .label('Total'),
            nga.field('client', 'reference')
              .label('Cliente')
              .targetEntity(admin.getEntity('clients'))
              .targetField(nga.field('first_name'))
              .attributes({ placeholder: 'Select client...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),

            nga.field('items', 'embedded_list')
              .targetFields([ 
                  nga.field('quantity', 'number')
                    .label('Cantidad'),
                  nga.field('product', 'reference')
                    .label('Producto')
                      .targetEntity(admin.getEntity('products'))
                      .targetField(nga.field('name'))
                      .attributes({ placeholder: 'Seleccione una orden...' })
                      .remoteComplete(true, {
                          refreshDelay: 300 ,
                          searchQuery: search => ({ q: search })
                      }),

              ])
            
            ])
/*
    orders.showView().fields([
        nga.field('id'),
        nga.field('total', 'amount'),
        nga.field('client', 'reference')
                .targetEntity(admin.getEntity('clients'))
                .targetField(nga.field('first_name'))
                .singleApiCall(ids => ({'id': ids })),
      nga.field('items', 'referenced_list')
          .targetEntity(admin.getEntity('orderItems'))
          .targetReferenceField('order')
          .targetFields([
              nga.field('id'),
              nga.field('quantity', 'number'),
              nga.field('product', 'reference')
                  .targetEntity(admin.getEntity('products'))
                  .targetField(nga.field('name'))
                  .attributes({ placeholder: 'Select product...' })
                  .remoteComplete(true, {
                      refreshDelay: 300 ,
                      searchQuery: search => ({ q: search })
                  }),
          ])
          .sortField('created_at')
          .sortDir('DESC')
          .listActions(['edit']),

  ])*/



    orders.editionView().actions(['show', 'list'])
        .fields([
            nga.field('status', 'choice').choices(order_status_choices)
              .label('Estado'),
            nga.field('client', 'reference')
              .label('Cliente')
                .editable(false)
                .targetEntity(admin.getEntity('clients'))
                .targetField(nga.field('first_name'))
                .singleApiCall(ids => ({'id': ids })),

            nga.field('total', 'amount')
              .editable(false)
              .label('Total'),

            nga.field('items', 'referenced_list').editable(false)
              .label('Detalles')
                .targetEntity(admin.getEntity('orderItems'))
                .targetReferenceField('order')
                .targetFields([
                  nga.field('id'),
                  nga.field('product_name'),
                  nga.field('quantity'),
                  nga.field('price'),
              ]).singleApiCall(ids => ({'id': ids })),
 
            nga.field('payments', 'referenced_list').editable(false)
              .label('Pagos')
                .targetEntity(admin.getEntity('payments'))
                .targetReferenceField('order')
                .targetFields([
                  nga.field('id'),
                  nga.field('type'),
                  nga.field('amount'),
              ]).singleApiCall(ids => ({'id': ids })),

        ]);

    return orders;
}

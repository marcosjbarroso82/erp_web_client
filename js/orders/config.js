export default function (nga, admin) {

    var order_status_choices = [
        {
            "label": "canceled",
            "value": 0
        },
        {
            "label": "pending",
            "value": 1
        },
        {
            "label": "completed",
            "value": 2
        },
        {
            "label": "delivered",
            "value": 3
        },
        {
            "label": "paid",
            "value": 4
        }
    ];

    var orders = admin.getEntity('orders');
    orders.listView()
        .fields([
            nga.field('id'),
            nga.field('status'),
            nga.field('total'),
            nga.field('client', 'reference')
                .targetEntity(admin.getEntity('clients'))
                .targetField(nga.field('first_name'))
                .singleApiCall(ids => ({'id': ids }))
        ]).filters([
        nga.field('status', 'choice').choices(order_status_choices),
        nga.field('client', 'reference')
            .label('Client')
            .targetEntity(admin.getEntity('clients'))
            .targetField(nga.field('first_name'))
    ])

        .listActions(['edit', 'show']);
    
    orders.creationView()
        .fields([
            nga.field('status', 'choice').choices(order_status_choices),
            nga.field('total', 'float'),
            nga.field('client', 'reference')
              .targetEntity(admin.getEntity('clients'))
              .targetField(nga.field('first_name'))
              .attributes({ placeholder: 'Select client...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),

            nga.field('items', 'embedded_list')
              .targetFields([ 
                  nga.field('quantity', 'number'),
                  nga.field('product', 'reference')
                      .targetEntity(admin.getEntity('products'))
                      .targetField(nga.field('name'))
                      .attributes({ placeholder: 'Select order...' })
                      .remoteComplete(true, {
                          refreshDelay: 300 ,
                          searchQuery: search => ({ q: search })
                      }),

              ])
            
            ])

    orders.showView().fields([
        nga.field('id'),
        nga.field('total'),
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

  ])



    orders.editionView().actions(['show', 'list'])
        .fields([
            nga.field('status', 'choice').choices(order_status_choices),
            nga.field('client').editable(false),
            nga.field('total').editable(false),
        	nga.field('items', 'referenced_list').editable(false)
                .targetEntity(admin.getEntity('orderItems'))
                .targetReferenceField('order')
                .targetFields([
                  nga.field('product_name').label('Product'),
                  nga.field('quantity'),
                  nga.field('price'),
              ]).singleApiCall(ids => ({'id': ids })),

            nga.field('payments', 'referenced_list').editable(false)
                .targetEntity(admin.getEntity('payments'))
                .targetReferenceField('order')
                .targetFields([
                  nga.field('id'),
                  nga.field('type'),
                  nga.field('amount'),
              ]).singleApiCall(ids => ({'id': ids })),

            nga.field('items', 'embedded_list')
              .targetFields([ 
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
        ]);

    return orders;
}

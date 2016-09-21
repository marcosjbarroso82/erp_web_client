export default function (nga, admin) {

    var orderItems = admin.getEntity('orderItems');
    orderItems.listView()
        .fields([
            nga.field('id'),
            nga.field('product_name'),
        ])
        .listActions(['edit', 'delete']);
    orderItems.creationView()
        .fields([
            nga.field('id').editable(false),
            nga.field('product_name').editable(false),
            nga.field('price', 'float').editable(false),
            nga.field('quantity', 'number'),
            nga.field('product', 'reference')
              .targetEntity(nga.entity('products'))
              .targetField(nga.field('name'))
              .attributes({ placeholder: 'Select order...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),

            nga.field('order', 'reference')
              .targetEntity(nga.entity('orders'))
              .targetField(nga.field('id'))
              .attributes({ placeholder: 'Select order...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),
        ]);
    orderItems.editionView()
        .fields(orderItems.creationView().fields());

    return orderItems;
}

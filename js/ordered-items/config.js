export default function (nga, admin) {

    var orderedItems = admin.getEntity('orderedItems');
    orderedItems.listView()
        .fields([
            nga.field('id'),
            nga.field('product_name'),
        ])
        .listActions(['edit', 'delete']);
    orderedItems.creationView()
        .fields([
            nga.field('id').editable(false),
            nga.field('product_name').editable(false),
        ]);
    orderedItems.editionView()
        .fields(orderedItems.creationView().fields());

    return orderedItems;
}

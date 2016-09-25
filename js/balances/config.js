export default function (nga, admin) {

    var balances = admin.getEntity('balances');
    balances.listView()
        .title('Balances')
        .fields([
            nga.field('id'),
            nga.field('total'),
        ]);

    balances.showView()
        .title('Balances')
        .fields([
            nga.field('id'),
            nga.field('total'),
            nga.field('tickets', 'referenced_list').editable(false)
                .targetEntity(admin.getEntity('tickets'))
                .targetReferenceField('balance')
                .targetFields([
                  nga.field('id'),
                  nga.field('date'),
                  nga.field('type'),
                  nga.field('status'),
                  nga.field('amount'),
              ]).singleApiCall(ids => ({'id': ids })),
        ]);

    return balances;
}

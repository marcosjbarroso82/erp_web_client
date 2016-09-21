export default function (nga, admin) {

    var payment_types_choices = [
        {
            "label": "cash",
            "value": "cash"
        },
        {
            "label": "cheque",
            "value": "cheque"
        },
        {
            "label": "credit card",
            "value": "credit_card"
        },
        {
            "label": "transfer",
            "value": "transfer"
        }
    ];


    var payments = admin.getEntity('payments');
    payments.listView()
        .fields([
            nga.field('id'),
            nga.field('amount'),
            nga.field('date'),
            nga.field('type'),
            nga.field('orders', 'reference')
                .targetEntity(nga.entity('orders'))
                .targetField(nga.field('id'))
                .singleApiCall(ids => ({'id': ids }))
        ])
        .listActions(['edit', 'delete']);

    payments.creationView()
        .title('Create new Payment')
        .fields([
            nga.field('amount', 'amount').validation({required: true}),
            nga.field('date', 'date'),
            nga.field('type', 'choice').choices(payment_types_choices)

        ]);

    payments.editionView()
        .fields([
                nga.field('amount', 'amount').editable(false),
            nga.field('date', 'date'),
            nga.field('type', 'choice').choices(payment_types_choices)
            ]);

    return payments;
}

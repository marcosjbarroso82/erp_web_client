export default function (nga, admin) {

    var payment_types_choices = [
        {
            "label": "Efectivo",
            "value": "cash"
        },
        {
            "label": "Cheque",
            "value": "check"
        },
        {
            "label": "Tarjeta de Credito",
            "value": "credit_card"
        },
        {
            "label": "Tranferencia",
            "value": "transfer"
        }
    ];


    var payments = admin.getEntity('payments');
    payments.listView()
        .title('Pagos')
        .fields([
            nga.field('id'),
            nga.field('amount')
                .label('Monto'),
            nga.field('date')
                .label('Fecha'),
            nga.field('type', 'choice').choices(payment_types_choices)
                .label('Tipo'),
            nga.field('orders', 'reference')
                .label('Orden')
                .targetEntity(admin.getEntity('orders'))
                .targetField(nga.field('id'))
                .singleApiCall(ids => ({'id': ids }))
        ])
        .listActions(['edit', 'delete']);

    payments.creationView()
        .title('Crear pago')
        .fields([
            nga.field('amount', 'float')
                .label('Monto')
                .validation({required: true}),
            nga.field('date', 'datetime')
                .defaultValue(new Date(Date.now()))
                .label('Fecha'),
            nga.field('type', 'choice').choices(payment_types_choices)
                .label('Tipo'),
            nga.field('order', 'reference')
                .targetEntity(admin.getEntity('orders'))
                .targetField(nga.field('id'))
                .singleApiCall(ids => ({'id': ids }))

        ]);

    return payments;
}

export default function (nga, admin) {

    var tickets = admin.getEntity('tickets');
    tickets.listView()
        .title('Tickets')
        .fields([
            nga.field('id'),
            nga.field('type'),
            nga.field('actor_type'),
            nga.field('actor_id'),
            nga.field('status'),
            nga.field('amount'),
        ]);

        tickets.creationView()
        .title('Create new Address')
        .fields([
            nga.field('type'),
            nga.field('actor_type'),
            nga.field('actor_id'),
            nga.field('status'),
            nga.field('amount'),
        ]);

    tickets.editionView()
        .fields(
            tickets.creationView().fields(),
    );
    return tickets;
}

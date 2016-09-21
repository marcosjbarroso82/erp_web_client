export default function (nga, admin) {
    var deliveries = admin.getEntity('deliveries');
    deliveries.listView()
        .title('Deliveries')
        .fields([
            /* nga.field('avatar', 'template')
             .label('')
             .template(entry => `<img src="${ entry.values.avatar }" width="25" style="margin-top:-5px" />`),*/
            nga.field('username', 'text') // use last_name for sorting
                .label('User name')
                .isDetailLink(true),
            nga.field('last_name', 'template') // use last_name for sorting
                .label('Name')
                .isDetailLink(true)
                .template('{{ entry.values.first_name }} {{ entry.values.last_name }}'),
            nga.field('email', 'text') // use last_name for sorting
                .label('Email'),
            nga.field('addresses', 'reference_many')
                .targetEntity(nga.entity('addresses'))
                .targetField(nga.field('id'))
                .singleApiCall(ids => ({'id': ids }))

        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ])
    .listActions(['edit', 'delete']);
    
    deliveries.editionView()
        .title('{{ entry.values.first_name }} {{ entry.values.last_name }}\'s details')
        .fields([
            nga.field('first_name'),
            nga.field('last_name'),
            nga.field('email', 'email')
        ])

    return deliveries;
}


export default function (nga, admin) {

    var itemResources = admin.getEntity('itemResources')
        .label('Resources ');
    itemResources.listView()
        .title('All Resources')
        .fields([
            nga.field('id', 'number'),
            nga.field('name', 'text'),
            nga.field('price', 'amount'),
        ]).filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('price_gte', 'float')
            .label('Precio menor a'),
        nga.field('priceh_lte', 'float')
            .label('Precio mayor a'),
        nga.field('stock_lte', 'template')
            .label('Stock menor a')
            .defaultValue(10)
    ])
    .listActions(['edit', 'delete'])
    ;
    itemResources.creationView()
        .title('Create new Resources')
        .fields([
            nga.field('name')
                .validation({required: true }),
            nga.field('price', 'float').validation({required: true}),
            nga.field('description', 'wysiwyg')
        ]);

    itemResources.editionView()
        .fields(
            itemResources.creationView().fields(),
    );

    return itemResources;
}

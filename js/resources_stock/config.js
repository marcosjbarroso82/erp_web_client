export default function (nga, admin) {
    var resourcesStock = admin.getEntity('resourcesStock');
    resourcesStock.listView()
        .title('Resources stock')
        .fields([
            nga.field('id'),
            nga.field('quantity'),
            nga.field('item', 'reference')
                .targetEntity(nga.entity('itemResources').url('item-resources'))
                .targetField(nga.field('name'))
                .singleApiCall(ids => ({'id': ids })),
        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('item', 'reference')
            .label('Resource')
            .targetEntity(admin.getEntity('itemResources').url('item-resources'))
            .targetField(nga.field('name')),   
    ])
    .listActions(['<ma-filtered-list-button entity-name="IOResourcesStock" filter="{ stock: entry.values.id }" size="xs" label="Related products"></ma-filtered-list-button>']);

    
    return resourcesStock;
}

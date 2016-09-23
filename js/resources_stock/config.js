export default function (nga, admin) {
    var resourcesStock = admin.getEntity('resourcesStock');
    resourcesStock.listView()
        .title('Products stock')
        .fields([
            nga.field('id'),
            nga.field('quantity'),
            nga.field('item', 'reference')
                .targetEntity(admin.getEntity('itemResources'))
                .targetField(nga.field('name'))
                .singleApiCall(ids => ({'id': ids }))
        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('item', 'reference')
            .label('Resources')
            .targetEntity(admin.getEntity('itemResources'))
            .targetField(nga.field('name')),   
    ])
    .listActions([
        '<ma-filtered-list-button entity-name="IOResourcesStock" filter="{ stock: entry.values.id }" size="xs" label="Details"></ma-filtered-list-button>',
        '<ma-create-button entity-name="IOResourcesStock" default-values="{ stock: entry.values.id }" size="xs" label="Add stock"></ma-create-button>',
        'show'
        ]);

    resourcesStock.showView()
        .fields([
                nga.field('id'),
                nga.field('quantity'),
                
                nga.field('item', 'reference')
                    .targetEntity(admin.getEntity('itemResources'))
                    .targetField(nga.field('name'))
                    .singleApiCall(ids => ({'id': ids }))
                    .editable(false),
                
                nga.field('io_resources_stock', 'referenced_list') // display list of related comments
                      .targetEntity(admin.getEntity('IOResourcesStock'))
                      .targetReferenceField('stock')
                      .targetFields([
                          nga.field('id'),
                          nga.field('quantity'),
                          nga.field('note')
                      ])
                      .sortField('created_at')
                      .sortDir('DESC'),
                nga.field('Actions', 'template')
                  .template(`<ma-filtered-list-button entity-name="IOResourcesStock" filter="{ stock: entry.values.id }" size="xs" label="Details entries stock"></ma-filtered-list-button>
                            <ma-create-button entity-name="IOResourcesStock" default-values="{ stock: entry.values.id }" size="xs" label="Entry new stock resource"></ma-create-button>`)

            ])
    
    return resourcesStock;
}
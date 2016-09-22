export default function (nga, admin) {
    var IOResourcesStock = admin.getEntity('IOResourcesStock');
    IOResourcesStock.listView()
        .title('Input output resources stock')
        .fields([
            nga.field('id'),
            nga.field('quantity'),
            nga.field('date'),
            nga.field('stock', 'reference')
                .targetEntity(admin.getEntity('resourcesStock'))
                .targetField(nga.field('id'))
                .singleApiCall(ids => ({'id': ids }))
        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('stock', 'reference')
            .label('Stock')
            .targetEntity(admin.getEntity('resourcesStock').url('resources-stock'))
            .targetField(nga.field('id')),   
    ]);
    

    IOResourcesStock.creationView()
        .title('Entry Resource stock')
        .fields([
            nga.field('quantity', 'number').defaultValue(1),
            nga.field('date', 'datetime'),
            nga.field('stock', 'reference')
              .targetEntity(admin.getEntity('resourcesStock'))
              .targetField(nga.field('id'))
              .attributes({ placeholder: 'Select stock...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),
            nga.field('note', 'text')
            ]);


    return IOResourcesStock;
}

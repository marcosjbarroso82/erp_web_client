export default function (nga, admin) {
    var IOResourcesStock = admin.getEntity('IOResourcesStock');
    IOResourcesStock.listView()
        .title('Detalles de Stocks de recursos')
        .fields([
            nga.field('id'),
            nga.field('quantity')
                .label('Cantidad'),
            nga.field('date')
                .label('Fecha'),
            nga.field('stock', 'reference')
                .targetEntity(admin.getEntity('resourcesStock'))
                .targetField(nga.field('id'))
                .singleApiCall(ids => ({'id': ids }))
        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Buscar" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('stock', 'reference')
            .label('Stock')
            .targetEntity(admin.getEntity('resourcesStock').url('resources-stock'))
            .targetField(nga.field('id')),   
    ]);
    

    IOResourcesStock.creationView()
        .title('Ingresar stock')
        .fields([
            nga.field('quantity', 'number')
                .label('Cantidad'),
            nga.field('date', 'datetime')
                .label('Fecha'),
            nga.field('stock', 'reference')
              .targetEntity(admin.getEntity('resourcesStock'))
              .targetField(nga.field('id'))
              .attributes({ placeholder: 'Selecione stock...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),
            nga.field('note', 'text')
                .label('Nota')
            ]);


    return IOResourcesStock;
}

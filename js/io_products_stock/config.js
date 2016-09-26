export default function (nga, admin) {
    var IOProductsStock = admin.getEntity('IOProductsStock');
    IOProductsStock.listView()
        .title('Detalles de Stocks de productos')
        .fields([
            nga.field('id'),
            nga.field('quantity')
                .label('Cantidad'),
            nga.field('date')
                .label('Fecha'),
            nga.field('note')
                .label('Nota'),
            nga.field('stock', 'reference')
                .targetEntity(admin.getEntity('productsStock'))
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
            .targetEntity(admin.getEntity('productsStock'))
            .targetField(nga.field('id')),    
    ]);
    //.listActions(['edit', 'delete']);

    IOProductsStock.creationView()
        .title('Ingresar stock')
        .fields([
            nga.field('quantity', 'number')
                .label('Cantidad'),
            nga.field('date', 'datetime')
                .label('Fecha'),
            nga.field('stock', 'reference')
              .targetEntity(admin.getEntity('productsStock'))
              .targetField(nga.field('id'))
              .attributes({ placeholder: 'Select stock...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),
            nga.field('note', 'text')
                .label('Nota')
            ]);

    return IOProductsStock;
}
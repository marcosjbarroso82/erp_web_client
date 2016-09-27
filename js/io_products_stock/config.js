export default function (nga, admin) {
    var IOProductsStock = admin.getEntity('IOProductsStock');
    IOProductsStock.listView()
        .title('Movimiento de stock de productos')
        .description('Detalles de ingresos y/o egresos de productos')
        .fields([
            nga.field('id'),
            nga.field('stock', 'reference')
                .label('Producto')
                .targetEntity(admin.getEntity('productsStock'))
                .targetField(nga.field('product_name'))
                .singleApiCall(ids => ({'id': ids })),
            nga.field('quantity')
                .label('Cantidad'),
            nga.field('date')
                .label('Fecha'),
            nga.field('note')
                .label('Nota'),
            
        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Buscar" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('stock', 'reference')
            .label('Producto')
            .targetEntity(admin.getEntity('productsStock'))
            .targetField(nga.field('product_name')),    
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
                .label('Producto')
              .targetEntity(admin.getEntity('productsStock'))
              .targetField(nga.field('product_name'))
              .attributes({ placeholder: 'Selecionar producto...' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              }),
            nga.field('note', 'text')
                .label('Nota')
            ])
        .onSubmitSuccess(['progression', 'notification', '$state', 'entry', 'entity', function(progression, notification, $state, entry, entity) {
            // stop the progress bar
            progression.done();
            // add a notification
            notification.log(`Se agrego #${entry._identifierValue} exitosamente.`, { addnCls: 'humane-flatty-success' });
            // redirect to the list view
            //$state.go($state.get('list'), { entity: entity.name() });
            $state.go($state.get('list'), { entity: 'productsStock' });
            // cancel the default action (redirect to the edition view)
            return false;
}]);

    return IOProductsStock;
}
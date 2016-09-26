export default function (nga, admin) {
    var resourcesStock = admin.getEntity('resourcesStock');
    resourcesStock.listView()
        .title('Stock de recursos')
        .fields([
            nga.field('id'),
            nga.field('quantity')
                .label('Cantidad'),
            nga.field('item', 'reference')
                .label('Recurso')
                .targetEntity(admin.getEntity('itemResources'))
                .targetField(nga.field('name'))
                .singleApiCall(ids => ({'id': ids }))
        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Buscar" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('item', 'reference')
            .label('Resources')
            .targetEntity(admin.getEntity('itemResources'))
            .targetField(nga.field('name')),   
    ])
    .listActions([
        '<ma-filtered-list-button entity-name="IOResourcesStock" filter="{ stock: entry.values.id }" size="xs" label="Detalles"></ma-filtered-list-button>',
        '<ma-create-button entity-name="IOResourcesStock" default-values="{ stock: entry.values.id }" size="xs" label="Agregar stock"></ma-create-button>',
        'show'
        ]);

    resourcesStock.showView()
        .fields([
                nga.field('id'),
                nga.field('quantity')
                    .label('Cantidad'),
                
                nga.field('item', 'reference')
                    .label('Recurso')
                    .targetEntity(admin.getEntity('itemResources'))
                    .targetField(nga.field('name'))
                    .singleApiCall(ids => ({'id': ids }))
                    .editable(false),
                
                nga.field('io_resources_stock', 'referenced_list') // display list of related comments
                    .label('Detalles')
                    .targetEntity(admin.getEntity('IOResourcesStock'))
                    .targetReferenceField('stock')
                    .targetFields([
                        nga.field('id'),
                        nga.field('quantity')
                            .label('Cantidad'),
                        nga.field('note')
                            .label('Nota')
                    ])
                    .sortField('created_at')
                    .sortDir('DESC'),
                nga.field('Acciones', 'template')
                  .template(`<ma-filtered-list-button entity-name="IOResourcesStock" filter="{ stock: entry.values.id }" size="xs" label="Detalles entries stock"></ma-filtered-list-button>
                            <ma-create-button entity-name="IOResourcesStock" default-values="{ stock: entry.values.id }" size="xs" label="Agregar Stock"></ma-create-button>`)

            ])
    
    return resourcesStock;
}
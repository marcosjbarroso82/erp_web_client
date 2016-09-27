export default function (nga, admin) {
    var productsStock = admin.getEntity('productsStock');
    productsStock.listView()
        .title('Stock de productos')
        .fields([
            nga.field('id'),
            nga.field('quantity')
                .label('Cantidad'),
            nga.field('reserved_stock')
                .label('Stock comprometido'),
            nga.field('item', 'reference')
                .label('Producto')
                .targetEntity(admin.getEntity('products'))
                .targetField(nga.field('name'))
                .singleApiCall(ids => ({'id': ids }))
        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('item', 'reference')
            .label('Producto')
            .targetEntity(admin.getEntity('products'))
            .targetField(nga.field('name')),   
    ])
    .listActions([
        '<ma-create-button entity-name="IOProductsStock" default-values="{ stock: entry.values.id }" size="xs" label="Agregar stock"></ma-create-button>',
        ]);

    productsStock.showView()
        .title('Stock de {{ entry.values.product_name }}')
        .fields([
                nga.field('id'),
                nga.field('quantity')
                    .label('Cantidad'),
                
                nga.field('item', 'reference')
                    .label('Producto')
                    .targetEntity(admin.getEntity('products'))
                    .targetField(nga.field('name'))
                    .singleApiCall(ids => ({'id': ids }))
                    .editable(false),
                
                nga.field('io_products_stock', 'referenced_list') // display list of related comments
                    .label('Detalles')
                    .targetEntity(admin.getEntity('IOProductsStock'))
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
                  .template(`<ma-create-button entity-name="IOProductsStock" default-values="{ stock: entry.values.id }" size="xs" label="Agregar stock"></ma-create-button>
                    <ma-filtered-list-button entity-name="IOProductsStock" filter="{ stock: entry.values.id }" size="xs" label="Ver detalles"></ma-filtered-list-button>`)

            ])

    
    return productsStock;
}

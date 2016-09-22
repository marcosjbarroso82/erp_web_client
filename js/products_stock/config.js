export default function (nga, admin) {
    var productsStock = admin.getEntity('productsStock');
    productsStock.listView()
        .title('Products stock')
        .fields([
            nga.field('id'),
            nga.field('quantity'),
            nga.field('item', 'reference')
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
            .label('Product')
            .targetEntity(admin.getEntity('products'))
            .targetField(nga.field('name')),   
    ])
    .listActions([
        '<ma-filtered-list-button entity-name="IOProductsStock" filter="{ stock: entry.values.id }" size="xs" label="Details entries stock"></ma-filtered-list-button>',
        'show'
        ]);

    productsStock.showView()
        .fields([
                nga.field('id'),
                nga.field('quantity'),
                
                nga.field('item', 'reference')
                    .targetEntity(admin.getEntity('products'))
                    .targetField(nga.field('name'))
                    .singleApiCall(ids => ({'id': ids }))
                    .editable(false),

                
                nga.field('io_products_stock', 'referenced_list') // display list of related comments
                      .targetEntity(admin.getEntity('IOProductsStock'))
                      .targetReferenceField('stock')
                      .targetFields([
                          nga.field('id'),
                          nga.field('quantity'),
                          nga.field('note')
                      ])
                      .sortField('created_at')
                      .sortDir('DESC')
                      .listActions(['edit', 'delete', 'create'])
                    .template('<ma-referenced-list-column field="::field" datastore="::datastore"></ma-referenced-list-column><button>boton extra</button>')

//                nga.field('io_products_stock', 'embedded_list') // Define a 1-N relationship with the (embedded) comment entity
//                    .targetEntity(admin.getEntity('IOProductsStock'))
//                    .targetReferenceField('stock')
//                    .targetFields([ // which comment fields to display in the datagrid / form
//                          nga.field('quantity')
//                    ])

            ])

    
    return productsStock;
}

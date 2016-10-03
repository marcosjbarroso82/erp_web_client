
export default function (nga, admin) {

    var products = admin.getEntity('products')
        .label('Productos');
    products.listView()
        .title('Productos')
        .fields([
            nga.field('images', 'template')
                .template(`<img ng-if="entry.values.images.length" ng-src="{{ entry.values.images[0].image }}" width="25" style="margin-top:-5px" />
                    <img ng-if="!entry.values.images.length" src="/images/product_default.jpg" width="25" style="margin-top:-5px" />`),
            nga.field('id', 'number'),
            nga.field('name', 'text')
                .label('Nombre'),
            nga.field('price', 'amount')
                .label('Precio'),
        ]).filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Buscar" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
        nga.field('category', 'reference')
            .label('Categoria')
            .targetEntity(admin.getEntity('categories'))
            .targetField(nga.field('name'))
    ]);

    products.creationView()
        .title('Crear producto')
        .fields([
            nga.field('name')
                .label('Nombre')
                .validation({required: true }),
            nga.field('category', 'reference')
                .targetEntity(admin.getEntity('categories'))
                .targetField(nga.field('name')),
            nga.field('price', 'float')
                .label('Precio')
                .map(function truncate(value, entry) {
                    return parseFloat(value);
                })
                .validation({required: true}),
            nga.field('description', 'wysiwyg')
                .label('Descripcion')
        ]);

    products.editionView()
        .title('Editar {{ entry.values.name }}')
        .fields(
            products.creationView().fields(),
            nga.field('images', 'embedded_list')
              .targetFields([ 
                  nga.field('display_image', 'template')
                    .template(`<img ng-if="entry.values.image" ng-src="{{ entry.values.image }}" width="50" style="margin-top:-5px" />`)
                    .editable(false),
                  nga.field('image', 'file')
                    .uploadInformation({
                            url: ('http://127.0.0.1:8000/api/v1/products-images'),
                            method: 'POST',
                            data: 2
                            //data: products.editionView().entity.datastorage.id,
                            //apifilename: 'image',
                            //*data: {'product': 2},
                            //fileName: 'image',
                            //name: 'image',
                            //objectKey: 'image',
                            //product: 2,
                            //pic: 'image'

                            /*then: (function(resp) {
                                console.log("ANDA!");
                            })*/
                    })
                    .label('Imagen'),
              ])
    );

    return products;
}

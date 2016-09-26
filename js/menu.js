export default function (nga, admin) {
    return nga.menu()

        .addChild(nga.menu()
            .title('Productos')
            .icon('<span class="fa fa-product-hunt fa-fw"></span>')
            .active(path => path.indexOf('/products') === 0 || path.indexOf('/productsStock') === 0)
            
            .addChild(nga.menu(admin.getEntity('products'))
                .title('Productos')
                .icon('<span class="fa fa-product-hunt fa-fw"></span>'))

            .addChild(nga.menu(admin.getEntity('productsStock'))
                .title('Stock')
                .icon('<span class="fa fa-th-list fa-fw"></span>'))

            //.addChild(nga.menu(admin.getEntity('IOProductsStock'))
            //    .icon('<span class="fa fa-picture-o fa-fw"></span>'))
        )

        .addChild(nga.menu()
            .title('Recursos')
            .icon('<span class="fa fa-stack-overflow fa-fw"></span>')
            .active(path => path.indexOf('/itemResources') === 0 || path.indexOf('/resourcesStock') === 0)
            
            .addChild(nga.menu(admin.getEntity('itemResources'))
                .title('Recursos')
                .icon('<span class="fa fa-stack-overflow fa-fw"></span>'))

            .addChild(nga.menu(admin.getEntity('resourcesStock'))
                .title('Stock')
                .icon('<span class="fa fa-th-list fa-fw"></span>'))

            //.addChild(nga.menu(admin.getEntity('IOResourcesStock'))
            //    .icon('<span class="fa fa-picture-o fa-fw"></span>'))
        )

        .addChild(nga.menu(admin.getEntity('addresses'))
            .title('Direcciones')
            .icon('<span class="fa fa-location-arrow fa-fw"></span>')
            .active(path => path.indexOf('/addresses') === 0)
            //.addChild(nga.menu(admin.getEntity('addresses'))
            //    .title('Direcciones')
            //    .icon('<span class="fa fa-location-arrow fa-fw"></span>'))
        )


        .addChild(nga.menu()
            .title('Personas')
            .icon('<span class="fa fa-users fa-fw"></span>')
            .active(path => path.indexOf('/clients') === 0 || path.indexOf('/employees') === 0)
            
            .addChild(nga.menu(admin.getEntity('clients'))
                .title('Clientes')
                .icon('<span class="fa fa-user-secret fa-fw"></span>')
                )

            .addChild(nga.menu(admin.getEntity('employees'))
                .title('Empleados')
                .icon('<span class="fa fa-user fa-fw"></span>'))

        )

        .addChild(nga.menu(admin.getEntity('providers'))
                .title('Proveedores')
                .icon('<span class="fa fa-user fa-fw"></span>')
            )
            


        .addChild(nga.menu()
            .title('Ordenes')
            .icon('<span class="fa fa-shopping-cart fa-fw"></span>')
            .active(path => path.indexOf('/orders') === 0 || path.indexOf('/payments') === 0)
            
            .addChild(nga.menu(admin.getEntity('orders'))
                .title('Ordenes')
                .icon('<span class="fa fa-shopping-basket fa-fw"></span>'))
            //.addChild(nga.menu(admin.getEntity('orderItems'))
            //    .icon('<span class="fa fa-shopping-cart fa-fw""></span>'))
            
            .addChild(nga.menu(admin.getEntity('payments'))
                .title('Pagos')
                .icon('<span class="fa fa-money fa-fw"></span>'))

            //.addChild(nga.menu(admin.getEntity('tickets'))
            //    .icon('<span class="fa fa-money fa-fw""></span>'))

        )
        //.addChild(nga.menu()
        //    .title('cart').link('/cart'))
        .addChild(nga.menu()
            .title('Entregas y Repartos')
            .icon('<span class="fa fa-cubes fa-fw"></span>')
            .active(path => path.indexOf('/deliveries') === 0 || path.indexOf('/deliveryGroups') === 0 || path.indexOf('/distributions') === 0)

            .addChild(nga.menu(admin.getEntity('deliveryGroups'))
                .title('Entregas')
                .icon('<span class="fa fa-cubes fa-fw"></span>'))

            .addChild(nga.menu(admin.getEntity('deliveries'))
                .title('Paquetes')
                .icon('<span class="fa fa-cube fa-fw"></span>'))

            .addChild(nga.menu(admin.getEntity('distributions'))
                .title('Repartos')
                .icon('<span class="fa fa-truck fa-fw"></span>'))

            )
        //.addChild(nga.menu(admin.getEntity('balances'))
        //        .icon('<span class="fa fa-money fa-fw""></span>'))
    ;
}

export default function (nga, admin) {
    return nga.menu()

        .addChild(nga.menu()
            .title('Catalog')
            .icon('<span class="fa fa-th-list fa-fw"></span>')
            .active(path => path.indexOf('/products') === 0)
            .addChild(nga.menu(admin.getEntity('products'))
                .icon('<span class="fa fa-picture-o fa-fw"></span>'))
        )

        .addChild(nga.menu()
            .title('Addresses')
            .icon('<span class="fa fa-location-arrow fa-fw"></span>')
            .active(path => path.indexOf('/addresses') === 0)
            .addChild(nga.menu(admin.getEntity('addresses'))
                .title('Addresses')
                .icon('<span class="fa fa-location-arrow fa-fw"></span>'))
        )


        .addChild(nga.menu()
            .title('Persons')
            .icon('<span class="fa fa-users fa-fw"></span>')
            .active(path => path.indexOf('/clients') === 0)
            
            .addChild(nga.menu(admin.getEntity('clients'))
                .title('Clients')
                .icon('<span class="fa fa-user fa-fw"></span>')
                )

            .addChild(nga.menu(admin.getEntity('employees'))
                .title('Employees')
                .icon('<span class="fa fa-user fa-fw"></span>'))

        )

        .addChild(nga.menu(admin.getEntity('providers'))
                .title('Privoders')
                .icon('<span class="fa fa-user fa-fw"></span>')
            )
            


        .addChild(nga.menu()
            .title('Orders')
            .icon('<span class="fa fa-shopping-cart fa-fw"></span>')
            .active(path => path.indexOf('/orders') === 0)
            
            .addChild(nga.menu(admin.getEntity('orders'))
                .icon('<span class="fa fa-shopping-cart fa-fw""></span>'))
            
            .addChild(nga.menu(admin.getEntity('payments'))
                .icon('<span class="fa fa-credit-card fa-fw""></span>'))
        )
    ;
}

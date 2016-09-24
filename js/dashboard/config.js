var moment = require('moment');
var fromNow = v => moment(v).fromNow();

export default function (nga, admin) {

    return nga.dashboard()
    .addCollection(nga.collection(admin.getEntity('itemResources'))
        .name('resources_low_stock')
        .title('Recursos con bajo stock')
        .fields([
            nga.field('id'),
            nga.field('name')

        ])
        .sortField('name')
        .permanentFilters({stock_lte: 10})
        .sortDir('DESC')
    )
    .addCollection(nga.collection(admin.getEntity('products'))
        .name('products_low_stock')
        .title('Productos con bajo stock')
        .fields([
            nga.field('id'),
            nga.field('sku'),
            nga.field('name')

        ])
        .sortField('name')
        .permanentFilters({stock_lte: 10})
        .sortDir('DESC')
    )
    .addCollection(nga.collection(admin.getEntity('orders'))
        .name('pending_orders')
        .title('Ordenes pendientes')
        .fields([
            nga.field('id'),
            nga.field('status'),
            nga.field('client', 'reference')
                .targetEntity(admin.getEntity('clients'))
                .targetField(nga.field('first_name'))
                .singleApiCall(ids => ({'id': ids }))

        ])
        .sortField('created_at')
        .permanentFilters({status: 1})
        .sortDir('DESC')
    )
        .template(`
            <div class="row dashboard-starter"></div>
            <dashboard-summary></dashboard-summary>
        <div class="row dashboard-content">
        <div class="col-lg-6">
            <div class="panel panel-default">
                <ma-dashboard-panel collection="dashboardController.collections.products_low_stock" entries="dashboardController.entries.products_low_stock" datastore="dashboardController.datastore"></ma-dashboard-panel>
            </div>
            <div class="panel panel-yellow">
                <ma-dashboard-panel collection="dashboardController.collections.resources_low_stock" entries="dashboardController.entries.resources_low_stock" datastore="dashboardController.datastore"></ma-dashboard-panel>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="panel panel-green">
                <ma-dashboard-panel collection="dashboardController.collections.pending_orders" entries="dashboardController.entries.pending_orders" datastore="dashboardController.datastore"></ma-dashboard-panel>
            </div>
        </div>
        </div>
        `);
}

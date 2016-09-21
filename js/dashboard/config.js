var moment = require('moment');
var fromNow = v => moment(v).fromNow();

export default function (nga, admin) {

    return nga.dashboard()
    .addCollection(nga.collection(admin.getEntity('orders'))
        .name('pending_orders')
        .title('Pending orders')
        .fields([
            nga.field('id'),
            nga.field('status'),
            nga.field('created')

        ])
        .sortField('created')
        .permanentFilters({status: 'payment-pending'})
        .sortDir('DESC')
    )
        .template(`
            <div class="row dashboard-starter"></div>
            <dashboard-summary></dashboard-summary>
        <div class="row dashboard-content">
        <div class="col-lg-10 col-md-offset-1">
        <div class="panel panel-default">
        <ma-dashboard-panel collection="dashboardController.collections.pending_orders" entries="dashboardController.entries.pending_orders" datastore="dashboardController.datastore"></ma-dashboard-panel>
        </div>
        </div>
        </div>
        `);
}

export default function (nga, admin) {
    var distributions = admin.getEntity('distributions');
    
    distributions.listView()
        .title('Repartos')
        .fields([
            nga.field('id'),
            nga.field('employee', 'reference')
              .label('Empleado')
                .targetEntity(admin.getEntity('employees'))
                .targetField(nga.field('first_name'))
                .singleApiCall(ids => ({'id': ids})),
            nga.field('date')

        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Buscar" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ])
    .listActions(['edit', 'delete']);

    distributions.creationView()
        .title('Create nuevo reparto')
        .fields([
            nga.field('date', 'datetime')
              .defaultValue(new Date(Date.now()))
              .label('Fecha'),
            nga.field('employee', 'reference')
              .label('Empleado')
              .targetEntity(admin.getEntity('employees'))
              .targetField(nga.field('first_name'))
              .attributes({ placeholder: 'Selecciona un empleado' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              })
            ]);

    distributions.editionView()
        .fields(
            distributions.creationView().fields(),

            nga.field('deliveryGroups', 'reference_many')
              .label('Entregas')
              .targetEntity(admin.getEntity('deliveryGroups'))
              .targetField(nga.field('id'))
              .attributes({ placeholder: 'Selecciona todas las entregas que se realizan en este reparto.' })
              .remoteComplete(true, {
                  refreshDelay: 300 ,
                  searchQuery: search => ({ q: search })
              })
            );

    return distributions;
}

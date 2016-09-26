export default function (nga, admin) {
    var employees = admin.getEntity('employees');
    employees.listView()
        .title('Empleados')
        .fields([
            nga.field('id'),
            nga.field('first_name')
                .label('Nombre')

        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Buscar" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ])
    .listActions(['edit', 'delete']);

    employees.creationView()
        .title('Crear empleado')
        .fields([
            nga.field('first_name')
                .label('Nombre')
            ]);

    employees.editionView()
        .title('Editar {{ entry.values.first_name }}')
        .fields(employees.creationView().fields());

    return employees;
}

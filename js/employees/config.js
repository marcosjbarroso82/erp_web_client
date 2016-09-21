export default function (nga, admin) {
    var employees = admin.getEntity('employees');
    employees.listView()
        .title('Employees')
        .fields([
            nga.field('id'),
            nga.field('first_name')
                .label('Name')

        ])
    .filters([
        nga.field('search', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search"></i></span></div>'),
    ])
    .listActions(['edit', 'delete']);

    employees.creationView()
        .title('Create a new Client')
        .fields([
            nga.field('first_name')
            ]);

    employees.editionView()
        .title('{{ entry.values.first_name }}\'s details')
        .fields([
            nga.field('first_name')
        ]);

    return employees;
}

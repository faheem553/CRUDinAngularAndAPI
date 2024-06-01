import { Routes } from '@angular/router';
import { EmployeeListComponent } from './commponent/employee-list/employee-list.component';
import { AddEmployeeComponent } from './commponent/add-employee/add-employee.component';

export const routes: Routes = [
    {
        path: '',
        component: EmployeeListComponent,
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent,
      },
      {
        path: 'add-employee',
        component: AddEmployeeComponent,
      },
      {
        path: 'employee/:id',
        component: AddEmployeeComponent,
      },
];

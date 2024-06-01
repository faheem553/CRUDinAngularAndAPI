import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from './interface_Model/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = 'https://localhost:7204';
  http = inject(HttpClient);
  constructor() {}

  getAllEmployee() {
    return this.http.get<IEmployee[]>(this.apiUrl+'/api/Employee');
  }

   addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.apiUrl+'/api/Employee', employee);
  }

  // updateEmployee(employee: IEmployee): Observable<IEmployee> {
  //   return this.http.put<IEmployee>(`${this.apiUrl}/${employee.id}`, employee);
  // }

  getEmployee(employeeId: number) {
    return this.http.get<IEmployee>(
      this.apiUrl + '/api/Employee/' + employeeId
    );
  }

  updateEmployee(employeeId: number, employee: IEmployee) {
    return this.http.put<IEmployee>(
      this.apiUrl + '/api/Employee/' + employeeId,
      employee
    );
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete(this.apiUrl + '/api/Employee/' + employeeId);
  }
}

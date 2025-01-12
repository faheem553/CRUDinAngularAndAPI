import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interface_Model/employee.model';
import { HttpService } from '../../http.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
 router=inject(Router);
 toaster = inject(ToastrService); 
employeeList:IEmployee[]=[];
httpService=inject(HttpService);
displayedColumns: string[] = [
  'id',
  'name',
  'email',
  'age',
  'phone',
  'salary',
  'password',
  'action',
];

ngOnInit(){
  this.getEmployeeFromServer();
}
getEmployeeFromServer(){
this.httpService.getAllEmployee().subscribe(result=>{
  this.employeeList=result;
  console.log(this.employeeList);
})
}
edit(id: number) {
  console.log(id);
  this.router.navigateByUrl('/employee/' + id);
}

delete(id: number) {
  this.httpService.deleteEmployee(id).subscribe(() => {
    console.log('deleted');
    this.getEmployeeFromServer();
    this.toaster.success('Record deleted sucessfully');
  });
}
}

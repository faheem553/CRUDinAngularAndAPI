import { Component, inject } from '@angular/core';
import{FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators}from '@angular/forms';
import { IEmployee } from '../../interface_Model/employee.model';
import { HttpService } from '../../http.service';
import { ActivatedRoute, RouterEvent } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  router=inject(Router);
  route = inject(ActivatedRoute);
  toaster=inject(ToastrService);
  constructor(
    private fb: FormBuilder,
    private employeeService: HttpService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [0, Validators.required],
      phone: ['', Validators.required],
      salary: [0, Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.isEdit) {
      this.employeeForm.controls['email'].enable(); 
      const newEmployee: IEmployee = this.employeeForm.value;
      this.employeeService
        .updateEmployee(this.employeeId, newEmployee)
        .subscribe(() => {
          console.log('success');
          this.toaster.success("Record updated sucessfully.");
          this.router.navigateByUrl('/employee-list');
        });
    }else{
    if (this.employeeForm.valid) {
      const newEmployee: IEmployee = this.employeeForm.value;
      this.employeeService.addEmployee(newEmployee).subscribe(() => {
        console.log('success');
        this.toaster.success("Record added sucessfully.");
        this.router.navigateByUrl('/employee-list');
      }
      );
    }
  }
  }

  employeeId!: number;
  isEdit = false;
  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEdit = true;
      this.employeeService.getEmployee(this.employeeId).subscribe((result) => {
        console.log(result);
        this.employeeForm.patchValue(result);
        this.employeeForm.controls['email'].disable();
      });
    }
  }
}
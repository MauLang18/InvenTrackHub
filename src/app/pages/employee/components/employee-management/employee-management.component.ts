import { NgIf } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import Swal from 'sweetalert2';
import {
  EmployeeRequest,
  EmployeeUpdateRequest,
} from '../../models/employee-request.interface';
import {
  EmployeeByIdResponse,
} from '../../models/employee-response.interface';
import { EmployeeService } from '../../services/employee.service';
import { SelectAutoComplete } from '../../../../shared/models/reusables/select-autocomplete.interface';
import { DepartmentSelectService } from '../../../../shared/services/department-select.service';
import { LocationSelectService } from '../../../../shared/services/location-select.service';
import { SelectAutocompleteComponent } from '../../../../shared/components/reusables/select-autocomplete/select-autocomplete.component';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelect,
    MatOption,
    MatIcon,
    MatError,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    SelectAutocompleteComponent
  ],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss',
})
export class EmployeeManagementComponent implements OnInit {
  private fb$ = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentSelectService)
  private locationService = inject(LocationSelectService)
  public dialogRef = inject(MatDialogRef<EmployeeManagementComponent>);
  location: SelectAutoComplete[] = [];
  department: SelectAutoComplete[] = [];

  form$!: FormGroup;

  initForm(): void {
    this.form$ = this.fb$.group({
      employeeId: [0],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      locationId: [0, [Validators.required]],
      departmentId: [0, [Validators.required]],
      email: [''],
      phone: [''],
      state: ['', [Validators.required]],
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectDepartment()
    this.listSelectLocation()
    if (this.data.mode == 'edit') {
      this.employeeById(this.data.dialogConfig.data.employeeId);
    }
  }

  listSelectLocation(): void {
    this.locationService
      .listSelectLocation()
      .subscribe((resp) => (this.location = resp));
  }

  listSelectDepartment(): void {
    this.departmentService
      .listSelectDepartment()
      .subscribe((resp) => (this.department = resp));
  }

  get locationIdControl(): FormControl {
    return this.form$.get('locationId') as FormControl;
  }

  get departmentIdControl(): FormControl {
    return this.form$.get('departmentId') as FormControl;
  }

  employeeById(employeeId: number): void {
    this.employeeService.employeeById(employeeId).subscribe((resp: EmployeeByIdResponse) => {
      this.form$.reset({
        employeeId: resp.employeeId,
        name: resp.name,
        lastName: resp.lastName,
        locationId: resp.locationId,
        departmentId: resp.departmentId,
        email: resp.email,
        phone: resp.phone,
        state: resp.state,
      });
    });
  }

  employeeSave(): void {
    if (this.form$.invalid) {
      console.log(this.form$)
      return Object.values(this.form$.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    let formData = this.form$.value;

    const employeeId = this.form$.get('employeeId')?.value;

    if (employeeId > 0) {
      this.employeeUpdate(formData);
    } else {
      this.employeeCreate(formData);
    }
  }

  employeeCreate(formData: EmployeeRequest) {
    this.employeeService.employeeCreate(formData).subscribe((resp) => {
      if (resp.isSuccess) {
        Swal.fire({
          title: 'Excelente',
          text: resp.message,
          icon: 'success',
        });
        this.dialogRef.close(true);
      } else {
        const errorMessages = resp.errors.map((error: any) => error.ErrorMessage).join(' ');
        Swal.fire({
          title: 'Hubo un error!',
          text: `${resp.message} ${errorMessages}`,
          icon: 'error',
        });
      }
    });
  }

  employeeUpdate(formData: EmployeeUpdateRequest) {
    console.log('formDataUpdate ', formData);
    this.employeeService.employeeUpdate(formData).subscribe((resp) => {
      if (resp.isSuccess) {
        Swal.fire({
          title: 'Excelente',
          text: resp.message,
          icon: 'success',
        });
        this.dialogRef.close(true);
      } else {
        const errorMessages = resp.errors.map((error: any) => error.ErrorMessage).join(' ');
        Swal.fire({
          title: 'Hubo un error!',
          text: `${resp.message} ${errorMessages}`,
          icon: 'error',
        });
      }
    });
  }
}

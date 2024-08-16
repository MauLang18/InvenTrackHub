import { NgIf } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
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
  DepartmentRequest,
  DepartmentUpdateRequest,
} from '../../models/department-request.interface';
import {
  DepartmentByIdResponse,
} from '../../models/department-response.interface';
import { DepartmentService } from '../../services/deparment.service';

@Component({
  selector: 'app-department-management',
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
  ],
  templateUrl: './department-management.component.html',
  styleUrl: './department-management.component.scss',
})
export class DepartmentManagementComponent implements OnInit {
  private fb$ = inject(FormBuilder);
  private departmentService = inject(DepartmentService);
  public dialogRef = inject(MatDialogRef<DepartmentManagementComponent>);

  form$!: FormGroup;

  initForm(): void {
    this.form$ = this.fb$.group({
      departmentId: [0],
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data.mode == 'edit') {
      this.departmentById(this.data.dialogConfig.data.departmentId);
    }
  }

  departmentById(departmentId: number): void {
    this.departmentService.departmentById(departmentId).subscribe((resp: DepartmentByIdResponse) => {
      this.form$.reset({
        departmentId: resp.departmentId,
        name: resp.name,
        company: resp.company,
        state: resp.state,
      });
    });
  }

  departmentSave(): void {
    if (this.form$.invalid) {
      console.log(this.form$)
      return Object.values(this.form$.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    let formData = this.form$.value;

    const departmentId = this.form$.get('departmentId')?.value;

    if (departmentId > 0) {
      this.departmentUpdate(formData);
    } else {
      this.departmentCreate(formData);
    }
  }

  departmentCreate(formData: DepartmentRequest) {
    this.departmentService.departmentCreate(formData).subscribe((resp) => {
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

  departmentUpdate(formData: DepartmentUpdateRequest) {
    console.log('formDataUpdate ', formData);
    this.departmentService.departmentUpdate(formData).subscribe((resp) => {
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

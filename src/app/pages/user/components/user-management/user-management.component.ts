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
import { UserService } from '../../services/user.service';
import {
  UserRequest,
  UserUpdateRequest,
} from '../../models/user-request.interface';
import {
  UserByIdResponse,
} from '../../models/user-response.interface';

@Component({
  selector: 'app-user-management',
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
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
  private fb$ = inject(FormBuilder);
  private userService = inject(UserService);
  public dialogRef = inject(MatDialogRef<UserManagementComponent>);

  form$!: FormGroup;

  initForm(): void {
    this.form$ = this.fb$.group({
      userId: [0],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      passWord: [''],
      email: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data.mode == 'edit') {
      this.userById(this.data.dialogConfig.data.userId);
    }
  }

  userById(userId: number): void {
    this.userService.userById(userId).subscribe((resp: UserByIdResponse) => {
      this.form$.reset({
        userId: resp.userId,
        name: resp.name,
        lastName: resp.lastName,
        userName: resp.userName,
        passWord: resp.passWord,
        email: resp.email,
        state: resp.state,
      });
    });
  }

  userSave(): void {
    if (this.form$.invalid) {
      console.log(this.form$)
      return Object.values(this.form$.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    let formData = this.form$.value;

    const userId = this.form$.get('userId')?.value;

    if (userId > 0) {
      this.userUpdate(formData);
    } else {
      this.userCreate(formData);
    }
  }

  userCreate(formData: UserRequest) {
    this.userService.userCreate(formData).subscribe((resp) => {
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

  userUpdate(formData: UserUpdateRequest) {
    console.log('formDataUpdate ', formData);
    this.userService.userUpdate(formData).subscribe((resp) => {
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

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
  EquipmentTypeRequest,
  EquipmentTypeUpdateRequest,
} from '../../models/equipmentType-request.interface';
import {
  EquipmentTypeByIdResponse,
} from '../../models/equipmentType-response.interface';
import { EquipmentTypeService } from '../../services/equipment-type.service';

@Component({
  selector: 'app-equipment-type-management',
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
  templateUrl: './equipment-type-management.component.html',
  styleUrl: './equipment-type-management.component.scss',
})
export class EquipmentTypeManagementComponent implements OnInit {
  private fb$ = inject(FormBuilder);
  private equipmentTypeService = inject(EquipmentTypeService);
  public dialogRef = inject(MatDialogRef<EquipmentTypeManagementComponent>);

  form$!: FormGroup;

  initForm(): void {
    this.form$ = this.fb$.group({
      equipmentTypeId: [0],
      name: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data.mode == 'edit') {
      this.equipmentTypeById(this.data.dialogConfig.data.equipmentTypeId);
    }
  }

  equipmentTypeById(equipmentTypeId: number): void {
    this.equipmentTypeService.equipmentTypeById(equipmentTypeId).subscribe((resp: EquipmentTypeByIdResponse) => {
      this.form$.reset({
        equipmentTypeId: resp.equipmentTypeId,
        name: resp.name,
        state: resp.state,
      });
    });
  }

  equipmentTypeSave(): void {
    if (this.form$.invalid) {
      console.log(this.form$)
      return Object.values(this.form$.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    let formData = this.form$.value;

    const equipmentTypeId = this.form$.get('equipmentTypeId')?.value;

    if (equipmentTypeId > 0) {
      this.equipmentTypeUpdate(formData);
    } else {
      this.equipmentTypeCreate(formData);
    }
  }

  equipmentTypeCreate(formData: EquipmentTypeRequest) {
    this.equipmentTypeService.equipmentTypeCreate(formData).subscribe((resp) => {
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

  equipmentTypeUpdate(formData: EquipmentTypeUpdateRequest) {
    console.log('formDataUpdate ', formData);
    this.equipmentTypeService.equipmentTypeUpdate(formData).subscribe((resp) => {
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

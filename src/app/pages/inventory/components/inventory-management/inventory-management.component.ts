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
import { InventoryService } from '../../services/inventory.service';
import {
  InventoryRequest,
  InventoryUpdateRequest,
} from '../../models/inventory-request.interface';
import { InventoryByIdResponse } from '../../models/inventory-response.interface';
import { ImgSelectorComponent } from '../../../../shared/components/reusables/img-selector/img-selector.component';
import { SelectAutocompleteComponent } from '../../../../shared/components/reusables/select-autocomplete/select-autocomplete.component';
import { SelectAutoComplete } from '../../../../shared/models/reusables/select-autocomplete.interface';
import { EquipmentTypSelectService } from '../../../../shared/services/equipment-typ-select.service';
import { BaseApiResponse } from '../../../../shared/models/commons/base-api-response.interface';

@Component({
  selector: 'app-inventory-management',
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
    ImgSelectorComponent,
    SelectAutocompleteComponent,
  ],
  templateUrl: './inventory-management.component.html',
  styleUrl: './inventory-management.component.scss',
})
export class InventoryManagementComponent implements OnInit {
  private fb$ = inject(FormBuilder);
  private inventoryService = inject(InventoryService);
  private equipmentTypeService = inject(EquipmentTypSelectService);
  public dialogRef = inject(MatDialogRef<InventoryManagementComponent>);
  equipmentType: SelectAutoComplete[] = [];

  form$!: FormGroup;

  initForm(): void {
    this.form$ = this.fb$.group({
      inventoryId: [0],
      code: [''],
      active: [''],
      equipmentTypeId: [0, [Validators.required]],
      brand: ['', [Validators.required]],
      series: ['', [Validators.required]],
      model: ['', [Validators.required]],
      price: [0.0],
      details: [''],
      image: [''],
      state: ['', [Validators.required]],
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm();
  }

  ngOnInit(): void {
    this.listSelectEquipmentType();
    if (this.data.mode == 'edit') {
      this.form$.get('code')?.disable();
      this.form$.get('active')?.disable();
      this.inventoryById(this.data.dialogConfig.data.inventoryId);
    }
  }

  listSelectEquipmentType(): void {
    this.equipmentTypeService
      .listSelectEquipmentType()
      .subscribe((resp) => (this.equipmentType = resp));
  }

  selectedImage(file: File) {
    this.form$.get('image')!.setValue(file);
  }

  get equipmentTypeIdControl(): FormControl {
    return this.form$.get('equipmentTypeId') as FormControl;
  }

  inventoryById(inventoryId: number): void {
    this.inventoryService
      .inventoryById(inventoryId)
      .subscribe((resp: InventoryByIdResponse) => {
        this.form$.reset({
          inventoryId: resp.inventoryId,
          image: resp.image,
          code: resp.code,
          active: resp.active,
          equipmentTypeId: resp.equipmentTypeId,
          brand: resp.brand,
          series: resp.series,
          model: resp.model,
          price: resp.price,
          details: resp.details,
          state: resp.state,
        });
      });
  }

  inventorySave(): void {
    if (this.form$.invalid) {
      console.log(this.form$);
      return Object.values(this.form$.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    let formData = this.form$.value;

    const inventoryId = this.form$.get('inventoryId')?.value;

    if (inventoryId > 0) {
      this.inventoryUpdate(formData);
    } else {
      this.inventoryCreate(formData);
    }
  }

  inventoryCreate(formData: InventoryRequest) {
    this.inventoryService.inventoryCreate(formData).subscribe((resp) => {
      if (resp.isSuccess) {
        Swal.fire({
          title: 'Excelente',
          text: resp.message,
          icon: 'success',
        });
        this.dialogRef.close(true);
      } else {
        const errorMessages = resp.errors
          .map((error: any) => error.ErrorMessage)
          .join(' ');
        Swal.fire({
          title: 'Hubo un error!',
          text: `${resp.message} ${errorMessages}`,
          icon: 'error',
        });
      }
    });
  }

  inventoryUpdate(formData: InventoryUpdateRequest) {
    console.log('formDataUpdate ', formData);
    this.inventoryService.inventoryUpdate(formData).subscribe((resp) => {
      if (resp.isSuccess) {
        Swal.fire({
          title: 'Excelente',
          text: resp.message,
          icon: 'success',
        });
        this.dialogRef.close(true);
      } else {
        const errorMessages = resp.errors
          .map((error: any) => error.ErrorMessage)
          .join(' ');
        Swal.fire({
          title: 'Hubo un error!',
          text: `${resp.message} ${errorMessages}`,
          icon: 'error',
        });
      }
    });
  }
}

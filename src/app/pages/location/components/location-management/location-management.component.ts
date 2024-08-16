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
  LocationRequest,
  LocationUpdateRequest,
} from '../../models/location-request.interface';
import {
  LocationByIdResponse,
} from '../../models/location-response.interface';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location-management',
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
  templateUrl: './location-management.component.html',
  styleUrl: './location-management.component.scss',
})
export class LocationManagementComponent implements OnInit {
  private fb$ = inject(FormBuilder);
  private locationService = inject(LocationService);
  public dialogRef = inject(MatDialogRef<LocationManagementComponent>);

  form$!: FormGroup;

  initForm(): void {
    this.form$ = this.fb$.group({
      locationId: [0],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data.mode == 'edit') {
      this.locationById(this.data.dialogConfig.data.locationId);
    }
  }

  locationById(locationId: number): void {
    this.locationService.locationById(locationId).subscribe((resp: LocationByIdResponse) => {
      this.form$.reset({
        locationId: resp.locationId,
        name: resp.name,
        address: resp.address,
        state: resp.state,
      });
    });
  }

  locationSave(): void {
    if (this.form$.invalid) {
      console.log(this.form$)
      return Object.values(this.form$.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    let formData = this.form$.value;

    const locationId = this.form$.get('locationId')?.value;

    if (locationId > 0) {
      this.locationUpdate(formData);
    } else {
      this.locationCreate(formData);
    }
  }

  locationCreate(formData: LocationRequest) {
    this.locationService.locationCreate(formData).subscribe((resp) => {
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

  locationUpdate(formData: LocationUpdateRequest) {
    console.log('formDataUpdate ', formData);
    this.locationService.locationUpdate(formData).subscribe((resp) => {
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

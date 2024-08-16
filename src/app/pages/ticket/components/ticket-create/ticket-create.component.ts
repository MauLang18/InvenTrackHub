import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDetailService } from '../../services/ticket-detail.service';
import { InventoryDetailsResponse, TicketByIdResponse } from '../../models/ticket-response.interface';
import { componentSetting } from "../ticket-list/ticket-list-config";
import { SearchBox } from '../../../../shared/models/reusables/search-options.interface';
import { RowClick } from '../../../../shared/models/reusables/rowclick-interface';
import Swal from 'sweetalert2';
import { TicketRequest } from '../../models/ticket-request.interface';

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [MatFormFieldModule,
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
    MatButtonModule,],
  templateUrl: './ticket-create.component.html',
  styleUrl: './ticket-create.component.scss'
})
export class TicketCreateComponent implements OnInit{
  componentTicketDetail: any;

  private fb$ = inject(FormBuilder);
  private ticketService = inject(TicketService);
  public ticketDetailService = inject(TicketDetailService);
  private _route = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  form$!: FormGroup;

  cartDetails: any | InventoryDetailsResponse[] = [];

  ticketId: number = 0;
  viewDetailRead: boolean = false;

  initForm(): void {
    this.form$ = this.fb$.group({
      clientId: ["", Validators.required],
      warehouseId: ["", Validators.required],
      voucherDocumentTypeId: ["", Validators.required],
      voucherNumber: ["", Validators.required],
      observation: [""],
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm();
    this._activatedRoute.params.subscribe((params) => {
      this.ticketId = params["ticketId"];
    });
  }

  ngOnInit(): void {
    // this.listSelectClients();
    // this.listSelectWarehouses();
    // this.listVoucherDocumentTypes();
    this.componentTicketDetail = componentSetting;

    if (this.ticketId > 0) {
      this.ticketById(this.ticketId);
      this.viewDetailRead = true;
    }
  }

  ticketById(ticketId: number): void {
    this.ticketService.ticketById(ticketId).subscribe((resp: TicketByIdResponse) => {
      this.form$.reset({
        ticketId: resp.ticketId,
        locationId: resp.locationId,
        departmentId: resp.departmentId,
        assignedToId: resp.assignedToId,
        receivedById: resp.receivedById,
        deliveredById: resp.deliveredById
      });
      this.cartDetails = resp.ticketDetails;
    });
  }

  formatGetInputs() {
    let str = '';

    if (this.componentTicketDetail.filters.textFilter != null) {
      str += `&numFilter=${this.componentTicketDetail.filters.numFilter}&textFilter=${this.componentTicketDetail.filters.textFilter}`;
    }

    this.componentTicketDetail.getInputs = str;
  }

  search(data: SearchBox) {
    this.componentTicketDetail.filters.numFilter = data.searchValue;
    this.componentTicketDetail.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  rowClick(rowClick: RowClick<InventoryDetailsResponse>) {
    let action = rowClick.action;
    let inventory = rowClick.row;

    switch (action) {
      case "addDetail":
        this.addDetail(inventory);
        break;
    }

    return false;
  }

  back() {
    this._route.navigate(["proceso-ventas"]);
  }

  addDetail(inventory: InventoryDetailsResponse) {
    const inventoryCopy = { ...inventory };

    const existingProduct = this.cartDetails.find(
      (item:any) => item.code === inventoryCopy.code
    );

    if (existingProduct) {
      Swal.fire({
        title: '',
        text: 'El equipo ya esta agregadp',
        icon: 'warning',
      });
    } else {
      this.cartDetails.push(inventoryCopy);
    }
  }

  removeFromCart(inventory: InventoryDetailsResponse) {
    const index = this.cartDetails.indexOf(inventory);

    if (index !== -1) {
      this.cartDetails.splice(index, 1);
    }
  }

  ticketSave() {
    if (this.form$.invalid) {
      return Object.values(this.form$.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const ticket: TicketRequest = {
      assignedToId: this.form$.value.assignedToId,
      receivedById: this.form$.value.receivedById,
      deliveredById: this.form$.value.deliveredById,
      details: this.form$.value.details,
      ticketDetails: this.cartDetails.map((inventory: InventoryDetailsResponse) => ({
        inventoryId: inventory.inventoryId,
      })),
    };

    this.ticketService.ticketCreate(ticket).subscribe((resp) => {
      if (resp.isSuccess) {
        Swal.fire({
          title: 'Excelente',
          text: resp.message,
          icon: 'success',
        });
        this._route.navigate(["proceso-ventas"]);
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

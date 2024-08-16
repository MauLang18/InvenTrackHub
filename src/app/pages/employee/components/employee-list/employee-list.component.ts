import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { fadeInRight400ms } from '../../../../shared/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../shared/animations/scale-in.animation';
import { ExportExcelComponent } from '../../../../shared/components/reusables/export-excel/export-excel.component';
import { FilterDateRangeYmdComponent } from '../../../../shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { FilterMenuStatesComponent } from '../../../../shared/components/reusables/filter-menu-states/filter-menu-states.component';
import { GenericButtonComponent } from '../../../../shared/components/reusables/generic-button/generic-button.component';
import { ListTableComponent } from '../../../../shared/components/reusables/list-table/list-table.component';
import { SearchBoxComponent } from '../../../../shared/components/reusables/search-box/search-box.component';
import { SplitButtonComponent } from '../../../../shared/components/reusables/split-button/split-button.component';
import { RowClick } from '../../../../shared/models/reusables/rowclick-interface';
import {
  FilterDateRange,
  SearchBox,
} from '../../../../shared/models/reusables/search-options.interface';
import { Actions } from '../../../../shared/models/reusables/split-button.interface';
import { componentSetting } from './employee-list-config';
import { EmployeeManagementComponent } from '../employee-management/employee-management.component';
import { EmployeeResponse } from '../../models/employee-response.interface';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatIcon,
    GenericButtonComponent,
    SearchBoxComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    FilterMenuStatesComponent,
    SplitButtonComponent,
    ListTableComponent,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class EmployeeListComponent implements OnInit {
  public employeeService = inject(EmployeeService);
  public _dialog = inject(MatDialog);

  iconEmployee$ = 'dashboard';
  component$: any;
  resetChecks: boolean = false;

  ngOnInit(): void {
    this.component$ = componentSetting;
  }

  formatGetInputs() {
    let str = '';

    if (this.component$.filters.textFilter != null) {
      str += `&numFilter=${this.component$.filters.numFilter}&textFilter=${this.component$.filters.textFilter}`;
    }

    if (
      this.component$.filters.startDate != '' &&
      this.component$.filters.endDate != ''
    ) {
      str += `&startDate=${this.component$.filters.startDate}&endDate=${this.component$.filters.endDate}`;
    }

    if (this.component$.filters.stateFilter != null && this.component$.filters.stateFilter != '1-0') {
      str += `&stateFilter=${this.component$.filters.stateFilter}`;
    }

    if (this.component$.filters.refresh == true) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component$.filters.refresh = false;
    }

    this.component$.getInputs = str;
  }

  search(data: SearchBox) {
    this.component$.filters.numFilter = data.searchValue;
    this.component$.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  searchDateRange(data: FilterDateRange) {
    this.component$.filters.startDate = data.startDate;
    this.component$.filters.endDate = data.endDate;
    this.formatGetInputs();
  }

  setDataFilterStates(data: []) {
    if (data.length) {
      this.component$.filters.stateFilter = data.join('-');
    } else {
      this.component$.filters.stateFilter = '0';
    }

    this.formatGetInputs();
  }

  initFilterReset() {
    this.component$.filters = { ...this.component$.initFilters };
    this.formatGetInputs();
  }

  resetButton(action: Actions) {
    switch (action) {
      case 1:
        this.component$.filters.refresh = true;
        this.formatGetInputs();
        break;
      case 2:
        this.initFilterReset();
        this.resetChecks = !this.resetChecks;
        break;
    }
  }

  newEmployee() {
    this._dialog
      .open(EmployeeManagementComponent, {
        disableClose: true,
        width: '400px',
        enterAnimationDuration: 200,
        exitAnimationDuration: 200,
        data: { mode: 'register' },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsEmployees(true);
        }
      });
  }

  rowClick(rowClick: RowClick<EmployeeResponse>) {
    let action = rowClick.action;
    let employee = rowClick.row;

    switch (action) {
      case 'edit':
        this.employeeEdit(employee);
        break;
      case 'delete':
        this.employeeDelete(employee);
        break;
    }
  }

  employeeEdit(employeeData: EmployeeResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = employeeData;

    let dialogRef = this._dialog.open(EmployeeManagementComponent, {
      data: { dialogConfig, mode: 'edit' },
      disableClose: true,
      width: '400px',
      enterAnimationDuration: 450,
      exitAnimationDuration: 300,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.setGetInputsEmployees(true);
    });
  }

  employeeDelete(employeeData: EmployeeResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el empleado ${employeeData.name}?`,
      text: 'Se borrará de forma permanente!',
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: 'rgb(210, 155, 253)',
      cancelButtonColor: 'rgb(79, 109, 253)',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.employeeDelete(employeeData.employeeId).subscribe(() => {
          this.setGetInputsEmployees(true);
        });
      }
    });
  }

  setGetInputsEmployees(refresh: boolean) {
    this.component$.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Employee?sort=Id&download=true`;
  }
}

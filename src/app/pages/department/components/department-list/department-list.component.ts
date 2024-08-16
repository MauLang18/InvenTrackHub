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
import { componentSetting } from './department-list-config';
import { DepartmentManagementComponent } from '../department-management/department-management.component';
import { DepartmentResponse } from '../../models/department-response.interface';
import Swal from 'sweetalert2';
import { DepartmentService } from '../../services/deparment.service';

@Component({
  selector: 'app-department-list',
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
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss',
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class DepartmentListComponent implements OnInit {
  public departmentService = inject(DepartmentService);
  public _dialog = inject(MatDialog);

  iconDepartment$ = 'dashboard';
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

  newDepartment() {
    this._dialog
      .open(DepartmentManagementComponent, {
        disableClose: true,
        width: '400px',
        enterAnimationDuration: 200,
        exitAnimationDuration: 200,
        data: { mode: 'register' },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsDepartments(true);
        }
      });
  }

  rowClick(rowClick: RowClick<DepartmentResponse>) {
    let action = rowClick.action;
    let department = rowClick.row;

    switch (action) {
      case 'edit':
        this.departmentEdit(department);
        break;
      case 'delete':
        this.departmentDelete(department);
        break;
    }
  }

  departmentEdit(departmentData: DepartmentResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = departmentData;

    let dialogRef = this._dialog.open(DepartmentManagementComponent, {
      data: { dialogConfig, mode: 'edit' },
      disableClose: true,
      width: '400px',
      enterAnimationDuration: 450,
      exitAnimationDuration: 300,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.setGetInputsDepartments(true);
    });
  }

  departmentDelete(departmentData: DepartmentResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el departamento ${departmentData.name}?`,
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
        this.departmentService.departmentDelete(departmentData.departmentId).subscribe(() => {
          this.setGetInputsDepartments(true);
        });
      }
    });
  }

  setGetInputsDepartments(refresh: boolean) {
    this.component$.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Department?sort=Id&download=true`;
  }
}

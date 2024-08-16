import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './shared/guards/auth.guard';

const childrenRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/user/components/user-list/user-list.component').then(
        (c) => c.UserListComponent
      ),
  },
  {
    path: 'inventarios',
    loadComponent: () =>
      import('./pages/inventory/components/inventory-list/inventory-list.component').then(
        (c) => c.InventoryListComponent
      ),
  },
  {
    path: 'departamentos',
    loadComponent: () =>
      import('./pages/department/components/department-list/department-list.component').then(
        (c) => c.DepartmentListComponent
      ),
  },
  {
    path: 'ubicaciones',
    loadComponent: () =>
      import('./pages/location/components/location-list/location-list.component').then(
        (c) => c.LocationListComponent
      ),
  },
  {
    path: 'equipos',
    loadComponent: () =>
      import('./pages/equipmentType/components/equipment-type-list/equipment-type-list.component').then(
        (c) => c.EquipmentTypeListComponent
      ),
  },
  {
    path: 'empleados',
    loadComponent: () =>
      import('./pages/employee/components/employee-list/employee-list.component').then(
        (c) => c.EmployeeListComponent
      ),
  },
  {
    path: 'boletas',
    loadComponent: () =>
      import('./pages/ticket/components/ticket-list/ticket-list.component').then(
        (c) => c.TicketListComponent
      ),
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: '',
    component: LayoutComponent,
    children: childrenRoutes,
    canActivate: [authGuard],
  },
];

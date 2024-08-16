export interface INavbarData {
  path: string;
  icon?: string;
  label: string;
  expanded?: boolean;
  items?: INavbarData[];
}

export const navbarData: INavbarData[] = [
  {
    path: 'dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard',
  },
  {
    path: 'departamentos',
    icon: 'fal fa-list',
    label: 'Departamentos',
  },
  {
    path: 'ubicaciones',
    icon: 'fal fa-map',
    label: 'Ubicaciones'
  },
  {
    path: 'equipos',
    icon: 'fal fa-clipboard-list',
    label: 'Tipo de Equipos'
  },
  {
    path: 'empleados',
    icon: 'fal fa-address-book',
    label: 'Empleados'
  },
  {
    path: 'inventarios',
    icon: 'fal fa-box-open',
    label: 'Inventarios',
  },
  {
    path: 'boletas',
    icon: 'fal fa-file',
    label: 'Boletas',
  },
  {
    path: 'users',
    icon: 'fal fa-user',
    label: 'Usuarios',
  },
  
];

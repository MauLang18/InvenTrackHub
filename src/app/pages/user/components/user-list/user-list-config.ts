import { MenuFilterTable } from '../../../../shared/models/reusables/filter-menu-states.interface';
import { GenericButton } from '../../../../shared/models/reusables/generic-button.interface';
import { TableColumns } from '../../../../shared/models/reusables/list-table.interface';
import { SplitButton } from '../../../../shared/models/reusables/split-button.interface';
import { GenericValidators } from '../../../../shared/utils/generic-validators.util';
import {
  SPLIT_BUTTON_ACTIONS,
  STATUS,
} from '../../../../shared/utils/global-constants.util';
import { UserResponse } from '../../models/user-response.interface';

const tableColumns: TableColumns<UserResponse>[] = [
  {
    label: 'NOMBRE',
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'name',
    cssProperty: [
      'text-xs',
      'uppercase',
      'font-bold',
      'whitespace-normal',
      'max-w-120',
    ],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'name',
    visible: true,
    download: true,
  },
  {
    label: 'APELLIDO',
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'lastName',
    cssProperty: [
      'text-xs',
      'uppercase',
      'font-bold',
      'whitespace-normal',
      'max-w-120',
    ],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'lastName',
    visible: true,
    download: true,
  },
  {
    label: 'USUARIO',
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'userName',
    cssProperty: [
      'text-xs',
      'uppercase',
      'font-bold',
      'whitespace-normal',
      'max-w-120',
    ],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'userName',
    visible: true,
    download: true,
  },
  {
    label: 'EMAIL',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'email',
    cssProperty: [
      'text-xs',
      'uppercase',
      'font-bold',
      'whitespace-normal',
      'max-w-120',
    ],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'email',
    visible: true,
    download: true,
  },
  {
    label: 'F. DE CREACIÓN',
    cssLabel: ['font-bold', 'text-sm', 'text-am-main-blue-dark'],
    property: 'auditCreateDate',
    cssProperty: [
      'text-xs',
      'uppercase',
      'font-bold',
      'whitespace-normal',
      'max-w-120',
    ],
    type: 'datetime',
    sticky: false,
    sort: true,
    visible: true,
    download: true,
  },
  {
    label: 'ESTADO',
    cssLabel: [
      'font-bold',
      'text-sm',
      'text-am-main-blue-dark',
      'mat-sort-header-text-center',
    ],
    property: 'stateUser',
    cssProperty: [],
    type: 'simpleBadge',
    sticky: false,
    sort: false,
    visible: true,
    download: true,
  },
  {
    label: '',
    cssLabel: [],
    property: 'edit',
    cssProperty: [],
    type: 'icon',
    sticky: false,
    sort: false,
    sortProperty: '',
    visible: true,
    action: 'edit',
    icon: 'edit',
    cssIcon: 'material-icons color_blue',
    tooltip: 'Actualizar Usuario',
  },
  {
    label: '',
    cssLabel: [],
    property: 'delete',
    cssProperty: [],
    type: 'icon',
    sticky: false,
    sort: false,
    sortProperty: '',
    visible: true,
    action: 'delete',
    icon: 'delete',
    cssIcon: 'material-icons color_red',
    tooltip: 'Eliminar Usuario',
  },
];

const actionButtonUser: GenericButton = {
  label: 'Crear usuario',
  icon: 'add_circle',
  tooltip: 'Crear nuevo usuario',
};

const searchOptions = [
  {
    label: 'Nombre',
    value: 1,
    placeholder: 'Buscar por nombre',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Permite búsqueda por las primeras tres letras.',
    icon: 'badge',
  },
  {
    label: 'Apellido',
    value: 2,
    placeholder: 'Buscar por apellido',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Permite búsqueda por las primeras tres letras.',
    icon: 'badge',
  },
  {
    label: 'Usuario',
    value: 3,
    placeholder: 'Buscar por usuario',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Permite búsqueda por las primeras tres letras.',
    icon: 'badge',
  },
  {
    label: 'Correo',
    value: 4,
    placeholder: 'Buscar por correo',
    validation: [GenericValidators.emailValidation],
    validation_desc: 'Permite búsqueda por las primeras tres letras.',
    icon: 'badge',
  },
];

const menuItems: MenuFilterTable = {
  label: 'Estados',
  icon: 'filter_list',
  tooltip: 'Estados',
  menuItems: [
    {
      label: 'Activo',
      icon: 'label',
      cssIcon: ['text-am-new-green'],
      value: STATUS.ACTIVO,
    },
    {
      label: 'Inactivo',
      icon: 'label',
      cssIcon: ['text-am-gray-light'],
      value: STATUS.INACTIVO,
    },
  ],
};

const filterButtons: SplitButton[] = [
  {
    type: 'button',
    icon: 'refresh',
    label: 'Actualizar listado',
    value: SPLIT_BUTTON_ACTIONS.ACTUALIZAR_DATOS,
  },
  {
    type: 'action',
    id: 'Pendiente',
    icon: 'restart_alt',
    label: 'Refrescar filtros',
    value: SPLIT_BUTTON_ACTIONS.REFRESCAR_FILTROS,
    classes: {
      icon: 'text-am-main-blue-dark text-md',
    },
  },
];

const initFilters = {
  numFilter: 0,
  textFilter: '',
  stateFilter: STATUS.ACTIVO + '-' + STATUS.INACTIVO,
  startDate: '',
  endDate: '',
  refresh: false,
};

const filters = {
  numFilter: 0,
  textFilter: '',
  stateFilter: STATUS.ACTIVO + '-' + STATUS.INACTIVO,
  startDate: '',
  endDate: '',
  refresh: false,
};

export const componentSetting = {
  tableColumns,
  actionButtonUser,
  searchOptions,
  menuItems,
  filterButtons,
  initFilters,
  filters,
  initialSort: 'Id',
  initalSortDir: 'desc',
  getInputs: '',
  filename: 'lista-de-usuarios',
};

import { MenuFilterTable } from '../../../../shared/models/reusables/filter-menu-states.interface';
import { GenericButton } from '../../../../shared/models/reusables/generic-button.interface';
import { TableColumns } from '../../../../shared/models/reusables/list-table.interface';
import { SplitButton } from '../../../../shared/models/reusables/split-button.interface';
import { GenericValidators } from '../../../../shared/utils/generic-validators.util';
import {
  SPLIT_BUTTON_ACTIONS,
  STATUS,
} from '../../../../shared/utils/global-constants.util';
import { TicketResponse } from '../../models/ticket-response.interface';

const tableColumns: TableColumns<TicketResponse>[] = [
  {
    label: 'ASIGNADO A',
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'assignedTo',
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
    sortProperty: 'assignedTo',
    visible: true,
    download: true,
  },
  {
    label: 'DEPARTAMENTO',
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'department',
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
    sortProperty: 'department',
    visible: true,
    download: true,
  },
  {
    label: 'UBICACIÓN',
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'location',
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
    sortProperty: 'location',
    visible: true,
    download: true,
  },
  {
    label: 'RECIBIDO POR',
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'receivedBy',
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
    sortProperty: 'receivedBy',
    visible: true,
    download: true,
  },
  {
    label: 'ENTREGADO POR',
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'deliveredBy',
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
    sortProperty: 'deliveredBy',
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
    label: '',
    cssLabel: [],
    property: 'download',
    cssProperty: [],
    type: 'icon',
    sticky: false,
    sort: false,
    sortProperty: '',
    visible: true,
    action: 'download',
    icon: 'download',
    cssIcon: 'material-icons color_green',
    tooltip: 'Descargar boleta',
  },
  {
    label: '',
    cssLabel: [],
    property: 'visibility',
    cssProperty: [],
    type: 'icon',
    sticky: false,
    sort: false,
    sortProperty: '',
    visible: true,
    action: 'visibility',
    icon: 'visibility',
    cssIcon: 'material-icons color_blue',
    tooltip: 'Ver Detalle de la boleta',
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
    tooltip: 'Anular boleta',
  },
];

const actionButtonTicket: GenericButton = {
  label: 'Crear ubicación',
  icon: 'add_circle',
  tooltip: 'Crear nuevo ubicación',
};

const searchOptions = [
  {
    label: 'Empleado',
    value: 1,
    placeholder: 'Buscar por empleado',
    validation: [GenericValidators.defaultDescription],
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
  actionButtonTicket,
  searchOptions,
  menuItems,
  filterButtons,
  initFilters,
  filters,
  initialSort: 'Id',
  initalSortDir: 'desc',
  getInputs: '',
  filename: 'lista-de-ubicacións',
};

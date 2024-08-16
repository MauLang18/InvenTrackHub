import { HttpHeaders } from '@angular/common/http';

export const endpoint = {
  LOGIN: 'User/Generate/Token',
  LIST_SELECT_EQUIPMENT_TYPE: 'EquipmentType/Select',
  LIST_SELECT_DEPARTMENT: 'Department/Select',
  LIST_SELECT_LOCATION: 'Location/Select',
  LIST_SELECT_EMPLOYEE: 'Employee/Select',
  LIST_SELECT_USER: 'User/Select',

  LIST_USERS: 'User',
  USER_BY_ID: 'User/',
  USER_CREATE: 'User/Create',
  USER_UPDATE: 'User/Update',
  USER_DELETE: 'User/Delete/',

  LIST_INVENTORIES: 'Inventory',
  INVENTORY_BY_ID: 'Inventory/',
  INVENTORY_CREATE: 'Inventory/Create',
  INVENTORY_UPDATE: 'Inventory/Update',
  INVENTORY_DELETE: 'Inventory/Delete/',
  REPORT_QR: 'Report/QRCode/',

  LIST_DEPARTMENTS: 'Department',
  DEPARTMENT_BY_ID: 'Department/',
  DEPARTMENT_CREATE: 'Department/Create',
  DEPARTMENT_UPDATE: 'Department/Update',
  DEPARTMENT_DELETE: 'Department/Delete/',

  LIST_LOCATIONS: 'Location',
  LOCATION_BY_ID: 'Location/',
  LOCATION_CREATE: 'Location/Create',
  LOCATION_UPDATE: 'Location/Update',
  LOCATION_DELETE: 'Location/Delete/',

  LIST_EQUIPMENT_TYPES: 'EquipmentType',
  EQUIPMENT_TYPE_BY_ID: 'EquipmentType/',
  EQUIPMENT_TYPE_CREATE: 'EquipmentType/Create',
  EQUIPMENT_TYPE_UPDATE: 'EquipmentType/Update',
  EQUIPMENT_TYPE_DELETE: 'EquipmentType/Delete/',

  LIST_EMPLOYEES: 'Employee',
  EMPLOYEE_BY_ID: 'Employee/',
  EMPLOYEE_CREATE: 'Employee/Create',
  EMPLOYEE_UPDATE: 'Employee/Update',
  EMPLOYEE_DELETE: 'Employee/Delete/',

  LIST_TICKETS: 'Ticket',
  TICKET_BY_ID: 'Ticket/',
  TICKET_CREATE: 'Ticket/Create',
  TICKET_DELETE: 'Ticket/Delete/',
  REPORT_PDF: 'Report/Pdf/'
};

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

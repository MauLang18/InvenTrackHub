import { formatDate } from '@angular/common';

export class params {
  constructor(
    private paginator: boolean,
    private numPage: number,
    private order: 'desc' | 'asc',
    private sort: string,
    private records: 10 | 20 | 50,
    private download: boolean,
    private numFilter: number,
    private textFilter: string = '',
    private stateFilter: number = 0,
    private stateFilterTwo?: number
  ) {}
}

export interface UserToken {
  message: string;
}

export function convertDateToRequest(
  date: any,
  format: 'date' | 'datetime' | 'periodo'
) {
  switch (format) {
    case 'date':
      return date == null
        ? null
        : formatDate(new Date(date), 'yyyy-MM-dd', 'en-ES');
    case 'periodo':
      return date == null
        ? null
        : formatDate(new Date(date), 'yyyy-MM', 'en-US');
    case 'datetime':
      return date == null
        ? null
        : formatDate(new Date(date), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }
}

export class ListCategoryRequest extends params {
  constructor(
    numPage: number,
    order: 'desc' | 'asc',
    sort: string,
    records: 10 | 20 | 50,
    numFilter: number,
    textFilter: string = '',
    stateFilter: number = 0,
    private startDate?: string, //fechaCreaIni
    private endDate?: string //fechaCreaFin
  ) {
    super(
      true,
      numPage,
      order,
      sort,
      records,
      false,
      numFilter,
      textFilter,
      stateFilter
    );

    this.startDate = convertDateToRequest(this.startDate, 'date')!;
    this.endDate = convertDateToRequest(this.endDate, 'date')!;
  }
}

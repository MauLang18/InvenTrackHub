// Define la interfaz BaseApiResponse<T>
export interface BaseApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
  totalRecords: number;
  errors: any;
}

export interface ApiSuccessResponse<T> {
  status: number;
  success: true;
  message: string;
  data: T;
}

export interface ApiPaginatedResponse<T> {
  status: number;
  success: true;
  message: string;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ApiErrorResponse {
  status: number;
  success: false;
  message: string;
  errors?: Array<{ [key: string]: string }>;
}

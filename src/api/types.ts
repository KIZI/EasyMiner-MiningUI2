export interface StatusResponse {
  code: number;
  status: 'OK' | 'error';
  message?: string;
}

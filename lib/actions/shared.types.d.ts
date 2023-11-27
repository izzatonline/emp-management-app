export interface CreateEmployeeParams {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  role: string;
  salary: number;
  path: string;
}

export interface IdEmployeeParams {
  id: number;
  path: string;
}

export interface EmailEmployeeParams {
  email: string;
}

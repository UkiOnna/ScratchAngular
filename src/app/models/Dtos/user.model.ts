export class UserDto {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  role_id: number;
  department_id: number;
}

export class UserLoginDto {
  username: string;
  password: string;
}
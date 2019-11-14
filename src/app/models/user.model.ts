export class UserDto {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  roleId: number;
  departmentId: number;
}

export class UserLoginDto {
  login: string;
  password: string;
}
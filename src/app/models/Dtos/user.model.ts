export class UserDto {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  roleId: number;
  departmentId: number;
  username: string;
  password: string;
}

export class UserLoginDto {
  username: string;
  password: string;
}
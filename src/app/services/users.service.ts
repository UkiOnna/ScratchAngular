import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDto, UserLoginDto } from '../models/Dtos/user.model';
import { Observable } from 'rxjs';
import { RoleDto } from '../models/Dtos/role.model';
import { TokenDto } from '../models/Dtos/token.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private root = "/api/auth"
  constructor(private http: HttpClient) { }

  public signIn(user: UserLoginDto): Observable<any> {
    return this.http.post(this.root + "/sign-in",user,{responseType:'text'});
  }

  public signUp(user: UserDto): Observable<any> {
    return this.http.post(this.root + "/sign-up", user);
  }

  public signOut(userId: number): Observable<any> {
    return this.http.get(this.root + "/sign-out/" + userId);
  }

  public getUser(userId: number): Observable<UserDto> {
    return this.http.get<UserDto>(this.root + "/" + userId);
  }

  public getUserByToken(token: TokenDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.root + "/token",token);
  }

  public getDepartmentUsers(departmentId: number): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.root + "/department/" + departmentId);
  }

  public getSubdivisionUsers(subdivisionId: number): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.root + "/subdivision/" + subdivisionId);
  }

  public updateUser(user: UserDto): Observable<any> {
    return this.http.put(this.root + "/" + user.id, user);
  }

  public getRoles(): Observable<RoleDto[]> {
    return this.http.get<RoleDto[]>("/api/roles");
  }

  public getRoleById(roleId: number): Observable<RoleDto> {
    return this.http.get<RoleDto>("/api/roles/" + roleId);
  }

  public getRoleByUserId(roleId: number): Observable<RoleDto> {
    return this.http.get<RoleDto>(this.root + "/roles/" + roleId);
  }

  public getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.root);
  }
  public addUser(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.root, user);
  }
  public deleteUser(userId: number): Observable<any> {
    return this.http.delete(this.root + "/" + userId);
  }
}

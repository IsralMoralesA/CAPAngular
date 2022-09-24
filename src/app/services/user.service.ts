import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/users");
  }

  newUser(user:User): Observable<User>{
    return this.http.post<User>("http://localhost:3000/users",user);
  }

  getUser(id:number): Observable<User>{
    return this.http.get<User>("http://localhost:3000/users/"+id);
  }

  editUser(user:User, id:number): Observable<User>{
    return this.http.put<User>("http://localhost:3000/users/"+id,user);
  }

  deleteUser(id:number): Observable<ArrayBuffer>{
    return this.http.delete<ArrayBuffer>("http://localhost:3000/users/"+id);
  }

}

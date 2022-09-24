import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Computer } from '../Model/computer.model';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  constructor(private http:HttpClient) { }

  getComputers():Observable<Computer[]>{
    return this.http.get<Computer[]>("http://localhost:3000/computers");
  }

  getComputer(id:number): Observable<Computer>{
    return this.http.get<Computer>("http://localhost:3000/computers/"+id);
  }

  newComputer(computer:Computer): Observable<Computer>{
    return this.http.post<Computer>("http://localhost:3000/computers",computer);
  }

  editComputer(id:number,computer:Computer):Observable<Computer>{
    return this.http.put<Computer>("http://localhost:3000/computers/"+id,computer);
  }

  deleteComputer(id:number):Observable<ArrayBuffer>{
    return this.http.delete<ArrayBuffer>("http://localhost:3000/computers/"+id);
  }

}

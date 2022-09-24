import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  data: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns = ["id","nombre","telefono","edad","editar","eliminar"];
  title = "";
  iduser?: number;

  constructor(
    private userService: UserService,
    private router :Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.activatedRoute.params.subscribe(
      {
        next: (params) => {
          if (params["id"]) {
            this.title = "Eliminar usuario";
            this.iduser = params["id"];
            alert("Vamos a eliminar");
            this.deleteuser();
          } else {
            this.loadUser();
          }
        }
      }
    );

  }

  ngOnInit(): void {}

  loadUser(): void{
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.data.data = users;
      },
      error:(err) =>{alert("Ocurrio un error:")}
    });
  }

  deleteuser(): void{
    if (this.iduser) {
      this.userService.deleteUser(this.iduser).subscribe({
        next: () => {
          console.log("Usuario eliminado...");
          this.router.navigateByUrl("/users");
        },
        error: ()=>{alert("Ocurrio un problema...");}
      });
    }
  }

}

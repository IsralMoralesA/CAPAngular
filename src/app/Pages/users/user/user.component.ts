import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/Model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  formuser ?: FormGroup;
  title = "";
  iduser?:number;
  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private router :Router,
    private activatedRoute: ActivatedRoute
    )
    {
    this.formuser = this.fb.group({
      nombre: ["",Validators.required],
      telefono: ["",Validators.required],
      edad: ["",Validators.required]
    });

    this.activatedRoute.params.subscribe(
      {
        next: (params) => {
          if (params["id"]) {
            this.title = "Editar usuario";
            this.iduser = params["id"];
            this.loadUser();
          } else {
            this.title = "Crear usuario";
          }
        }
      }
    );
  }

  ngOnInit(): void {
  }

  save(): void{
    const user: User = this.formuser?.value as User;
    if (this.iduser) {
      this.userService.editUser(user,this.iduser).subscribe({
        next:()=>{
          this.router.navigateByUrl("/users");
        },
        error: ()=>{alert("Ocurrio un problema...")}
      });
    } else {
      const user: User = this.formuser?.value as User;
      this.userService.newUser(user).subscribe({
        next: () =>{
          console.log("Usuario insertado");
          this.router.navigateByUrl("/users");
        },
        error: ()=>{alert("Ocurrio un error...")}
      });
    }

  }

  loadUser(): void{
    if (this.iduser) {
      this.userService.getUser(this.iduser).subscribe({
        next: (user) => {
          this.formuser?.patchValue(user);
        },
        error:()=>{alert("ocurrio un PROBLEMA...")}
      })
    } else {

    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Computer } from 'src/app/Model/computer.model';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss']
})
export class ComputerComponent implements OnInit {
  formComputer?: FormGroup;
  idComputer?: number;

  constructor(
    private form: FormBuilder,
    private computerService:ComputerService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.formComputer = this.form.group(
      {
        Marca:["",Validators.required],
        Modelo:["",Validators.required],
        Capacidad:["",Validators.required],
        Ram:["",Validators.required],
        Procesador:["",Validators.required]
      }
    );
    this.activatedRouter.params.subscribe(
      {
        next:(params)=>{
          if (params["id"]) {
            this.idComputer = params["id"];
            this.loadComputer();
          } else {

          }
        }
      }
    );
  }

  ngOnInit(): void {
  }

  saveComputer():void{
    const computer: Computer = this.formComputer?.value as Computer;
    if (this.idComputer) {
      this.computerService.editComputer(this.idComputer,computer).subscribe({
        next:()=>{
          this.router.navigateByUrl("/computers");
        },
        error:()=>{
          alert("Error al tratar de editar...");
        }
      });
    } else {
      const computer: Computer = this.formComputer?.value as Computer;
      this.computerService.newComputer(computer).subscribe(
        {
          next:()=>{
            console.log("Computer guarda con exito!...");
            this.router.navigateByUrl("/computers");
          },
          error:()=>{
            alert("Ocurrio un problema al tratar de agregar...");
          }
        }
      );
    }
  }

  loadComputer():void{
    if (this.idComputer) {
      this.computerService.getComputer(this.idComputer).subscribe(
        {
          next: (Computer)=>{
            this.formComputer?.patchValue(Computer);
          },
          error:()=>{
            alert("Algo salio mal en mapear computer...");
          }
        }
      );
    }
  }
}

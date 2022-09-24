import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Computer } from 'src/app/Model/computer.model';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss']
})
export class ComputersComponent implements OnInit {
  computers: Computer[] = [];
  data: MatTableDataSource<Computer> = new MatTableDataSource<Computer>();
  displayedColumns = ["id","Marca","Modelo","Capacidad","Ram","Procesador","editar","eliminar"];
  title="";
  idcomputer?:number;

  constructor(
    private computerService:ComputerService,
    private router: Router,
    private activatedRouter:ActivatedRoute
  ) {
    this.activatedRouter.params.subscribe({
      next:(params)=>{
        if (params["id"]) {
          this.idcomputer = params["id"];
          this.deleteComputer();
        } else {
          this.loadComputers();
        }
      },
      error:()=>{
        alert("Error en computers activatedRouter...");
      }
    });
  }

  ngOnInit(): void {
  }

  loadComputers():void{
    this.computerService.getComputers().subscribe({
      next:(computers)=>{
        this.computers=computers;
        this.data.data=computers;
      },
      error:()=>{
        alert("Error al obtener computers...");
      }
    });
  }

  deleteComputer():void{
    if (this.idcomputer) {
      this.computerService.deleteComputer(this.idcomputer).subscribe({
        next:()=>{
          console.log("Computer eliminada con exito!");
          this.router.navigateByUrl("/computers");
        },
        error:()=>{
          alert("Error al eliminar...");
        }
      });
    }
  }
}

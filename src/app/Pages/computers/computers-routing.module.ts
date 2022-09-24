import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputersComponent } from './computers.component';
import { ComputerComponent } from './computer/computer.component';

const routes: Routes = [
  { path: '', component: ComputersComponent },
  { path: 'computer', component: ComputerComponent },
  { path: 'computer/:id', component: ComputerComponent },
  { path: 'eliminar/:id', component: ComputersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputersRoutingModule { }

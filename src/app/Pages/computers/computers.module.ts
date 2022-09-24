import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputersRoutingModule } from './computers-routing.module';
import { ComputersComponent } from './computers.component';
import { ComputerComponent } from './computer/computer.component';
import { MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ComputersComponent,
    ComputerComponent
  ],
  imports: [
    CommonModule,
    ComputersRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class ComputersModule { }

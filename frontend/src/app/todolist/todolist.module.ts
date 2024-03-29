import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodolistRoutingModule } from './todolist-routing.module';
import { TodolistComponent } from './components/todolist/todolist.component';
import { TodolistResolver } from './resolvers/todolist.resolver';
import { TodolistService } from './services/todolist.service';
import { SharedModule } from '../shared/shared.module';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { FormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    TodolistComponent,
    DialogBoxComponent
  ],
  imports: [
    SharedModule,
    TodolistRoutingModule,
    CdkDropList, 
    CdkDrag,
  ],
  exports: [
    TodolistComponent,
    DialogBoxComponent
  ],
  providers: [
    TodolistResolver,
    TodolistService,
  ]
})
export class TodolistModule { }

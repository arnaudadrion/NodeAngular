import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './components/todolist/todolist.component';
import { TodolistResolver } from './resolvers/todolist.resolver';
import { AuthGuard } from '../core/guards/auth.guard';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';

const routes: Routes = [
  { path: 'add', component: DialogBoxComponent, canActivate: [AuthGuard] },
  { path: '', component: TodolistComponent, canActivate: [AuthGuard], resolve: { posts: TodolistResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodolistRoutingModule { }

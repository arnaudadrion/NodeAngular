import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './components/todolist/todolist.component';
import { TodolistResolver } from './resolvers/todolist.resolver';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: TodolistComponent, canActivate: [AuthGuard], resolve: { posts: TodolistResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodolistRoutingModule { }

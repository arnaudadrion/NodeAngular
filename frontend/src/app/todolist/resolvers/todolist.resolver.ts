import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Todolist } from '../models/todolist.model';
import { TodolistService } from '../services/todolist.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'any'
})

export class TodolistResolver {
  constructor(private todolistService: TodolistService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Todolist> {
    return this.todolistService.getTodolist();
  }
}
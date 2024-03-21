import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todolist } from '../models/todolist.model';
import { environment } from '../../../environments/environment';
import { IDialogTaskData } from '../interfaces/dialog-task-data.interface';

@Injectable({
    providedIn: 'any'
})

export class TodolistService {
    constructor(private http: HttpClient) {}

    getTodolist(): Observable<Todolist> {
        return this.http.get<Todolist>(`${environment.apiUrl}/todo/list`);
    }    

    addTask(data: IDialogTaskData) {
        return this.http.post(`${environment.apiUrl}/todo/add`, data);
    }
}
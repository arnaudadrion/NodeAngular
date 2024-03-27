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
        return this.http.post<{success: string, message: string}>(`${environment.apiUrl}/todo/add`, data);
    }

    updateOrder(data: {list: string[]}) {
        return this.http.post<{success: string, message: string}>(`${environment.apiUrl}/todo/updateOrder`, data);
    }

    deleteTask(data: {task: string}) {
        return this.http.post<{success: string, message: string}>(`${environment.apiUrl}/todo/delete`, data);
    }
}
import { Component } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Todolist } from '../../models/todolist.model';
import { TodolistService } from '../../services/todolist.service';
import { ActivatedRoute } from '@angular/router';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { animate, group, query, state, style, transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent {
  todolist$!: Observable<Todolist>
  list!: string[];

  task!: string;

  constructor(
    private todolistService: TodolistService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.todolist$ = this.route.data.pipe(
      map(data => data['posts']),
      tap(todolist => {
        this.list = todolist.list
      })
    );
  }

  openModal() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { task: this.task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.task = result;

        this.todolistService.addTask({task: this.task}).subscribe(response => {
          if(response.success === "true") {
            this.todolist$ = this.todolistService.getTodolist().pipe(
              tap(todolist => {
                this.snackbarService.openSnackBar(response.message, 'OK');
                this.list = todolist.list;
              })
            );
          }
        });
      }
    });
  }

  drop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    this.todolistService.updateOrder({list: this.list}).subscribe(response => {
      this.snackbarService.openSnackBar(response.message, 'OK');
    });
  }

  onDelete(task: string) {
    this.todolistService.deleteTask({task: task}).subscribe(response => {
      if (response.success === "true") {
        this.list.filter((value, index) => {
          if (value === task) {
              this.list.splice(index, 1);
              return true;
          }
          return false;
        });
      }

      this.snackbarService.openSnackBar(response.message, 'OK');
    });
  }
}

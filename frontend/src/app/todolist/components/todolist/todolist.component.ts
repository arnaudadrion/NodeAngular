import { Component } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Todolist } from '../../models/todolist.model';
import { TodolistService } from '../../services/todolist.service';
import { ActivatedRoute } from '@angular/router';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss'
})
export class TodolistComponent {
  todolist$!: Observable<Todolist>

  task!: string;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.todolist$ = this.route.data.pipe(
      tap(data => console.log(data['posts'])),
      map(data => data['posts']),
    );

    console.log(this.todolist$)
  }

  openModal() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { task: this.task }
    });
  }

}

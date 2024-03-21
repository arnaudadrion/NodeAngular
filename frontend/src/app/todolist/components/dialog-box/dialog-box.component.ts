import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDialogTaskData } from '../../interfaces/dialog-task-data.interface';
import { TodolistService } from '../../services/todolist.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss'
})
export class DialogBoxComponent {
  task!: string;
  
  constructor(
    private todolistService: TodolistService,
    private dialogRef: MatDialogRef<DialogBoxComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: IDialogTaskData,
  ){}

  ngOnInit() {
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.task = result;
      
        const response = this.todolistService.addTask({task: this.task}).subscribe();
        console.log( response)
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
    
}

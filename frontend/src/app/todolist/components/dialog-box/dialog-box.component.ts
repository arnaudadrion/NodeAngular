import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDialogTaskData } from '../../interfaces/dialog-task-data.interface';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss'
})
export class DialogBoxComponent {
  task!: string;
  @Output() newTask = new EventEmitter<string>();
  
  constructor(
    private dialogRef: MatDialogRef<DialogBoxComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: IDialogTaskData,
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  } 
}

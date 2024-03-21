import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { UsernamePipe } from './pipes/username.pipe';



@NgModule({
  declarations: [
    UsernamePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    UsernamePipe,
  ]
})
export class SharedModule { }

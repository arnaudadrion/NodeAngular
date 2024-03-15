import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { UsernamePipe } from './pipes/username.pipe';



@NgModule({
  declarations: [
    UsernamePipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    UsernamePipe,
  ]
})
export class SharedModule { }

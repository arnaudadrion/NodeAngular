import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username'
})

export class UsernamePipe implements PipeTransform {
    transform(value: {firstname:string, lastname:string}): string {
        return `${value.firstname} ${value.lastname.toUpperCase()}`;
    }
}

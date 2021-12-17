import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'outOf'
})
export class OutOfPipe implements PipeTransform {

  transform(value: number, count): string {
    return `${value}/${count}`;
  }

}

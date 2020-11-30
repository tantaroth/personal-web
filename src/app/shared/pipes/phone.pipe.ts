import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    let response: string = value.toString();

    if (value.toString().length <= 12) {
      const literalLen = 12;
      let numberStr = '';

      if (value.toString().length > 10) {
        for (let i = 0; i < literalLen - value.toString().length; i++) {
          if (i === 0) {
            numberStr += '5';
          } else {
            numberStr += '#';
          }
        }
      } else {
        for (let i = 0; i < literalLen - value.toString().length - 2; i++) {
          numberStr += '#';
        }
      }

      numberStr += value.toString();

      if (numberStr.length < 12) {
        for (let i = 0; i <= literalLen - numberStr.length; i++) {
          numberStr = '#' + numberStr;
        }
      }

      response = `(+${numberStr.slice(0, 2)}) ${numberStr.slice(
        2,
        5
      )} - ${numberStr.slice(5, 8)} ${numberStr.slice(8, 12)}`;
    }

    return response;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };

    return new Intl.DateTimeFormat('es-ES', options).format(date)
      .replace(/de /g, ' de '); 
  }
}
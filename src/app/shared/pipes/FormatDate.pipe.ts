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

    return new Intl.DateTimeFormat('en-EN', options).format(date)
      .replace(/de /g, ' de '); 
  }
}

@Pipe({
  name: 'convertStatusBooking'
})
export class convertStatusBooking implements PipeTransform {

  transform(status: string): any {
    if(!status){
      return '';
    }

    switch(status){
      case 'Pendiente':
        return 'reserved'
      case 'Completada':
        return 'completed'
      case 'Cancelada':
        return 'cancelled'
      case 'Activa':
        return 'active'
      default: 
        return 'unknow'
    }
  }
}
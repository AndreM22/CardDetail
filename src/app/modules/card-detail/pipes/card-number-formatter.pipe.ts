import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumberFormatter'
})
export class CardNumberFormatterPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const cleanedValue = value.replace(/\s+/g, '');
    
    const formattedValue = cleanedValue.match(/.{1,4}/g)?.join(' ') || '';

    return formattedValue;
  }
}

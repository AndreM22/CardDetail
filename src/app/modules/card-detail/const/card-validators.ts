import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const expDateMMValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  const month = parseInt(value, 10);
  if (isNaN(month) || month < 1 || month > 12) {
    return { expDateMM: 'Invalid month' };
  }
  return null;
};

export const expDateYYValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  const year = parseInt(value, 10);
  const currentYear = new Date().getFullYear() % 100;
  if (isNaN(year) || year < currentYear) {
    return { expDateYY: 'Invalid year' };
  }
  return null;
};

export const cardNumberLengthValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value.replace(/\s/g, '');
  if (value.length !== 16) {
    return { cardNumberLength: 'Card number must be 16 digits' };
  }
  return null;
};

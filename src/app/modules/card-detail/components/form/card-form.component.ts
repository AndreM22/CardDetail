import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardFormErrors } from '../../interfaces/card-form-errors.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardDataService } from '../../services/card-data.service';
import { Router } from '@angular/router';
import { cardNumberLengthValidator, expDateMMValidator, expDateYYValidator } from '../../const/card-validators';

@Component({
  selector: 'card-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFormComponent implements OnInit, OnDestroy {
  public cardForm: FormGroup;
  public cardHolderNameError: string | null;
  public cardNumberError: string | null;
  public cvcError: string | null;
  public expDateMMError: string | null;
  public expDateYYError: string | null;
  public submitted = false;

  private _unsubscribe: Subject<void>;

  constructor(
    private _cardDataService: CardDataService,
    private _formBuilder: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _router: Router) {
  
    this.cardHolderNameError = null;
    this.cardNumberError = null;
    this.cvcError = null;
    this.expDateMMError = null;
    this.expDateYYError = null;
    this.submitted = false;
      this.cardForm = this._formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9 ]*$'), cardNumberLengthValidator]],
      expDateMM: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(2), expDateMMValidator]],
      expDateYY: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(2), expDateYYValidator]],
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(3)]]
    });
  
    this._unsubscribe = new Subject<void>();
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }

  public onSubmit(): void {
    this.submitted = true;
    this._resetErrors();
    Object.values(this.cardForm.controls).forEach(control => control.markAsTouched());

    if (this.cardForm.invalid) {
      this._setErrors();
      return;
    }

    this._cardDataService.updateisFormValid(true);
    this._router.navigate(['/view/form-submited']);
  }

  public onCardNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const control = this.cardForm.get('cardNumber');

    if (control) {
      control.setValue(input.value);
    }
  }

  private _resetErrors(): void {
    this.cardHolderNameError = null;
    this.cardNumberError = null;
    this.expDateMMError = null;
    this.expDateYYError = null;
    this.cvcError = null;
    this._cdr.markForCheck();
  }

  private _setErrors(): void {
    const controls = this.cardForm.controls;
    const errorMessages: { [key: string]: string } = {
      required: "Can't be blank",
      pattern: "Wrong format, numbers only",
      expDateMM: 'Invalid month',
      expDateYY: 'Invalid year',
      cardNumberLength: 'Card number must be 16 digits'
    };
  
    const updateError = (controlName: keyof CardFormErrors, control: any): void => {
      if (control.errors) {
        const errors = Object.keys(control.errors);
        const errorType = errors.find(e => errorMessages[e]);
        if (errorType) {
          this[controlName] = errorMessages[errorType];
        }
      }
    };
  
    updateError('cardHolderNameError', controls.cardHolderName);
    updateError('cardNumberError', controls.cardNumber);
    updateError('expDateMMError', controls.expDateMM);
    updateError('expDateYYError', controls.expDateYY);
    updateError('cvcError', controls.cvc);
  
    this._cdr.markForCheck();
  }

  private _setupFieldListeners(): void {
    this.cardForm.get('cardHolderName')?.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(value => this._cardDataService.updateCardHolderName(value));

    this.cardForm.get('cardNumber')?.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(value => this._cardDataService.updateCardNumber(value));

    this.cardForm.get('expDateMM')?.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(value => this._cardDataService.updateExpDateMM(value));

    this.cardForm.get('expDateYY')?.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(value => this._cardDataService.updateExpDateYY(value));

    this.cardForm.get('cvc')?.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(value => this._cardDataService.updateCVC(value));
  }

  private _initialize(): void {
    this._setupFieldListeners();
    this.cardForm.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => {
        this._resetErrors();
        this._setErrors();
      });
  }

  private _finalize(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}

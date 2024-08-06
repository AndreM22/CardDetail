import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class CardDataService {
  private _cardHolderName$: Subject<string>;
  private _cardNumber$: Subject<string>;
  private _expDateMM$: Subject<string>;
  private _expDateYY$: Subject<string>;
  private _cvc$: Subject<string>;
  private _isFormValid$: BehaviorSubject<boolean>;

  constructor() {
    this._cardHolderName$ = new Subject<string>();
    this._cardNumber$ = new Subject<string>();
    this._expDateMM$ = new Subject<string>();
    this._expDateYY$ = new Subject<string>();
    this._cvc$ = new Subject<string>();
    this._isFormValid$ = new BehaviorSubject<boolean>(false);
  }

  public getCardHolderName$(): Subject<string> {
    return this._cardHolderName$;
  }

  public getCardNumber$(): Subject<string> {
    return this._cardNumber$;
  }

  public getExpDateMM$(): Subject<string> {
    return this._expDateMM$;
  }

  public getExpDateYY$(): Subject<string> {
    return this._expDateYY$;
  }

  public getCVC$(): Subject<string> {
    return this._cvc$;
  }

  public getIsFormValid$(): Subject<boolean> {
    return this._isFormValid$;
  }

  public updateCardHolderName(name: string): void {
    this._cardHolderName$.next(name);
  }

  public updateCardNumber(number: string): void {
    this._cardNumber$.next(number);
  }

  public updateExpDateMM(month: string): void {
    this._expDateMM$.next(month);
  }

  public updateExpDateYY(year: string): void {
    this._expDateYY$.next(year);
  }

  public updateCVC(cvc: string): void {
    this._cvc$.next(cvc);
  }

  public updateisFormValid(isValid: boolean): void {
    this._isFormValid$.next(isValid);
  }
}
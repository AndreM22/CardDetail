import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CardDataService } from '../../services/card-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'card-front',
  templateUrl: './card-front.component.html',
  styleUrls: ['./card-front.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFrontComponent implements OnInit, OnDestroy {
  public cardName: string;
  public cardNumber: string;
  public expMonth: string;
  public expYear: string;

  private _unsubscribe: Subject<void>;

  constructor(private _cardDataService: CardDataService,
    private _cdr: ChangeDetectorRef) {
    this.cardName = 'JANE APPLESED';
    this.cardNumber = '0000 0000 0000 0000';
    this.expMonth = '00';
    this.expYear = '00';
    this._unsubscribe = new Subject<void>();
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }

  private _listenCardNumber(): void {
    this._cardDataService.getCardNumber$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((cardNumber) => {
        this.cardNumber = cardNumber || '0000 0000 0000 0000';
        this._cdr.markForCheck();
      })
  }

  private _listenCardName(): void {
    this._cardDataService.getCardHolderName$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((cardName) => {
        this.cardName = (cardName || 'Jane Applesed').toUpperCase();
        this._cdr.markForCheck();
      })
  }

  private _listenCardExpMonth(): void {
    this._cardDataService.getExpDateMM$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((expMonth) => {
        this.expMonth = expMonth || '00';
        this._cdr.markForCheck();
      })
  }

  private _listenCardExpYear(): void {
    this._cardDataService.getExpDateYY$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((expYear) => {
        this.expYear = expYear || '00';
        this._cdr.markForCheck();
      })
  }

  private _initialize(): void {
    this._listenCardNumber();
    this._listenCardName();
    this._listenCardExpMonth();
    this._listenCardExpYear();
  }

  private _finalize(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}

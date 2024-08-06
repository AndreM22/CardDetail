import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CardDataService } from '../../services/card-data.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'card-back',
  templateUrl: './card-back.component.html',
  styleUrls: ['./card-back.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardBackComponent implements OnInit, OnDestroy {

  public cvc: string;

  private _unsubscribe: Subject<void>;

  constructor(private _cardDataService: CardDataService,
    private _cdr: ChangeDetectorRef) {
    this.cvc = '000';
    this._unsubscribe = new Subject<void>();
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }

  private _listenCardCVC(): void {
    this._cardDataService.getCVC$()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((cvc) => {
        this.cvc = cvc || '000';
        this._cdr.markForCheck();
      });
  }

  private _initialize(): void {
    this._listenCardCVC();
  }

  private _finalize(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}

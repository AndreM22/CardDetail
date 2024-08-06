import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-submited',
  templateUrl: './form-submited.component.html',
  styleUrls: ['./form-submited.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSubmitedComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  public goToForm(): void {
    this._router.navigate(['/view/form']);
  }
}

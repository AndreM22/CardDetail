import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './components/view/view.component';
import { CardFormComponent } from './components/form/card-form.component';
import { CommonModule } from '@angular/common';
import { CardNumberFormatterPipe } from './pipes/card-number-formatter.pipe';
import { CardDataService } from './services/card-data.service';
import { CardFrontComponent } from './components/card-front/card-front.component';
import { CardBackComponent } from './components/card-back/card-back.component';
import { FormSubmitedComponent } from './components/form-submited/form-submited.component';

const routes: Routes = [
  { 
    path: 'view', 
    component: ViewComponent,
    children: [
      { path: 'form', component: CardFormComponent },
      { path: 'form-submited', component: FormSubmitedComponent}
    ]
  },
  { path: '**', redirectTo: 'view/form', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  declarations: [
    CardFormComponent,
    ViewComponent,
    CardNumberFormatterPipe,
    CardFrontComponent,
    CardBackComponent,
    FormSubmitedComponent
  ],
  providers: [
    CardDataService 
  ]
})
export class CardDetailRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { AccountTransactionsComponent } from '../account-transactions/account-transactions.component';

const routes: Routes = [
  {
  path: '',
  component: Tab1Page,
  },{
  path: 'transaction/:accountNumber',
  component: AccountTransactionsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}

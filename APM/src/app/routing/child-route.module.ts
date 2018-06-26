import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../products/product-list.component';
import { ProductGuardService } from '../products/product-guard.service';
import { ProductDetailComponent } from '../products/product-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', 
      canActivate: [ ProductGuardService], 
      component: ProductDetailComponent }, 
    ]),
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class ChildRouteModule { }

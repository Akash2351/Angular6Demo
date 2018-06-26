import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductGuardService } from './product-guard.service';
import { ProductService } from './product.service';
import { SharedModule } from './../shared/shared.module';
import { ChildRouteModule } from '../routing/child-route.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ChildRouteModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent    
  ],
  providers: [
    ProductService,
    ProductGuardService
  ]
})
export class ProductModule { }

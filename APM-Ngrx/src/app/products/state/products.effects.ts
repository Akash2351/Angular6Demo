import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of } from 'rxjs';


@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  loadProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap((action: productActions.Load) =>
        this.productService.getProducts().pipe(
          map((products: Product[]) => new productActions.LoadSuccess(products)),
          catchError(err => of(new productActions.LoadFail(err)))
        ))
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    map((action: productActions.UpdateProduct) => action.payload),
    mergeMap((product: Product) =>
        this.productService.updateProduct(product).pipe(
          map((updatedProduct: Product) => new productActions.UpdateProductSuccess(updatedProduct)),
          catchError(err => of(new productActions.UpdateProductFail(err)))
        ))
  );
}

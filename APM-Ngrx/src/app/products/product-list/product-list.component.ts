import { Component, OnInit, OnDestroy } from "@angular/core";

import { Product } from "../product";
import { ProductService } from "../product.service";
import { Store, select } from "@ngrx/store";
import * as fromProduct from "../state/product.reducer";
import * as ProductActions from "../state/product.actions";
import { Observable } from "rxjs";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Products";

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  componentActive: boolean;

  constructor(
    private store: Store<fromProduct.State>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.store
      .select(fromProduct.getCurrentProduct)
      .subscribe(product => (this.selectedProduct = product));

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.store.dispatch(new ProductActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    this.store
      .pipe(
        select(fromProduct.getShowProductCode),
        takeWhile(() => this.componentActive)
      )
      .subscribe(showProductCode => {
        this.displayCode = showProductCode;
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new ProductActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new ProductActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new ProductActions.SetCurrentProduct(product));
  }
}

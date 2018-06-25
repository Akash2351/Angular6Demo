import { Component, OnInit } from "@angular/core";
import { IProduct } from "./products";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    pageTitle: string = 'Product Lists';
    imageWidth: number = 50;
    imageMargin: number = 5;
    showImage: boolean = false;
    _productFilter: string;
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [ ];
    errorMessage: string;

    get productFilter(): string {
        return this._productFilter;
    }

    set productFilter(filter: string) {
        console.log("setting filter...");
        this._productFilter = filter;
        if (filter) this.performFilter(filter);
        else
            this.filteredProducts = this.products;
    }

    constructor(private _productService: ProductService ) {
    }

    performFilter(filterBy: string): void {
        filterBy = filterBy.toLocaleLowerCase();
        this.filteredProducts = this.products.filter((product: IProduct) =>
            product.productName.toLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log(' in init method.');
        this._productService.getProducts()
        .subscribe(products => {
            this.products = products;
            this.filteredProducts = this.products;
        },
        error => this.errorMessage = <any>error);
        this.filteredProducts = this.products;
    }

    onRatingClicked(message: string){
        this.pageTitle= message;
    }
}
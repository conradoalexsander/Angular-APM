import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    constructor(private productService: ProductService) { }


    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 50;
    showImage: boolean = false;
    products: IProduct[] = [];
    errorMessage: string = '';
    sub!: Subscription;


    private _listFilter: string = '';
    get listfilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().includes(filterBy));
    }

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}

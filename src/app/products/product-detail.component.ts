import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  sub!: Subscription;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.product = products.find(product => product.productId == id);
      },
      error: err => console.log('Invalid product id')
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}

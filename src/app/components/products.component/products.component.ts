import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './products.component.html',
})
export class ProductsComponent {
    constructor(
        public productService: ProductService,
        public cartService: CartService,
    ) {
        this.productService.fetchProducts();
    }
}

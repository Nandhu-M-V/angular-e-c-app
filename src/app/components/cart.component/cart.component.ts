import { Component, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/products.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart.component.html',
})
export class CartComponent {
    cartService = inject(CartService);
    productService = inject(ProductService);

    // 🔄 load cart once
    loadEffect = effect(() => {
        this.cartService.load();
    });

    // 🧠 map cart → products
    cartItems = computed(() => {
        const cart = this.cartService.cart();
        const products = this.productService.products();

        return cart.map((c) => ({
            ...c,
            product: products.find((p) => p.id === c.productId),
        }));
    });

    // 💰 total
    total = computed(() => {
        return this.cartItems().reduce((sum, item) => {
            return sum + (item.product?.price || 0) * item.quantity;
        }, 0);
    });
}

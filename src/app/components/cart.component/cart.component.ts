import { Component, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class CartComponent {
    cartService = inject(CartService);
    productService = inject(ProductService);
    router = inject(Router);

    // load cart once
    loadEffect = effect(() => {
        this.cartService.load();
    });

    goToProducts() {
        this.router.navigate(['/']);
    }

    cartItems = computed(() => {
        const cart = this.cartService.cart();
        const products = this.productService.products();

        return cart.map((c) => ({
            ...c,
            product: products.find((p) => p.id === c.productId),
        }));
    });

    total = computed(() => {
        return this.cartItems().reduce((sum, item) => {
            return sum + (item.product?.price || 0) * item.quantity;
        }, 0);
    });

    // Update quantity method
    updateQuantity(cartItemId: string, newQuantity: number) {
        // Find the cart item
        const cartItem = this.cartItems().find((item) => item.id === cartItemId);

        if (!cartItem) return;

        // Validate quantity
        if (newQuantity < 1) {
            // If quantity is less than 1, remove the item
            this.cartService.remove(cartItemId);
            return;
        }

        // Check stock availability
        const product = cartItem.product;
        if (product && newQuantity > product.stock) {
            alert(`Only ${product.stock} items available in stock`);
            return;
        }

        // Update quantity in cart service
        this.cartService.updateQuantity(cartItemId, newQuantity);
    }
}

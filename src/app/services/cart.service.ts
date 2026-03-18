import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/products';

@Injectable({ providedIn: 'root' })
export class CartService {
    cart = signal<Product[]>([]);

    total = computed(() => this.cart().reduce((sum, item) => sum + item.price, 0));

    addToCart(product: Product) {
        this.cart.update((items) => [...items, product]);
    }

    removeFromCart(id: number) {
        this.cart.update((items) => items.filter((p) => p.id !== id));
    }
}

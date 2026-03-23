import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { base_url } from '../../env.constants';
import { Cart } from '../models/cartItems';

@Injectable({ providedIn: 'root' })
export class CartService {
    private http = inject(HttpClient);
    private api = `${base_url}cart`;

    cart = signal<Cart[]>([]);

    load() {
        this.http.get<Cart[]>(this.api).subscribe((data) => {
            this.cart.set(data);
        });
    }

    count() {
        return this.cart().length;
    }

    add(userId: number, productId: string) {
        const existing = this.cart().find((c) => c.productId === productId && c.userId === userId);

        if (existing) {
            this.http
                .patch(`${this.api}/${existing.id}`, {
                    quantity: existing.quantity + 1,
                })
                .subscribe(() => this.load());
        } else {
            this.http
                .post(this.api, {
                    userId,
                    productId,
                    quantity: 1,
                })
                .subscribe(() => this.load());
        }
    }

    updateQuantity(cartItemId: string, newQuantity: number) {
        // Find the cart item from current signal
        const cartItem = this.cart().find((item) => item.id === cartItemId);

        if (!cartItem) return;

        // Validate quantity
        if (newQuantity < 1) {
            // If quantity is less than 1, remove the item
            this.remove(cartItemId);
            return;
        }

        // Update quantity via API
        this.http
            .patch(`${this.api}/${cartItemId}`, {
                quantity: newQuantity,
            })
            .subscribe(() => this.load());
    }

    remove(id: string) {
        this.http.delete(`${this.api}/${id}`).subscribe(() => this.load());
    }
}

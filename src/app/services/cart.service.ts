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

    remove(id: string) {
        this.http.delete(`${this.api}/${id}`).subscribe(() => this.load());
    }
}

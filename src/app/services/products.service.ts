import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private api = 'https://fakestoreapi.com/products';

    products = signal<Product[]>([]);
    loading = signal(false);

    constructor(private http: HttpClient) {}

    fetchProducts() {
        this.loading.set(true);

        this.http.get<Product[]>(this.api).subscribe({
            next: (data) => {
                this.products.set(data);
                this.loading.set(false);
            },
            error: () => this.loading.set(false),
        });
    }
}

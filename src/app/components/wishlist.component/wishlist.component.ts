import { Component, computed, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { ProductService } from '../../services/products.service';
import { SlicePipe } from '@angular/common';

@Component({
    selector: 'app-wishlist',
    imports: [SlicePipe],
    templateUrl: './wishlist.component.html',
})
export class WishlistComponent {
    private wishlistService = inject(WishlistService);
    private productService = inject(ProductService);

    userId = 1; // mock user

    // combine wishlist + products
    wishlistProducts = computed(() => {
        const wishlist = this.wishlistService.wishlist();
        const products = this.productService.products();

        return wishlist
            .filter((w) => w.userId === this.userId)
            .map((w) => products.find((p) => p.id === w.productId))
            .filter((p) => !!p);
    });

    remove(productId: string) {
        this.wishlistService.toggle(this.userId, productId);
    }
}

import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { TitleCasePipe } from '@angular/common';
import { Product } from '../../models/products';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-details.component.html',
})
export class ProductDetailComponent {
    private route = inject(ActivatedRoute);
    productService = inject(ProductService);
    cartService = inject(CartService);
    wishlistService = inject(WishlistService);
    router = inject(Router);

    specEntries = computed(() => {
        const p = this.product();
        return p?.specs ? Object.entries(p.specs) : [];
    });

    selectedImage: string | null = null;

    // Get productId from route params

    productId = this.route.snapshot.paramMap.get('id'); // string

    product = computed(() => this.productService.products().find((p) => p.id === this.productId));

    reviews = computed(() =>
        this.productService.reviews().filter((r) => String(r.productId) === this.productId),
    );

    goBack() {
        this.router.navigate(['/']);
    }
}

import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { TitleCasePipe } from '@angular/common';
import { Product } from '../../models/products';

@Component({
    selector: 'app-product-detail',
    imports: [TitleCasePipe],
    templateUrl: './product-details.component.html',
})
export class ProductDetailComponent {
    private route = inject(ActivatedRoute);
    productService = inject(ProductService);

    specEntries = computed(() => {
        const p = this.product();
        return p?.specs ? Object.entries(p.specs) : [];
    });

    // Get productId from route params

    productId = this.route.snapshot.paramMap.get('id'); // string

    product = computed(() => this.productService.products().find((p) => p.id === this.productId));

    reviews = computed(() =>
        this.productService.reviews().filter((r) => String(r.productId) === this.productId),
    );
}

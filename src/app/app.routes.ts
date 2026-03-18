import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/products.component/products.component').then(
                (m) => m.ProductsComponent,
            ),
    },
    {
        path: 'cart',
        loadComponent: () =>
            import('./components/cart.component/cart.component').then((m) => m.CartComponent),
    },
];

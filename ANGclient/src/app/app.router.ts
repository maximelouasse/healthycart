/*
Imports
*/
    // Angular
    import { Routes } from '@angular/router';

    // Inner
    import { AuthGuard } from "./auth.guard";
    import { HomePageComponent } from './routes/home-page/home-page.component';
    import { LoginPageComponent } from './routes/login-page/login-page.component';
    import { ScannerPageComponent } from './routes/scanner-page/scanner-page.component';
    import { ProductPageComponent } from './routes/product-page/product-page.component';
    import { ListRecipePageComponent } from './routes/list-recipe-page/list-recipe-page.component';
//

/*
Export
*/
    export const AppRouterModule: Routes = [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'login',
        component: LoginPageComponent,
        //canActivate: [ !AuthGuard ]
      },
      {
        path: 'scanner',
        component: ScannerPageComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'product',
        component: ProductPageComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'product/:barcode',
        component: ProductPageComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'recipe',
        component: ListRecipePageComponent,
        canActivate: [ AuthGuard ]
      },
    ];
//

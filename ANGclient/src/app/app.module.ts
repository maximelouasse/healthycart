/*
Imports
*/
    // Angular
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { HttpClientModule } from '@angular/common/http';
    import { FormsModule, ReactiveFormsModule } from "@angular/forms";

    // Router
    import { RouterModule } from "@angular/router"
    import { AppRouterModule } from "./app.router";

    // Inner
    import { MaterialModule } from './material/material.module';
    import { AppComponent } from './app.component';
    import { HomePageComponent } from './routes/home-page/home-page.component';
    import { LoginPageComponent } from './routes/login-page/login-page.component';
    import { RegisterPageComponent } from './routes/register-page/register-page.component';
    import { ProductPageComponent } from './routes/product-page/product-page.component';
    import { ScannerPageComponent } from './routes/scanner-page/scanner-page.component';
    import { FormLoginComponent } from "./modules/form/form-login/form-login.component";
    import { FormRegisterComponent } from "./modules/form/form-register/form-register.component";
    import { BotBarComponent } from './shared/bot-bar/bot-bar.component';
    import { SideBarComponent } from './shared/side-bar/side-bar.component';

    import { AuthService } from "./services/auth/auth.service";
    import { ProductService } from "./services/product/product.service";
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { ListRecipePageComponent } from './routes/list-recipe-page/list-recipe-page.component';
//

/*
Definition & export
*/
  @NgModule({
    declarations: [
      AppComponent,
      HomePageComponent,
      LoginPageComponent,
      RegisterPageComponent,
      ProductPageComponent,
      ScannerPageComponent,
      FormLoginComponent,
      FormRegisterComponent,
      BotBarComponent,
      SideBarComponent,
      ListRecipePageComponent
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot( AppRouterModule, { onSameUrlNavigation: 'reload' } ),
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MaterialModule
    ],
    exports: [RouterModule],
    providers: [AuthService, ProductService],
    bootstrap: [AppComponent]
  })
  export class AppModule { }

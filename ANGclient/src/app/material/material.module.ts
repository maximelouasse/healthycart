/*
Import
*/
  // Angular
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { MatButtonModule } from '@angular/material/button';
  import { MatButtonToggleModule } from '@angular/material/button-toggle';
  import { MatIconModule } from '@angular/material/icon';
  import { MatToolbarModule } from '@angular/material/toolbar';
  import { MatSidenavModule } from '@angular/material/sidenav';
  import { MatMenuModule } from '@angular/material/menu';
  import { MatListModule } from '@angular/material/list';
  import { MatGridListModule } from '@angular/material/grid-list';
  import { MatCardModule } from '@angular/material/card';
  import { MatStepperModule } from '@angular/material/stepper';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatExpansionModule } from '@angular/material/expansion';
  import { MatSelectModule } from '@angular/material/select';
//

const MaterialComponents = [
  CommonModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatSelectModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }

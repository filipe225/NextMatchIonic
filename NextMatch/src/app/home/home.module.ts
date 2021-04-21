import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { LogoComponent } from "../components/logo/logo.component";
import { LoginFormComponent } from "../components/login-form/login-form.component";
import { RegisterFormComponent } from "../components/register-form/register-form.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, LogoComponent, LoginFormComponent, RegisterFormComponent]
})
export class HomePageModule {}

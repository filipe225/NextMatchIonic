import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from "./logo/logo.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
    imports: [ CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
    declarations: [LogoComponent, FooterComponent],
    exports: [LogoComponent, FooterComponent]
})
export class ComponentsModule {}
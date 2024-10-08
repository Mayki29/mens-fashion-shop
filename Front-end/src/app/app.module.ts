import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAccordionModule, NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { HomeComponent } from './pages/home/home.component';
import { PagoComponent } from './pages/pago/pago.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CarritoProductComponent } from './shared/pagos/carrito-product/carrito-product.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';

import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './services/api.service';
import { CapitalizePipe } from './capitalize.pipe';
import { PortalComponent } from './pages/portal/portal.component';
import { MiscomprasComponent } from './pages/miscompras/miscompras.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductosComponent,
    HomeComponent,
    PagoComponent,
    ProductoComponent,
    RegistroComponent,
    LoginComponent,
    CarritoComponent,
    CarritoProductComponent,
    ProductCardComponent,
    CapitalizePipe,
    NosotrosComponent,
    PortalComponent,
    ProductFilterComponent,
    NosotrosComponent,
    PortalComponent,
    MiscomprasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbAccordionModule,
    CarouselModule
  ],
  providers: [ApiService,
    {provide:HTTP_INTERCEPTORS, useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

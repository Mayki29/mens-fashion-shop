import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { PagoComponent } from './pages/pago/pago.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import {NosotrosComponent } from './pages/nosotros/nosotros.component';
import {PortalComponent } from './pages/portal/portal.component';
import { MiscomprasComponent } from './pages/miscompras/miscompras.component';
import { UserGuard } from './guards/user-.guard';
import { IsAdminGuard } from './guards/is-admin.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductosComponent, canActivate: [UserGuard] },
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pago', component: PagoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'portaladmin', component: PortalComponent, canActivate: [IsAdminGuard] },
  { path: 'miscompras', component: MiscomprasComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

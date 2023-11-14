import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { NgbDropdown, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContratoComponent } from './contrato/contrato.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EstadoContratoComponent } from './contrato/estado-contrato/estado-contrato.component';
import { ServiciosPrestacionesComponent } from './contrato/servicios-prestaciones/servicios-prestaciones.component';
import { MyFilterPipe } from './myfilter.pipe';
import { EditarServiciosPrestacionesComponent } from './contrato/servicios-prestaciones/editar-servicios-prestaciones/editar-servicios-prestaciones.component';
import { CrearServiciosPrestacionesComponent } from './contrato/servicios-prestaciones/crear-servicios-prestaciones/crear-servicios-prestaciones.component';
import { IngresarServicioComponent } from './contrato/servicios-prestaciones/ingresar-servicio/ingresar-servicio.component';
import { DatosServiciosPrestacionesComponent } from './contrato/servicios-prestaciones/datos-servicios-prestaciones/datos-servicios-prestaciones.component';
import { CrearDescuentoNoTransaccionalComponent } from './contrato/servicios-prestaciones/datos-servicios-prestaciones/crear-descuento-no-transaccional/crear-descuento-no-transaccional.component';
import { EditarDescuentoNoTransaccionalComponent } from './contrato/servicios-prestaciones/datos-servicios-prestaciones/editar-descuento-no-transaccional/editar-descuento-no-transaccional.component';
import { CrearContratoComponent } from './contrato/crear-contrato/crear-contrato.component';
import { ContratoProcesadoraComponent } from './contrato-procesadora/contrato-procesadora.component';
import { CambioEstadoLiqChequeComponent } from './contrato-procesadora/cambio-estado-liq-cheque/cambio-estado-liq-cheque.component';
import { ParametrosComisionComponent } from './contrato-procesadora/parametros-comision/parametros-comision.component';
import { CreateParametroComisionComponent } from './contrato-procesadora/parametros-comision/create-parametro-comision/create-parametro-comision.component';
import { CrearAdicionalComponent } from './contrato/servicios-prestaciones/datos-servicios-prestaciones/crear-adicionales/crear-adicional.component';
import { EditarAdicionalComponent } from './contrato/servicios-prestaciones/datos-servicios-prestaciones/editar-adicional/editar-adicional.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ContratoComponent,
    EstadoContratoComponent,
    ServiciosPrestacionesComponent,
    MyFilterPipe,
    EditarServiciosPrestacionesComponent,
    CrearServiciosPrestacionesComponent,
    IngresarServicioComponent,
    DatosServiciosPrestacionesComponent,
    CrearDescuentoNoTransaccionalComponent,
    EditarDescuentoNoTransaccionalComponent,
    CrearAdicionalComponent,
    EditarAdicionalComponent,
    CrearContratoComponent,
    ContratoProcesadoraComponent,
    CambioEstadoLiqChequeComponent,
    ParametrosComisionComponent,
    CreateParametroComisionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    DecimalPipe,
    MyFilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

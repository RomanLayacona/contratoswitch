import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratoComponent } from './contrato/contrato.component';
import { CONTRATO_ROUTES } from './contrato/contrato.routes';
import { EstadoContratoComponent } from './contrato/estado-contrato/estado-contrato.component';
import { CrearServiciosPrestacionesComponent } from './contrato/servicios-prestaciones/crear-servicios-prestaciones/crear-servicios-prestaciones.component';
import { DatosServiciosPrestacionesComponent } from './contrato/servicios-prestaciones/datos-servicios-prestaciones/datos-servicios-prestaciones.component';
import { CrearDescuentoNoTransaccionalComponent } from './contrato/servicios-prestaciones/datos-servicios-prestaciones/crear-descuento-no-transaccional/crear-descuento-no-transaccional.component';
import { EditarServiciosPrestacionesComponent } from './contrato/servicios-prestaciones/editar-servicios-prestaciones/editar-servicios-prestaciones.component';
import { IngresarServicioComponent } from './contrato/servicios-prestaciones/ingresar-servicio/ingresar-servicio.component';
import { ServiciosPrestacionesComponent } from './contrato/servicios-prestaciones/servicios-prestaciones.component';
import { InicioComponent } from './inicio/inicio.component';
import { EditarDescuentoNoTransaccionalComponent } from './contrato/servicios-prestaciones/datos-servicios-prestaciones/editar-descuento-no-transaccional/editar-descuento-no-transaccional.component';
import { CrearContratoComponent } from './contrato/crear-contrato/crear-contrato.component';
import { ContratoProcesadoraComponent } from './contrato-procesadora/contrato-procesadora.component';
import { AppComponent } from './app.component';
import { CambioEstadoLiqChequeComponent } from './contrato-procesadora/cambio-estado-liq-cheque/cambio-estado-liq-cheque.component';
import { ParametrosComisionComponent } from './contrato-procesadora/parametros-comision/parametros-comision.component';
import { CreateParametroComisionComponent } from './contrato-procesadora/parametros-comision/create-parametro-comision/create-parametro-comision.component';
import { CrearAdicionalComponent } from './contrato/servicios-prestaciones/datos-servicios-prestaciones/crear-adicionales/crear-adicional.component';
import { EditarAdicionalComponent } from './contrato/servicios-prestaciones/datos-servicios-prestaciones/editar-adicional/editar-adicional.component';

const routes: Routes = [
  {path: '', component: ContratoComponent},
  {path: 'contrato-procesadora', component: ContratoProcesadoraComponent},
  {path: 'contrato-procesadora/cambio-estado-liquida-cheque', component: CambioEstadoLiqChequeComponent},
  {path: 'contrato-procesadora/agregar-parametro-comision', component: CreateParametroComisionComponent},
  //{path: 'contrato', component: ContratoComponent},
  {path: 'contrato/:id/edit', component: EstadoContratoComponent},
  {path: 'contrato/create', component: CrearContratoComponent},
  {path: 'contrato/:id/:tipoContrato/servicios-y-prestaciones', component: ServiciosPrestacionesComponent},
  {path: 'servicios-y-prestaciones/servicio/:srvIde/editar', component: EditarServiciosPrestacionesComponent },
  {path: 'servicios-y-prestaciones/servicio/crear', component: CrearServiciosPrestacionesComponent },
  {path: 'servicios-y-prestaciones/servicio/ingresar', component: IngresarServicioComponent },
  {path: 'servicios-y-prestaciones/:servicio/:prestacion', component: DatosServiciosPrestacionesComponent },
  {path: 'servicios-y-prestaciones/:servicio/:prestacion/nuevo-descuento-no-transaccional', component: CrearDescuentoNoTransaccionalComponent },
  {path: 'servicios-y-prestaciones/:servicio/:prestacion/editar-descuento-no-transaccional', component: EditarDescuentoNoTransaccionalComponent },
  {path: 'servicios-y-prestaciones/:servicio/:prestacion/nuevo-adicional', component: CrearAdicionalComponent },
  {path: 'servicios-y-prestaciones/:servicio/:prestacion/editar-adicional', component: EditarAdicionalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { RouterModule, Routes } from '@angular/router';
import { EstadoContratoComponent } from './estado-contrato/estado-contrato.component';

export const CONTRATO_ROUTES : Routes = [
    {path: ':id/edit', component: EstadoContratoComponent}
];

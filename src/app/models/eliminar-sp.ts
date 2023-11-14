import { DatoCamEstServPrest } from "./cambio-estado-sp";

export interface EliminarServPres {
    Autenticacion?: Autenticacion;
    DatosServPres?: DatoCamEstServPrest[];
}


export interface Autenticacion {
    Usuario?: string;
    Contrasenha?: string;
}

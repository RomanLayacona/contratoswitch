import { ContratoSwitch } from "./contrato-switch";
import { ServicioPrestacion } from "./servicio-prestacion";

export interface ContratoFindExt {
    DatosContratos: ContratoSwitch;
}

export interface DatosContSerPre {
    DatosContSerPre: ContratoSwitch;
}

export interface ServicioModel {
    DatosContSerPre: ServicioPrestacion;
}

export interface ContratoFind {
    CodigoCliente: number;
    CodigoSucursal: number;
    Usuario: string;
    UserWs: string;
    PassWs: string;
    ModoRest: string;
}

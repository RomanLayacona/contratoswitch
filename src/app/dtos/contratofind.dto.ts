import { environment } from "src/environments/environment";
import { ContratoFind, ContratoFindExt } from "../models/contrato-find";

export class ContratoFindDto {
    constructor() {}

    toDto(data: any): ContratoFindExt {
        return {
            DatosContratos: {
                CodigoCliente: data.CodigoCliente,
                CodigoSucursal: data.CodigoSucursal,
                Usuario: "sistema",
                UserWs: `${environment.usuarioBancard}`,
                PassWs: `${environment.claveBancard}`,
                ModoRest: data.ModoRest
            }
        }
    }
}
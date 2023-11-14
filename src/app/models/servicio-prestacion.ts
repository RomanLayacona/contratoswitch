export interface ServicioPrestacion {
    FS44EmpCod?: string;
    FS44SrvIde?: string;
    FS44CodPre?: string;
    FS44DivCod?: number;
    FS01DivCod?: number;
    FS46CLICOD?: string;
    FS46CLISUC?: string;
    FS47CntCon?: number;
    FS47CntAvi?: number;
    FS47CntAct?: number;
    FS47FATNom?: string;
    FS45TarCod?: number;
    FS45TarNom?: string;
    FS47AgTNo?: string;
    FS47TarPor?: number;
    FS47MonCnu?: number;
    FS47TarImp?: number;
    FS47Sts?: string;
    FS44DesPre?: string;
    FS44SrvNom?: string;
    FS47FATId?: string;
    FS47IniCob?: string;
    FS01CONTPO?: string;
    FS46CONNRO?: number;
    Usuario?: string;
    PassWs?: string;
    UserWs?: string;
    ModoRest?: string;
    FS47AgTId?: number;
    FS47CliCod?: string;
    FS47CliSuc?: string;
    FS01ConTpo?: string;
    FS46ConNro?: string;
    FS46CliCod?: string;
    FS46CliSuc?: string;
    FS46UsuUpd?: string;
    FS44SRVIDE?: string;
    FS44SRVNOM?: string;
    FS01ConDsc?: string;
    FS46CliNom?: string;
    FS46CliSNo?: string;
    FS46CasMat?: string;
    FS44TrnStt?: number;
    FS44PreCuo?: number;
    FS44PreDes?: number;
    FS44PreAct?: number;
    FS44PreDif?: number;
}

export interface ServicioConPrestaciones {
    GE42SRVIDE?: string;
    GE42SRVNOM?: string;
    Prestaciones?: Prestacion[];
}

export interface Prestacion {
    GE44CODPRE?: string;
    GE44DESPRE?: string;
}
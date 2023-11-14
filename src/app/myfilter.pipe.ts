import { Pipe, PipeTransform } from '@angular/core';
import { ServicioPrestacion } from './models/servicio-prestacion';

@Pipe({
    name: 'myfilter',
    pure: true
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: ServicioPrestacion): any {
        filter.FS44DivCod?.toString();
        if (!items || !filter || Object.keys(filter).length === 0) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.FS44SrvIde.indexOf(filter.FS44SrvIde?.toUpperCase()) !== -1 || item.FS44CodPre.indexOf(filter.FS44CodPre?.toUpperCase()) !== -1 || item.FS44DivCod.toString().indexOf(filter.FS44DivCod) !== -1 || item.FS47Sts.indexOf(filter.FS47Sts?.toUpperCase()) !== -1);
    }
}
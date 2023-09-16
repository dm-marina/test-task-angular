import {Injectable} from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter{
   override parse(value:any):Date|null{
        if((typeof value ==='string') && (value.indexOf('/')>1)){
            const str = value.split('/');
            const date =  Number(str[0]);
            const mounth = Number(str[1])-1;
            const year = Number(str[2])
            return new Date(year, mounth, date)
        }
        const timestamp = typeof value == 'number'? value : Date.parse(value);
        return isNaN(timestamp)? null : new Date(timestamp)
    }
    override format(date:Date, displayFormat:string):string{
        if(displayFormat === 'input'){
            const day = date.getDate();
            const month = date.getMonth()+1;
            const year = date.getFullYear();
            return this.make2chars( day) +'-'+ this.make2chars( month)+'-'+year
        }else{
            return date.toDateString();
        }
    }

    make2chars(number:number):string{
        return ('00'+number).slice(-2)
    }
}

export const DateFormat={
    parse:{
        dateInput: {month:'short', day: 'numeric', year:'numeric'}
    },
    display:{
        dateInput: 'input',
        monthYearLabel: 'inputMonth',
        date:{ year: 'numeric', month: ' numeric', day: 'numeric'}
    }
}

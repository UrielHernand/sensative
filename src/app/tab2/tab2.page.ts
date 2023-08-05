import { Component, PipeTransform  } from '@angular/core';
import { ServiceService} from '../Service/service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements PipeTransform{

  registros : any ;
  transformRegistros: any;
  


  constructor(  private service: ServiceService ) {


  }
transform(value: any): any[] {
    // Convierte el objeto de registros en un arreglo y devuelve el resultado
  
    return   Object.keys(value).map((key) => value[key]);
  }

  async ngOnInit() {
    this.registros = await this.service.getRegistros();
   
  }

  async  ionViewWillEnter(){
    
    this.registros = await this.service.getRegistros();
     this.transformRegistros =  this.transform(this.registros);
     console.log(this.transformRegistros);

  }

}

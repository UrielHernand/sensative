import { Injectable } from '@angular/core';
import { app } from 'src/environments/environment.prod';
import { getDatabase, ref, set, child, get, push } from 'firebase/database';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  countBeat: any = 0;
  medir: any = 0;
  constructor() {
    console.log('hola');
  }

  async leerDatos() {
    const database = getDatabase(app);
    const dbRef = ref(database);


    return await get(child(dbRef, `/pulso`)).then((snapshot) => {
      console.log(snapshot.val());
      return snapshot.val();
    });
  }


  async getRegistros() {
    const database = getDatabase(app);
    const dbRef = ref(database);

    return await get(child(dbRef, `/registros`)).then((snapshot) => {

      
      console.log(snapshot.val());
      return snapshot.val();
    });
  }
  async escribirDatos(registro: any) {
    const database = getDatabase(app);
    const dbRef = ref(database, 'registros/');

      let result =  await push(dbRef, registro);
   
      // Manejar el caso cuando 'registros.pulsos' no está definida o es 'undefined'
      console.log(result);
     
  }
  async medirPulso(estado:boolean) {
    const database = getDatabase(app);
    const dbRef = ref(database, 'medir/');
    await  set(dbRef, {
      medir: estado, 
    });
  }

}

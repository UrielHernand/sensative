import { Injectable } from '@angular/core';
import { app } from 'src/environments/environment.prod';
import { getDatabase, ref, set, child, get, push } from 'firebase/database';
@Injectable({
  providedIn: 'root',
})

//docmuentar cada función y cada variable
export class ServiceService { //clase para el servicio
  countBeat: any = 0; //variable para contar los pulsos
  medir: any = 0; //variable para medir el pulso
  constructor() {
    //constructor de la clase
    console.log('Inicio');
  }

  async leerDatos() {
    //función para leer los datos de la base de datos
    const database = getDatabase(app);
    const dbRef = ref(database);

    // Obtener los datos de la base de datos
    return await get(child(dbRef, `/pulso`)).then((snapshot) => {
      console.log(snapshot.val()); //
      return snapshot.val(); //retorna el valor de la base de datos
    });
  }

  async getRegistros() {
    //función para obtener los registros de la base de datos
    const database = getDatabase(app);
    const dbRef = ref(database);

    return await get(child(dbRef, `/registros`)).then((snapshot) => {
      console.log(snapshot.val());
      return snapshot.val();
    });
  }
  //función para escribir los datos en la base de datos
  async escribirDatos(registro: any) {
    const database = getDatabase(app);
    const dbRef = ref(database, 'registros/');

    let result = await push(dbRef, registro);

    // Manejar el caso cuando 'registros.pulsos' no está definida o es 'undefined'
    console.log(result);
  }
  //función para medir el pulso 0 desactivr medición
  async medirPulso(estado: boolean) {
    const database = getDatabase(app);
    const dbRef = ref(database, 'medir/');
    await set(dbRef, {
      medir: estado,
    });
  }
}

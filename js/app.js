//Variables
const formulario = document.querySelector('#nueva-cita');//1
const mascota = document.querySelector('#mascota');//1
const propietario = document.querySelector('#propietario');//1
const telefono = document.querySelector('#telefono');//1
const fecha = document.querySelector('#fecha');//1
const hora = document.querySelector('#hora');//1
const sintomas = document.querySelector('#sintomas');//1
const btnCrearCita = document.querySelector('.btn');
//El lugar donde voy a colocar mis elementos ya obtenidos
const contenedorCitas = document.querySelector('#citas');//1
/*Después de leer los campos necesito juntar esa información que voy a necesitar, pero de qué manera lo voy a hacer...
Tengo que hacerlo con un objeto.
Pero, de donde sacaría esa información, mhmm...
tengo que checar los apuntes que necesito de los formularios sin ver lo que tengo que hacer...*/

let editando;

const citasObj = {//1
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}
//EVENTLISTENERS
eventListeners();//1
function eventListeners(){//1
    //Al iniciar la app yo quiero que me muestre un mensaje de no hay citas
  /*  document.addEventListener('DOMContentLoaded', () => {
        //mensaje de entrada, no hay citas o algo así.
        const mensajeInicio = document.querySelector('#administra');//h1 o titulo cambiante.
        mensajeInicio.textContent = 'No hay visitas creadas, comienza creando una.';
        //DONDE LO VOY A COLOCAR, EL LUGAR...
        citas.appendChild(mensajeInicio);
    });
*/
    formulario.addEventListener('submit', agregarCita); /*comentado hasta que lo use*/
    mascota.addEventListener('input', datosCita);
    propietario.addEventListener('input', datosCita);
    telefono.addEventListener('input', datosCita);
    fecha.addEventListener('input', datosCita);
    hora.addEventListener('input', datosCita);
    sintomas.addEventListener('input', datosCita);
};//A todos les voy a mandar la misma funcion de validar campo, sisi jasjsajsa.
/*De esta manera podríamos hacer todos de una vez, no uno por uno y volvernos locos jajjas*/

//FUNCIONES
function datosCita(e){//2
 citasObj[e.target.name] = e.target.value;//Extraemos lo que el usuario coloque y lo colocamos en el objeto.
/*console.log(citasObj); en esta parte va a extraer cada elemento y lo va a mostrar en consola cada que 
se ejecute el evento*/
}

/*clases 
clase de citas y clase de IU.
Definir lo que haremos, por ejemplo, en la otra parte, en el otro proyecto,  

CITAS: esta se encarga de agregar una cita, editar una cita, eliminar una cita. ya lo que es mostrarlas es UI
UI mostrar las citas.

*/
class Citas {/*Ahora, citas va a tener un constructor, ya que la forma en la que nosotros vamos a organizar la info
es por medio de arreglos, por lo que sería, en cuanto se cree la instancia vamos a crear un arreglo de citas.*/   
    constructor (){
        this.citas = [];//Estas citas de van a ir agregando con un método.
    }
    agregandoCita(citas){
        this.citas = [...this.citas, citas];
        //console.log(this.citas);
    }
    eliminarCita(id){//va a tomar un id
        //  UTILIZAREMOS FILTER
        this.citas = this.citas.filter((cita) => cita.id !== id);
/*Accedemos al arreglo de citas, e iteramos sobre el mismo con un filter(este recorre por todos y hace excepciones)
le pasamos un parámetro dentro del filter para que tome el lugar de cada cita.
Entonces, nos vamos a traer todos los que sean diferentes a la que le estamos pasando, diferentes al id que le estamos pasando
Y de esa forma vamos a eliminar las citas*/
    }
    editarCita(citaActualizada){
        this.citas = this.citas.map((cita) => cita.id === citaActualizada.id ? citaActualizada : cita);
    }
    /*
    [
        {id: 1},
        {id: 2}
    ]*/
}
class UI {
    imprimirAlerta(mensaje, tipo){//Los parámetros son las variables de los datos que colocamos al mandar llamar esta función.
        /*En este caso es un mensaje(literal, en letras pusimos el argumento) y el otro es el tipo(en bootstrap)*/

        //CREAR EL ELEMENTO DE ALERTA, EL LUGAR DONDE Y POR CUÁNTO TIEMPO LO QUEREMOS ALLÍ.
        const mensajeAlerta = document.createElement('div');
        mensajeAlerta.classList.add('text-center', 'alert', 'd-block', 'col-12');
        if(tipo === 'error'){
            mensajeAlerta.classList.add('alert-danger');
        }else {
            mensajeAlerta.classList.add('alert-success');
        }
        mensajeAlerta.textContent = mensaje;
        /*Donde lo voy a colocar(tendré que checar el documento con chrome developer tools.)*/
        formulario.appendChild(mensajeAlerta);
        setTimeout(() => {
            mensajeAlerta.remove();
        }, 1500);
    }
    imprimirHTMLCitas(cita){//Aquí extraenos los datos de cada cita.
        const  { citas } = cita;
//console.log(cita);
        this.limpiarHTML();
        citas.forEach(cita => {//accedemos a cada cita
            const {mascota, propietario, fecha, hora, sintomas, telefono, id} = cita;//Extraigo de la cita actual el objeto actual.
        
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;/*Aquí le agregamos a este div contenedor de la cita(al div de la cita) o bien, a la misma cita
            el identificador único que necesitamos para eliminar después.*/
        
        /*La verdad,*/

            //Scripting de los elementos de la cita.
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota; 

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono: </span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">fecha: </span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">hora: </span> ${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`;

            //CREANDO UN BOTON PARA CADA CITA(ELEMENTO CREADO)
            const btnBorrar = document.createElement('button');
            //Quiero ver como ponerle el type submit a cada btn jajaj
            btnBorrar.type = 'submit';
            btnBorrar.classList.add('btn', 'btn-danger', 'mr-2');
            btnBorrar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          `;//Este fue de heroIcons, sólo se copia y pega, no se importa nada, está chevere la vdd
        //Seleccionar y darle un evento para eliminar una cita
        btnBorrar.onclick = () => eliminarCita(id);/*Le vamos a pasar el argumento(el valor real) esto es porque momentos antes
        ya accedimos al id, ese será su valor real, pero nos falta su parámetro en otra función para que tome el lugar del
        argumento.(Definimos esa función en la parte inferior)*/

            const btnEditar = document.createElement('button');
            //btnEditar.type = 'submit';//SI FUNCIONO EL TYPE SUBMIT
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          `;
          btnEditar.onclick = () => {
            cargarEdicion(cita)
          };//Se manda llamar la funcionalidad
            //Agregar los párrafos al divCita 
            divCita.append(mascotaParrafo, propietarioParrafo, telefonoParrafo, fechaParrafo, horaParrafo, sintomasParrafo, btnBorrar, btnEditar);

            //Agregar las citas al html
            contenedorCitas.appendChild(divCita);

        });
    }
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}
//Estas dos las estoy instanciando de manera global, porque requerimos varias funciones.
const ui = new UI();//Entonces después de las clases es instanciarlas.
const administrarCitas = new Citas();

//VALIDA Y AGREGA UNA NUEVA CITA A LA CLASE DE CITAS.
/*ya vi que si era como pensaba, enrealidad si teníamos que hacer la validación por medio del submit del formulario, 
ahora, lo que tendría que ver sería como conectar esta función a la clase de citas....*/
function agregarCita(e){
    e.preventDefault();/*Fnciona...*/
    const {mascota, propietario, fecha, hora, sintomas, telefono} = citasObj;/*Esta sintaxis es para extraer*/     
    /*Entonces, aquí tendríamos que poner las demás validaciones...*/
    if(mascota === '' || propietario === '' || fecha === '' || hora === '' || sintomas === '' || telefono === '' ){
       //En caso de que esté vacío imprime una alerta, mandando llamar la clase ui y la funcionalidad que crearemos.
       ui.imprimirAlerta('Todos los campos son obligatorios', 'error'); 
        console.log('aLERTA, TODOS LOS CAMPOS SON OBLIGATORIOS');
        return;//El return para que no ejecute la siguiente línea,sino lo ponemos aunque esté en un if, va a ejecutar la sig linea
    }
    if(editando){
        console.log('MODO EDICION');
        ui.imprimirAlerta('editado correctamente');
        //Pasar el objeto de la cita a edicion.
        administrarCitas.editarCita({...citasObj});

        //Regresar el texto del boton a su estado inicial

        //Cambiar el texto al valor inicial
        formulario.querySelector('button[type="submit"]').textContent = 'crear nueva cita';
        editando = false;

    }else {
        console.log('Modo nueva cita');
        //Generar un id único para cada cita.
        citasObj.id = Date.now();
        //crear la nueva cita.
        administrarCitas.agregandoCita({...citasObj});

        //Mensaje de agregado correctamente
        ui.imprimirAlerta('se agrego correctamente');
    }
    
    ui.imprimirAlerta('Pasaste la validacion', 'correct'); //quí voy a enviar un mensaje de cita agregada o algo así, está funcionando correctamente.
    /*//Generar un id único para cada cita.
    citasObj.id = Date.now();
    //Ya habiendo pasado la validacion creamos la cita
    //CREANDO LA CITA.
 
    /* console.log(citasObj);Aquí ya tenemos hecho el objeto, al mandar llamar citas objt
    ya no me manda el objeto cada que se vaya llenando, sino que aquí ya me manda el objeto lleno.
    administrarCitas.agregandoCita({...citasObj});*/
    //Reiniciar el objeto para prevenir la copia de datos innecesaria
    reiniciarObjeto();
    //Reiniciar el formulario
    formulario.reset();
    //Mostrar el HTML
    ui.imprimirHTMLCitas(administrarCitas);
};
function reiniciarObjeto(){
    citasObj.mascota = '';
    citasObj.propietario = '';
    citasObj.telefono = '';
    citasObj.fecha = '';
    citasObj.hora = '';
    citasObj.sintomas = '';    
};

/*Creo que la forma de hacer destructuring para citas, es ponerle un nombre diferente. 
el citas dentro del destructuring sería la manera en la que nosotros accedemos a la propiedad
del objeto padre de citas(básicamente al arreglo, es el arreglo lo que está dentro de paréntesis)
En cambio, se le iguala a citas por ser creado con const. y el parámetro podría ser igual, esos 
dos serían cita y el valor dentro de los paréntesis sería citas, el valor del arreglo.

Si, estuve en lo correcto, si se puede,
imprimirCitas(cita){
    const {citas} = cita; 
    console.log(cita);
    Aquí ya estamos accediendo a nuestro arreglo, sólo no hay que poner el nombre igual, ya que podría ser algo tedioso.
    
}
*/
function eliminarCita(id){
    //console.log(id); ya al darle eliminar nos muestra el id único de la cita.

    /*Yo estoy creando una función para pss la funcionalidad y también para mandar llamar varios métodos en esta misma, por ejemplo
    mensajes de ya se ha eliminado tu cita o algo así.*/

    //ELIMINAR LA CITA
    //Para eliminar tenemos que agregar un método en nuestra clase.
    administrarCitas.eliminarCita(id);
    //MUESTRA UN MENSAJE
    ui.imprimirAlerta('Cita eliminada');

    //REFRESCAR LA CITA()
    /*En refrescar la cita, es , enséñame lo nuevo, lo que se quedó*/
    ui.imprimirHTMLCitas(administrarCitas);
    
}
function cargarEdicion(cita){//Toma un parámetro porque el argumento ya lo tiene(el valor real de propietario, nombre etc)
/*console.log(cita);Hasta aquí ya tengo los valores que quiero, pero también quiero ponerlos en el formulario nuevamente, 
volver a validar, pasa todas las validaciones, después de que pasa las validaciones quiero intercambiar el contenido de las
citas por el nuevo contenido de los formularios.

Variable que no estaba tomando en cuenta.
lo primero sería llenar el input, si yo presiono en editar, los campos se tienen que llenar con la información que yo tengo 
de la cita.(destructuring)*/
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;    
    //Vamos a extraerlo de la cita que lo estamos pasando(ese cita es todo el arreglo)

    //LLENAR LOS INPUTS
   document.querySelector('#mascota').value = mascota;
    /*En teoría accedemos al valor de los campos y después le colocamos un nuevo valor*/
    document.querySelector('#propietario').value = propietario;
    document.querySelector('#telefono').value = telefono;
    document.querySelector('#fecha').value = fecha;
    document.querySelector('#hora').value = hora;
    document.querySelector('#sintomas').value = sintomas;

    /*Resolviendo error de que al presionar guardar cambios me aparezca mensaje de error, cuando los campos realmente 
    están llenos esto se debe a que estamos validando por el objeto global
    En teoría, accederíamos al valor de los campos del objeto
    y le colocamos el valor que tiene el objeto, es sólo para pasar este por así decirlo error
    ERROR: este error se ejecuta cuando ya creamos una primer cita, después de haber pasado 
    esta primer cita y le damos en editar nos regresa obviamente los datos que extrajimos de la
    cita que estamos editando(identificamos la cita que vamos a editar con un id), en este momento
    los campos están llenos, si le doy en guardar cita me va a mandar una alerta(tengo que crearla jajaj)
    que m dice que todos los campos tienen que estar llenos, es por ello que hacemos esto
    por así denoticirlo, para que reconozca los carácteres que le mandamos de la cita a el formulario
    pero seguían estando vacíos, de esta manera los llenamos con la info que el usuario coloque.*/
    citasObj.mascota = mascota; 
    citasObj.propietario = propietario; 
    citasObj.telefono = telefono; 
    citasObj.fecha = fecha; 
    citasObj.hora = hora; 
    citasObj.sintomas = sintomas; 
    /*Aqui no estoy extrayendo el valor del id de la cita, sino que cuando editamos, vamos a las citas, 
    buscamos ese id y lo editamos.*/
    citasObj.id = id; /*Checar más a fondo para que es esto*/
   
    //Cambiar el texto del btn
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    //MODO EDICION
    editando = true; 
}
/*Quizás no está reconociendo las propiedades, por lo que voy a seleccionarlos
por completo, con querySelector*/

/*La primera vez que yo creo una cita me va a arrojar modo nueva cita, si le doy en editar y nuevamente lo envio
como guardar cambios pues me aparece modo edicion.

Y como tal podría quedar de esta manera, perooo, por otro lado.
Lo que podríamos hacer sería mmm


*/


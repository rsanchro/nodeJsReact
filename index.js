import express from 'express'; // ECMASCRIPT6
import morgan from 'morgan'; // ECMASCRIPT6
import cors from 'cors'; // ECMASCRIPT6
import path from 'path'; // ECMASCRIPT6 del path para deirle donde se encuentra nuestra carpeta publica
import mongoose from 'mongoose';
import router from './routes'; // importamos las rutas rutes (index.js)

// ECMASCRIPT 5
// const express=require('express');
// const morgan =require('morgan');
// const cors=require('cors');
// PRIMER MIDDLEWARE  - MORGAN (PERMITE VER POR CONSOLA PRIMERAS APLICACIONES QUE VIENEN POR CONSOLA)


// Conexión a la base de datos y nombre de bd
mongoose.Promise=global.Promise;
const dbUrl = 'mongodb://localhost:27017/dbsistema';
mongoose.connect(dbUrl, {useCreateIndex:true, useNewUrlParser: true})
.then(mongoose => console.log('Conectando a la base de datos en el puerto 27017')) // si todo es correcto msg
.catch(err => console.log(err)); // Error en la bd conexion

const app=express();
// añadimos morgan al index y metemos en mdo desarrollo
app.use(morgan('dev'));
app.use(cors());

// estas dos linea habilitamos que nuestro backend pueda recibir peticiones json por post
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public'))); // se le indica la página de inicio (de archivos estaticsos que van a ser públicos)
// al hacer referencia al api llamo al objeto router (que es quien va a gestionar las rutas, el index de la carpeta routes)
app.use('/api',router); // gestionamos al indicar /api en la ruta:3000 de localhost las rutas que con categorias forma /api/categorias apra crear la ruta dd, remove, etc... indicadas en su index

// Obtener el puerto que exista en el servicio y si no lo obtiene que meta el 3000, y ese valor se almacena en port
app.set('PORT', process.env.PORT || 3000)


// llamada a la función middleware para que al escuchar la ruta que sea llama a una función co 2 argumentos que responde enviando el texto
app.get('/hola',function(req,res){
    res.send('Hello World');
});

// Escucha en localhost puerto 3000  y saca por consola un server en puerto 3000
app.listen(app.get('PORT'),()=>{
    // console.log('server on port'+ app.get('PORT'));
    console.log(path.join(__dirname,'public')); // constante de nodejs que nos da el directorio delde donde se ejecuta index.js (el proyecto)
});

// CORRS AGREGA PETICIONES DE OTROS SERVIDORES A NUESTRO SERVIDOR SIN QUE DE PROBLEMAS


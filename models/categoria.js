import mongoose, {Schema} from 'mongoose';
// importo mongose y el primer schema
const cateoriaSchema = new Schema({
    // en la documentacion de la pagina oficial de mongoose aparecen estas características para cada dat
    nombre:{type:String, maxlength:50, unique:true, required:true},
    descripción: {type:String, maxlenght:255},
    estado: {type:Number,default:1},
    createdAt:{type:Date, default:Date.now}    
});

// se le indica que mongoose lo conbierta en un modelo y va a tomar como base categoriaSchema
const Categoria = mongoose.model('categoria', categoriaSchema);

// cuando se exporta es porque se le va a mandar a alguien
export default Categoria;


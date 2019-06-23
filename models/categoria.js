import mongoose, {Schema} from 'mongoose';
// importo mongose y el primer schema
const categoriaSchema = new Schema({
    // en la documentacion de la pagina oficial de mongoose aparecen estas características para cada dat
    nombre:{type:String, maxlength:50, unique:true, required:true},
    descripcion:{type:String, maxlength:50, required:true},
    estado: {type:Number,default:1},
    createdAt:{type:Date, default:Date.now}
});

// se le indica que mongoose lo convierta en un modelo y va a tomar como base categoriaSchema
const Categoria = mongoose.model('categoria', categoriaSchema);

// cuando se exporta es porque se le va a mandar a alguien
export default Categoria;


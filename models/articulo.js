import mongoose,{Schema} from 'mongoose';

const articuloSchema = new Schema({
    categoria: {type: Schema.ObjectId, ref:'categoria'}, // dices que obtendrá un tipo Schema.ObjectoId con referencia añl modelo caregoria
    codigo: {type: String,maxlength:64},
    nombre:{type:String,maxlength:50,unique:true,required:true},
    descripcion: {type:String,maxlength:255},
    precio_venta:{type:Number,required:true},
    stock:{type:Number,required:true},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});
// en mongo se llamará artculo que representará  lo creado en  la const articuloSchema
const Articulo = mongoose.model('articulo',articuloSchema);
export default Articulo;
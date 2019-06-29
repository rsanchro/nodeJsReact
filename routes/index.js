import routerx from 'express-promise-router';
import usuarioRouter from './usuario';
import categoriaRouter from './categoria';
import articuloRouter from './articulo';
import personaRouter from './persona';
import ingresoRouter from './ingreso';
import ventaRouter from './ventas';
const router=routerx();

// cuando se haga referencia a la url de abajo, que este controle/gestione las rutas con el archivo categoriasjs
router.use('/categoria',categoriaRouter);
router.use('/articulo',articuloRouter);
router.use('/usuario',usuarioRouter);
router.use('/persona',personaRouter);
router.use('/ingreso',ingresoRouter);
router.use('/venta',ventaRouter);
export default router;





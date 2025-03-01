/* eslint-disable react/prop-types */
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import {  useEffect } from "react";
import { useDataContext } from '../context/dataContext';
import { useAuth } from "../context/authContext";
import Swal from "sweetalert2";

function Cards_productos({ producto, tec }) {
  const { user } = useAuth();
  const idU=user.id;
  const { insertarProductosPorCarrito, obtenerProductosPorCarrito, obtenerPorCarrito, Carrito } = useDataContext();

  useEffect(() => {
    obtenerPorCarrito(idU);
  }, [])
  const idCA = Carrito.id_ca;

  // Función para añadir el producto al carrito
  const anadirAlCarrito = async () => { // Agrega async aquí
    const data ={
      "id_ca":idCA,
      "cantidad":1,
      "id_p":producto.id_p
    }
    await insertarProductosPorCarrito(data); // Agrega await aquí
    await obtenerProductosPorCarrito(idCA);
     // Alerta de éxito
     Swal.fire(
      '¡Añadido!',
      '',
      'success'
    );
  };

  if (!producto) {
    console.error('Cards_productos fue renderizado sin un producto.');
    return null; 
  }if(tec==true){
    return (
      <>
        <div className="max-w-72 rounded overflow-hidden shadow-lg p-1 ">
          <div className="flex items-center justify-center">
            <img className="h-40 object-scale-down" src={producto.imagen_portada || "src/assets/img/productoEjemplo.jpg"} alt={producto.nombre || "Producto"} />
          </div>
          <div className="px-6 py-3">
            <div className="font-bold text-base mb-2">{producto.nombre || "Nombre del producto"}</div>
            <p>Walmart: {producto.precioWalmart}</p>
            <p>Amazon: {producto.precioAmazon}</p>
          </div>
          <div className="px-6 pt-4 pb-2 flex">
            <Link to={`/producto/${producto.id_p}`} key={producto.id_p}>
            <button className="mx-2 border-solid border-2 border-black py-1 px-3 rounded flex items-center">
              <FaEye className="mr-1"/>Detalles
            </button>
            </Link>
            <button onClick={anadirAlCarrito} className="bg-black text-white py-1 px-3 rounded flex items-center">
              <FaShoppingCart className="mr-1"/> Añadir
            </button>
          </div>
        </div>
      </>
    );
  }else if(tec==false){
    return (
      <>
        <div className="max-w-72 rounded overflow-hidden shadow-lg p-1">
          <div className="flex items-center justify-center">
            {/* Modificación aquí: Cambio a object-scale-down para ajuste de imagen */}
            <img className="h-40 object-scale-down" src={producto.imagen_portada || "src/assets/img/productoEjemplo.jpg"} alt={producto.nombre || "Producto"} />
          </div>
          <div className="px-6 py-3">
            <div className="font-bold text-base mb-2">{producto.nombre || "Nombre del producto"}</div>
            <p>Calificacion: {producto.calificacion}</p>
            <p>Marca: {producto.marca}</p>
          </div>
          <div className="px-6 pt-4 pb-2 flex justify-between">
            <Link  to={`/producto/${producto.id_p}`} key={producto.id_p}>
            <button className="border-solid border-2 border-black py-1 px-3 rounded flex items-center">
              <FaEye className="mr-1"/>Detalles
            </button>
            </Link>
            <button onClick={anadirAlCarrito} className="bg-black text-white py-1 px-3 rounded flex items-center">
              <FaShoppingCart className="mr-1"/> Añadir
            </button>
          </div>
        </div>
      </>
    );
  }

  }



export default Cards_productos;

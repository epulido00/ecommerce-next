import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout"

import { useRouter } from 'next/router';

const Precios = ({precio, precio_des}) => {
    if(precio_des != null) {
        return (
            <>
                <span className = "precio-inicial">${precio_des}</span><span className = "precio-descuento">${precio}</span>
            </>
        );
    } else {
        return (
            <>
                <span className = "precio-inicial">${precio}</span>
            </>
        );
    }
}

const Cart = ({cart, eliminar}) => {

    return(
        <>
            <table className = "cart-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((product) => (
                    <tr id = {"p" + product.id_producto}>
                        <td className = "cart-product">
                            <img src = {"/imgs/" + (product.imagen != null ? product.imagen : "default.jpg")}/>
                            <div className = "product-info">
                                <div className = "product-name">
                                    {product.nombre}
                                </div>
                                <div className = "product-desc">
                                    {product.descripcion}
                                </div>
                            </div>
                            <div className = "product-action" onClick = {() => eliminar(product.id_producto)} style = {{cursor: "pointer"}}>
                                <FontAwesomeIcon icon = {faTrash} /> Eliminar
                            </div>
                        </td>
                        <td className = "cart-product-price">
                            <Precios precio = {product.precio} precio_des = {product.precio_descuento}/>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

const Carrito = () => {

    const [cart, setCart] = useState(null);
    //const router = useRouter();

    useEffect(() => {
        if(!cart) {
            setCart(JSON.parse(localStorage.getItem("cart")) || null);
        }
    });

    function eliminarProducto(id) {
        var parent = document.getElementById("p" + id);
        parent.remove();

        cart.forEach((value, index) => {
            if(value.id_producto == id) {
                cart.splice(index, 1);
                if(cart.length == 0) {
                    localStorage.removeItem("cart");
                } else {
                    localStorage.setItem("cart", JSON.stringify(cart));
                }
            }
        });
    }

    return(
        <>
            <PublicLayout>
                {
                    cart ?
                    <Cart cart = {cart} eliminar = {eliminarProducto}/> 
                    :
                    <div>
                        No hay productos aún en el carrito.
                    </div>
                }
            </PublicLayout>
        </>
    );
}

export default Carrito;

import React from "react";
import PublicLayout from '../../components/PublicLayout.js';
import { withRouter } from "next/router";


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

class Producto extends React.Component {
    constructor() {
        super();

        this.state = {
            producto: [],
            user: null
        };
    }

    getProducto() {
        fetch(process.env.API_URL + "tienda/get-producto/" + this.props.router.query.pid, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({producto: data}); 
        });
    }

    componentDidMount() {
        this.getProducto();
        this.setState({user: localStorage.getItem("user") || null});
    }

    componentDidUpdate() {
        if(this.state.producto.length == 0) {
            this.getProducto();
        }
    }

    addToCart(producto) {
        var cart = (localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
        var isInCart = false;

        if(cart.length == 0) {
            cart.push(producto);
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            for(let item of cart) {
                if(item.id_producto == producto.id_producto) {
                    isInCart = true;
                    break;
                }
            }

            if(!isInCart) {
                cart.push(producto);
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        }
    }

    render() {
        return(
            <>
                <PublicLayout>
                    <div className = "producto-box">
                        <div className = "producto-img">
                            <img src = {"/imgs/" + (this.state.producto.imagen != null ? this.state.producto.imagen : "default.jpg")} />
                        </div>
                        <div className = "producto-info">
                            <h1>{this.state.producto.nombre}</h1>
                            <div className = "producto-descripcion">
                                {this.state.producto.descripcion}   
                            </div>
                            <br/>
                            <div className = "producto-precio">
                                <Precios precio = {this.state.producto.precio}  precio_des = {this.state.producto.precio_descuento}/>
                            </div>
                            <br/>
                            {this.state.user ? 
                            <div className = "btn-add" onClick = {() => this.addToCart(this.state.producto)}>
                                Agregar al carrito
                            </div>
                            :
                            <span>Debes estar logueado para agregar al carrito</span>
                            }
                        </div>
                    </div>
                </PublicLayout> 
            </>
        );
    }
}

export default withRouter(Producto);
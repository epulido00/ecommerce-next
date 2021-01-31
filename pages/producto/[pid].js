
import React from "react";
import PublicLayout from '../../components/PublicLayout.js';
import { withRouter } from "next/router";
import PublicComponent from "../../components/PublicComponent.js";


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

const RenderProduct = ({producto}) => {

    return(
        <>
            <div className = "producto-box">
                <div className = "producto-img">
                    <img src = {"/imgs/" + (producto.imagen != null ? producto.imagen : "default.jpg")} />
                </div>
                <div className = "producto-info">
                    <h1>{producto.nombre}</h1>
                    <div className = "producto-descripcion">
                        {producto.descripcion}   
                    </div>
                    <br/>
                    <div className = "producto-precio">
                        <Precios precio = {producto.precio}  precio_des = {producto.precio_descuento}/>
                    </div>
                    <br/>
                    <div className = "btn-add">
                        Agregar al carrito
                    </div>
                </div>
            </div>
        </>
    );
}

class Producto extends PublicComponent {
    constructor(props) {
        super();

        console.log(this.state.carrito);

        this.state = {
            producto: []
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
    }

    componentDidUpdate() {
        this.getProducto();
    }

    render() {
        return(
            <>
                <PublicLayout>
                    <RenderProduct router = {this.props.router} producto = {this.state.producto}/>
                </PublicLayout> 
            </>
        );
    }
}

export default withRouter(Producto);
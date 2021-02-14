import React from 'react';
import PublicLayout from '../components/PublicLayout.js';
import Link from 'next/link';


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

const Destacados = ({props, add}) => {

    return(
        <>
            <div className = "destacados-list">
                {props.map((item) => 
                    
                        <div className = "destacado-box">
                            <Link href = {process.env.BASE_URL + "producto/" + item.id_producto}>
                            <a>
                            <div className = "imagen">
                                <img src = {"/imgs/" + (item.imagen != null ? item.imagen : "default.jpg")} />
                            </div>
                            <div className = "destacados-data">
                                <div className = "nombre">
                                    {item.nombre}
                                </div><br/>
                                <div className = "precio-box">
                                    <Precios precio = {item.precio}  precio_des = {item.precio_descuento}/>
                                </div>
                            </div>
                            </a>
                            </Link>
                            <div style = {{width: "auto", float: "right", color: "#FFF",margin: "10px", cursor: "pointer", backgroundColor: "red", padding: "10px 15px", borderRadius: "8px"}} onClick = {() => add(item)}>
                                Agregar
                            </div>
                        </div>
                        
                )}
            </div>
        </>
    );
}

class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            destacados: []
        }
        
    }

    getDestacados() {
        fetch(process.env.API_URL + "tienda/get-destacados", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(response => response.json())
        .then((data) => this.setState({destacados: data}));
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

    componentDidMount() {
        this.getDestacados();
    }

    render() {
        return(
            <>
                <PublicLayout>
                    <h1>Destacados</h1>
                    <Destacados props = {this.state.destacados} add = {this.addToCart}/>
                </PublicLayout>
            </>
        );
    }
}

export default Home;
import React from 'react';
import PublicLayout from '../components/PublicLayout.js';
import Link from 'next/link';
import PublicComponent from '../components/PublicComponent.js';


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

const Destacados = ({props}) => {

    return(
        <>
            <div className = "destacados-list">
                {props.map((item) => 
                    
                    <Link href = {process.env.BASE_URL + "producto/" + item.id_producto}>
                        <a>
                        <div className = "destacado-box">
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
                        </div>
                        </a>
                    </Link>
                )}
            </div>
        </>
    );
}

class Home extends PublicComponent {

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

    componentDidMount() {
        this.getDestacados();
    }

    render() {
        return(
            <>
                <PublicLayout>
                    <h1>Destacados</h1>
                    <Destacados props = {this.state.destacados}/>
                </PublicLayout>
            </>
        );
    }
}

export default Home;
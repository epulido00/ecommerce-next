import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';

const InNotLog = () => {
    return(
        <>
            <div className = "header-user">
                <div className = "user-content">
                    <ul>
                        <a href = {process.env.BASE_URL + "ingresar"}><li>Ingresar / Registrarse</li></a>
                    </ul>
                </div>
            </div>
        </>
    );
}

const InLog = ({user, logOut}) => {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

    useEffect(() => {
        console.log("Hola");
    }, [localStorage.getItem("cart")]);

    return(
        <>
            <div className = "header-user">
                <div className = "user-content">
                    <ul>
                        <a><li>{user.nombre + " " + user.apellido}</li></a>
                        <li onClick = {logOut}>Salir</li>
                    </ul>
                    <a href = "/carrito">
                    <div id = "carrito" className = "carrito">
                        <div className = "badge">{cart ? cart.length : 0}</div>
                        <FontAwesomeIcon icon={faShoppingCart} className = "icon"/>
                    </div>
                    </a>
                </div>
            </div>
        </>
    );
}

const Header = () => {

    const [user, setUser] = useState(null);
    
    const router = useRouter();

    function logOut() {
        fetch(process.env.API_URL + "login/logout", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(response => response.json())
        .then(() => {
            localStorage.removeItem("user");
            router.push("/ingresar");
        });
    }

    useEffect(() => {
        if(!user) {
            setUser(JSON.parse(localStorage.getItem("user")) || null);
        }
    });

    return(
        <header className = "header">
            {!user ? <InNotLog /> : <InLog user = {user} logOut = {logOut}/> }
            <div className = "header-content">
                <div className = "logo">
                    <a href = {process.env.BASE_URL}><h1>Tienda con Next y Laravel</h1></a>
                </div>
                <div className = "">
                    Buscador
                </div>
            </div>
            <div className = "navbar">
                <div className = "navbar-content">
                    <ul>
                        <a href = {process.env.BASE_URL}><li>Inicio</li></a>
                        <a><li>Categorías</li></a>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
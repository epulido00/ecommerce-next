import {useEffect, useState} from 'react';

const InNotLog = () => {
    return(
        <>
            <div className = "header-user">
                <div className = "user-content">
                    <ul>
                        <a href = {process.env.BASE_URL + "ingresar"}><li>Ingresar</li></a>
                        <li>Registrarse</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

const InLog = ({user}) => {
    return(
        <>
            <div className = "header-user">
                <div className = "user-content">
                    <ul>
                        <a><li>{user.nombre + " " + user.apellido}</li></a>
                        <li onClick = {logOut}>Salir</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

const logOut = () => {
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
    });
}

const Header = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        if(!user) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    });

    return(
        <header className = "header">
            {!user ? <InNotLog /> : <InLog user = {user}/> }
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
                        <li>Inicio</li>
                        <li>Categorías</li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;


const Header = () => {
    return(
        <header className = "header">
            <div className = "header-user">
                <div className = "user-content">
                    <ul>
                        <a href = {process.env.BASE_URL + "ingresar"}><li>Ingresar</li></a>
                        <li>Registrarse</li>
                    </ul>
                </div>
            </div>
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
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PublicLayout from '../components/PublicLayout.js';

const Ingresar = () => {

    const [usuario, setUsuario] = useState({email: null, password: null});
    const [registerData, setRegisterData] = useState({nombre: null, apellido: null, email: null, password: null});
    const router = useRouter();

    function changeLoginValues(event, register = false) {
        let target = event.target;
        let name = target.name;
        let val = target.value;
        
        if(!register){
            setUsuario({
                ...usuario,
                [name]: val
            });
        } else {
            setRegisterData({
                ...registerData,
                [name]: val
            });
        }
    }

    function login(event) {
        if(usuario.email != null && usuario.password != null) {
            fetch(process.env.API_URL + "login/ingresar", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(usuario)
            })
            .then(response => response.json())
            .then((data) => {
                if(data.error) {
                    console.log(data.error);
                } else {
                    localStorage.setItem("user", JSON.stringify(data));
                    router.push("/");
                }
            });
        } else {
            alert("Por favor llene todos los campos");
        }
    
        event.preventDefault();
    }

    function signup(event) {
        if(registerData.nombre != null && registerData.apellido != null && registerData.email != null && registerData.password != null) {
            fetch(process.env.API_URL + "login/registrarse", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(registerData)
            })
            .then(response => response.json())
            .then((data) => {
                if(data.error) {
                    console.log(data.error);
                } else {
                    localStorage.setItem("user", JSON.stringify(data));
                    router.push("/");
                }
            });
        } else {
            alert("Por favor llene todos los campos");
        }
    
        event.preventDefault();
    }

    useEffect(() => {
        if(localStorage.getItem("user")) {
            router.push("/");
        }
    });

    return(
        <>
            <PublicLayout>
                <div className = "login-box-master">
                    <div className = "login-box">
                        <h1>Ingresa</h1><br/>
                        <form onSubmit = {(e) => login(e)}>
                            <label for = "email">Correo electrónico</label>
                            <input className = "form-input" type = "email" name = "email" onChange = {(e) => changeLoginValues(e)} /><br/>
                            <label for = "password">Contraseña</label>
                            <input className = "form-input" type = "password" name = "password" onChange = {(e) => changeLoginValues(e)} /><br/>
                            <input className = "btn" type = "submit" value = "Ingresar" />
                        </form>
                    </div>
                    <div className = "login-box">
                        <h1>Registrate</h1><br/>
                        <form onSubmit = {(e) => signup(e, true)}>
                            <label for = "email">Nombre</label>
                            <input className = "form-input" type = "text" name = "nombre" onChange = {(e) => changeLoginValues(e, true)} /><br/>
                            <label for = "email">Apellido</label>
                            <input className = "form-input" type = "text" name = "apellido" onChange = {(e) => changeLoginValues(e, true)} /><br/>
                            <label for = "email">Correo electrónico</label>
                            <input className = "form-input" type = "email" name = "email" onChange = {(e) => changeLoginValues(e, true)} /><br/>
                            <label for = "password">Contraseña</label>
                            <input className = "form-input" type = "password" name = "password" onChange = {(e) => changeLoginValues(e, true)} /><br/>
                            <input className = "btn" type = "submit" value = "Registrarse" />
                        </form>
                    </div>
                </div>
            </PublicLayout>
        </>
    );
}

export default Ingresar;
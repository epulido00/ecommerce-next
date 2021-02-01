import React from 'react';
import PublicLayout from '../components/PublicLayout.js';

class Ingresar extends React.Component {

    constructor() {
        super();

        this.state = {
            usuarioLogin: {
                email: null,
                password: null
            }
        };
    }

    changeLoginValues(event) {
        let target = event.target;
        let name = target.name;
        let val = target.value;
        
        this.setState({
            usuarioLogin: {
                ...this.state.usuarioLogin,
                [name]: val
            },
            errorLogin: null
        });
    }

    checkValues(event) {
        fetch(process.env.API_URL + "login/ingresar", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state.usuarioLogin)
        })
        .then(response => response.json())
        .then((data) => {
            if(data.error) {
                console.log(data.error);
            } else {
                localStorage.setItem("user", JSON.stringify(data));
            }
        });

        event.preventDefault();
    }


    render() {
        return(
            <>
                <PublicLayout>
                    <form onSubmit = {(e) => this.checkValues(e)}>
                        <input type = "email" name = "email" onChange = {(e) => this.changeLoginValues(e)} /><br/>
                        <input type = "password" name = "password" onChange = {(e) => this.changeLoginValues(e)} /><br/>
                        <input type = "submit" value = "Revisar" />
                    </form>
                </PublicLayout>
            </>
        );
    }
}

export default Ingresar;
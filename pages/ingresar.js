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

    changeInput(event) {
        let target = event.target;
        let name = target.name;
        let val = target.value;
        
        this.setState({
            persona: {
                ...this.state.persona,
                [name]: val
            }
        });
    }

    checkValues(event) {
        console.log(this.state.persona);

        event.preventDefault();
    }


    render() {
        return(
            <>
                <PublicLayout>
                    <form onSubmit = {(e) => this.checkValues(e)}>
                        <input type = "email" name = "email" onChange = {(e) => this.changeInput(e)} /><br/>
                        <input type = "password" name = "password" onChange = {(e) => this.changeInput(e)} /><br/>
                        <input type = "submit" value = "Revisar" />
                    </form>
                </PublicLayout>
            </>
        );
    }
}

export default Ingresar;
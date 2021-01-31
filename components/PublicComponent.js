import React, { useEffect } from 'react';


class PublicComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            persona: null
        };

    }

    componentDidMount() {
        this.setState({persona: "Edwin"});
        alert("Hola");
    }

}

export default PublicComponent;
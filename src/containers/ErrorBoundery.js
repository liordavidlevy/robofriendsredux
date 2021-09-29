import { Component } from 'react';


export class ErrorBoundery extends Component {

    constructor(props) {
        super(props);

        this.state = { hasError: false }
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <h1>שגיאה</h1>
        }

        return this.props.children;
    }
}

import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Header from './Header';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleAuthorize({password: this.state.password, email: this.state.email})
        this.setState({
            email: '',
            password: ''
        });
    }

    render() {
        return (
            <div className="login">
                <Header>
                    <Link to="/sign-up" className="sign__link">Регистрация</Link>
                </Header>
                <p className="login__welcome">Вход</p>
                <form onSubmit={this.handleSubmit} className="login__form">
                    <input type="email" placeholder="Email" name="email" id="email" className="login__input" required
                           pattern="^[^\s]+(\s.*)?$" value={this.state.email  || ''} onChange={this.handleChange}/>
                    <input type="password" placeholder="Пароль" name="password" className="login__input" id="password" required
                           pattern="^[^\s]+(\s.*)?$" value={this.state.password  || ''}
                           onChange={this.handleChange}/>
                    <button type="submit" className="login__link">Войти</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Login);
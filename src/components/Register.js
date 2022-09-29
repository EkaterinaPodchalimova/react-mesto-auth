import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Header from "./Header";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleApiRegister({password: this.state.password, email: this.state.email});
        this.setState({
            email: '',
            password: ''
        })
    }

    render() {
        return (
                <div className="register">
                    <Header>
                        <Link to="/sign-in" className="sign__link">Войти</Link>
                    </Header>
                    <p className="register__welcome">Регистрация</p>
                    <form onSubmit={this.handleSubmit} className="register__form">
                        <input type="email" placeholder="Email" name="email" id="email" className="register__input"
                               required
                               pattern="^[^\s]+(\s.*)?$" value={this.state.email} onChange={this.handleChange}/>
                        <input type="password" placeholder="Пароль" name="password" className="register__input"
                               id="password" required
                               pattern="^[^\s]+(\s.*)?$" value={this.state.password}
                               onChange={this.handleChange}/>
                        <button type="submit" onSubmit={this.handleSubmit} className="register__link">Зарегистрироваться
                        </button>
                    </form>
                    <div className="register__signin">
                        <p className="register__signin-title">Уже зарегистрированы?</p>
                        <Link to="/sign-in" className="register__login-link">&nbsp;Войти</Link>
                    </div>
                </div>
        );
    }
}

export default withRouter(Register);
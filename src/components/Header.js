import headerLogo from '../images/logo_white.svg';

function  Header({button,children}) {
    return(
        <header className="header">
            <img className="logo" src={headerLogo} alt="логотип Место" />
            <div className="header__register">
                {children}
            </div>
        </header>
    )
}

export default Header;
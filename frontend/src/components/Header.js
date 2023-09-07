import { Link, useLocation } from 'react-router-dom';

import logoHeader from '../image/logo.svg';

const Header = props => {
  const location = useLocation();
  return (
    <>
      <header className="header section">
        <img className="header__logo" src={logoHeader} alt="Логотип Место" />
        {location.pathname === '/sign-up' && (
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        )}
        {location.pathname === '/sign-in' && (
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        )}

        {location.pathname === '/' && (
          <nav className="header__navigate">
            <p className="header__email">{props.email}</p>
            <Link to="/sign-in" className="header__link" onClick={props.onSignOut}>
              Выйти
            </Link>
          </nav>
        )}
      </header>
    </>
  );
};
export default Header;

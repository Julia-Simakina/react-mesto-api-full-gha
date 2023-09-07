import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputEmail = e => {
    setEmail(e.target.value);
  };
  const handleInputPassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmitRegister = e => {
    e.preventDefault();
    onRegister(email, password);
  };

  return (
    <>
      <section className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form action="#" className="auth__form" onSubmit={handleSubmitRegister}>
          <input
            type="email"
            placeholder="Email"
            className="auth__form-input"
            value={email}
            onChange={handleInputEmail}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            className="auth__form-input"
            value={password}
            onChange={handleInputPassword}
            required
          />
          <button type="submit" className="auth__form-submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="auth__container">
          <p className="auth__question">Уже зарегистрированы? </p>
          <Link to="/sign-in" className="auth__link">
            Войти
          </Link>
        </div>
      </section>
    </>
  );
};

export default Register;

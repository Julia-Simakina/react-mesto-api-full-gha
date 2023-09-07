import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputEmail = e => {
    setEmail(e.target.value);
  };
  const handleInputPassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmitLogin = e => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <>
      <section className="auth">
        <h2 className="auth__title">Вход</h2>
        <form action="#" className="auth__form" onSubmit={handleSubmitLogin}>
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
            Войти
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;

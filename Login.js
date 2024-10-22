import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginText, setLoginText] = useState('Вход в систему (Библиотекарь)');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
      alert('Успешный вход в систему');
      setUsername(''); 
      setPassword('');
      setIsAuthenticated(true);
      setLoginText(username);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert('Вы вышли из системы');
    setIsAuthenticated(false);
    setLoginText('Вход в систему (Библиотекарь)');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, username, password);
      alert('Успешная регистрация');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="login">
      <h2>{loginText}</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Логин:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label htmlFor="password">Пароль:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Войти</button>
        <button type="button" onClick={handleLogout}>Выйти</button>
        <button onClick={handleRegister}>Зарегистрироваться</button>
      </form>
    </section>
  );
};

export default Login;

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
      alert('Успешный вход в систему'); // Алерт при успешном входе
      setUsername(''); // Очищаем поля после входа
      setPassword('');
      setIsAuthenticated(true); // Устанавливаем авторизацию в true
      setLoginText(username); // Изменяем текст на почту библиотекаря
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert('Вы вышли из системы'); // Простое уведомление при выходе
    setIsAuthenticated(false); // Сбрасываем авторизацию
    setLoginText('Вход в систему (Библиотекарь)'); // Возвращаем текст кнопки
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, username, password);
      alert('Успешная регистрация'); // Алерт при успешной регистрации
      setUsername(''); // Очищаем поля после регистрации
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="login">
      <h2>{loginText}</h2> {/* Изменяем отображение логина */}
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Логин:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label htmlFor="password">Пароль:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Войти</button>
        <button type="button" onClick={handleLogout}>Выйти</button>
        <button onClick={handleRegister}>Зарегистрироваться</button> {/* Кнопка регистрации */}
      </form>
    </section>
  );
};

export default Login;

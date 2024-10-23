import React, { useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';

const ReaderLogin = ({ handleLogin, setReaderName }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loginText, setLoginText] = useState('Вход в систему (Читатель)');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      let readerFound = false;

      querySnapshot.forEach((doc) => {
        const readerData = doc.data();
        if (readerData.firstName === firstName && readerData.lastName === lastName) {
          readerFound = true;
          setReaderName(`${readerData.firstName} ${readerData.lastName}`);
          setLoginText(`${readerData.firstName} ${readerData.lastName}`);
          // Здесь вызываем handleLogin с успешным результатом
          handleLogin(true); // Передаем true в handleLogin
        }
      });

      if (!readerFound) {
        alert('Читатель не найден. Проверьте имя и фамилию.');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  };

  return (
    <div>
      <h2>{loginText}</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="firstName">Имя:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label htmlFor="lastName">Фамилия:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default ReaderLogin;

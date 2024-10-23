import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Библиотечная Система</h1>
        <nav>
          <ul>
            <li><a href="#login">Вход</a></li>
            <li><a href="#books">Книги</a></li>
            <li><a href="#readers">Читатели</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="login">
          <h2>Вход в систему</h2>
          <form>
            <label htmlFor="username">Логин:</label>
            <input type="text" id="username" required />
            <label htmlFor="password">Пароль:</label>
            <input type="password" id="password" required />
            <button type="submit">Войти</button>
          </form>
        </section>

        <section id="books">
          <h2>Книги в библиотеке</h2>
          <button>Добавить книгу</button>
          <button>Редактировать книгу</button>
          <button>Удалить книгу</button>
          <ul className="book-list">
            <li>Автор: Рябова Виктория, Название: Лучшие годы, Год издания: 2022, Статус: Свободна</li>
          </ul>
        </section>

        <section id="readers">
          <h2>Читатели библиотеки</h2>
          <button>Добавить читателя</button>
          <button>Редактировать читателя</button>
          <button>Удалить читателя</button>
          <ul className="reader-list">
            <li>Фамилия: Рябова, Имя: Виктория, Дата рождения: 08.07.2004</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Библиотечная Система от лучшей команды 3013</p>
      </footer>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Импортируем Firestore
import ReaderLogin from './ReaderLogin';
import TakenBooksList from './TakenBooksList';
import AvailableBooksList from './AvailableBooksList';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import '../App.css'; // Подключаем стили

const ReaderPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [readerName, setReaderName] = useState('');
  const [availableBooks, setAvailableBooks] = useState([]);
  const [takenBooks, setTakenBooks] = useState([]); // Добавляем состояние для взятых книг

  const handleLogin = (isValid) => {
    if (isValid) {
      setIsAuthenticated(true);
      fetchBooks(); // Получаем книги при входе
    }
  };

  const fetchBooks = async () => {
    const booksCollection = collection(db, 'books');
    const bookSnapshot = await getDocs(booksCollection);
    const booksData = bookSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    // Фильтруем книги по статусу
    setAvailableBooks(booksData.filter(book => book.isFree));
    setTakenBooks(booksData.filter(book => !book.isFree && book.readerName === readerName)); // Обновляем взятые книги
  };

  const handleBookReturned = (book) => {
    // Обновляем список книг
    fetchBooks();
  };

  const handleBookReservation = async (book) => {
    const bookDoc = doc(db, 'books', book.id);
    await updateDoc(bookDoc, { isFree: false, readerName }); // Обновляем статус книги в Firestore

    // Обновляем состояние доступных и взятых книг
    setAvailableBooks(prevBooks => prevBooks.filter(b => b.id !== book.id)); // Удаляем книгу из доступных
    setTakenBooks(prevBooks => [...prevBooks, { ...book, isFree: false, readerName }]); // Добавляем книгу в взятые

    // Если нужно, можно вызвать fetchBooks() для обновления всех книг из базы
    // fetchBooks();
  };

  return (
    <section id="reader-page">
      {isAuthenticated ? (
        <>
          <h2>Добро пожаловать, {readerName}!</h2>
          <TakenBooksList readerName={readerName} takenBooks={takenBooks} onBookReturned={handleBookReturned} />
          <AvailableBooksList availableBooks={availableBooks} onBookReservation={handleBookReservation} />
        </>
      ) : (
        <ReaderLogin handleLogin={handleLogin} setReaderName={setReaderName} />
      )}
    </section>
  );
};

export default ReaderPage;

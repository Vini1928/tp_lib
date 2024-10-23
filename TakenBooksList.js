import React from 'react';
import { collection, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

const TakenBooksList = ({ readerName, takenBooks, onBookReturned }) => {
  const handleReturnBook = async (book) => {
    const bookDoc = doc(db, 'books', book.id);
    await updateDoc(bookDoc, { isFree: true, readerName: null }); // Возвращаем книгу

    // Удаляем книгу из списка взятых
    if (onBookReturned) {
      onBookReturned(book);
    }
  };

  return (
    <div className="books-list">
      <h3>Список взятых книг</h3>
      <ul>
        {takenBooks.map(book => (
          <li key={book.id}>
            {book.lastName} {book.firstName} - Автор: {book.author}, Название: {book.title}, Дата издания: {book.publicationDate}
            <button onClick={() => handleReturnBook(book)}>Вернуть</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TakenBooksList;

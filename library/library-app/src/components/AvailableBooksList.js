import React from 'react';

const AvailableBooksList = ({ availableBooks, onBookReservation }) => {
  const handleBookReservation = (book) => {
    // Вызываем обратный вызов для бронирования книги
    if (onBookReservation) {
      onBookReservation(book);
    }
  };

  return (
    <div className="books-list">
      <h3>Список доступных книг</h3>
      <ul>
        {availableBooks.map(book => (
          <li key={book.id}>
            Автор: {book.author}, Название: {book.title}, Дата издания: {book.publicationDate}
            <button onClick={() => handleBookReservation(book)}>Забронировать</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableBooksList;

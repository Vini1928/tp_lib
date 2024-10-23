import React from 'react';

const EditBook = ({ newBook, setNewBook, handleUpdateBook, editBookId, closeModal, isAuthenticated }) => {
  const handleSubmit = async () => {
    if (!isAuthenticated) {
      alert("Пожалуйста, авторизуйтесь для редактирования книги.");
      return;
    }
    await handleUpdateBook(editBookId, newBook); // Предполагается, что это возвращает промис
    closeModal(); // Закрыть модальное окно после успешного обновления
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Редактировать книгу</h3>
        <label htmlFor="author">Автор:</label>
        <input
          type="text"
          id="author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
        />
        
        <label htmlFor="title">Название:</label>
        <input
          type="text"
          id="title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
        />
        
        <label htmlFor="publicationDate">Дата издания:</label>
        <input
          type="date"
          id="publicationDate"
          value={newBook.publicationDate}
          onChange={(e) => setNewBook({ ...newBook, publicationDate: e.target.value })}
          required
        />
        
        <button onClick={handleSubmit}>Сохранить изменения</button>
        <button onClick={closeModal}>Закрыть</button>
      </div>
    </div>
  );
};

export default EditBook;

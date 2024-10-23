import React from 'react';

const AddBook = ({ newBook, setNewBook, handleAddBook, isModalOpen, closeModal, isAuthenticated }) => {
  const handleSubmit = () => {
    if (!isAuthenticated) {
      alert("Пожалуйста, авторизуйтесь для добавления книги.");
      return;
    }
    handleAddBook();
  };

  return (
    isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <h3>Добавить книгу</h3>
          <label htmlFor="author">Автор:</label>
          <input type="text" id="author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} required />
          
          <label htmlFor="title">Название:</label>
          <input type="text" id="title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} required />
          
          <label htmlFor="publicationDate">Дата издания:</label>
          <input type="date" id="publicationDate" value={newBook.publicationDate} onChange={(e) => setNewBook({ ...newBook, publicationDate: e.target.value })} required />
          
          <button onClick={handleSubmit}>Добавить книгу</button>
          <button onClick={closeModal}>Закрыть</button>
        </div>
      </div>
    )
  );
};

export default AddBook;

import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from './components/firebase'; 
import Login from './components/Login'; 
import AddReader from './components/AddReader';
import EditReader from './components/EditReader'; 
import AddBook from './components/AddBook'; 
import EditBook from './components/EditBook'; 
import Library from './components/Library';
import ReaderPage from './components/ReaderPage';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]); 
  const [newReader, setNewReader] = useState({ lastName: '', firstName: '', birthdate: '' });
  const [newBook, setNewBook] = useState({ author: '', title: '', publicationDate: '', isFree: true });
  const [isReaderModalOpen, setIsReaderModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false); 
  const [editReaderId, setEditReaderId] = useState(null);
  const [editBookId, setEditBookId] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLibrarianPage, setIsLibrarianPage] = useState(true);

  const usersCollectionRef = collection(db, 'users');
  const booksCollectionRef = collection(db, 'books'); 

  const fetchUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const fetchBooks = async () => {
    const data = await getDocs(booksCollectionRef);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });

    fetchUsers();
    fetchBooks(); 
    return () => unsubscribe();
  }, []);

  const handleAddUser = async () => {
    await addDoc(usersCollectionRef, newReader);
    fetchUsers();
    setNewReader({ lastName: '', firstName: '', birthdate: '' });
    setIsReaderModalOpen(false);
  };

  const handleUpdateUser = async (id, updatedUser) => {
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, updatedUser);
    fetchUsers();
    setEditReaderId(null);
    setIsReaderModalOpen(false);
  };

  const handleDeleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
    fetchUsers();
  };

  const handleAddBook = async () => {
    await addDoc(booksCollectionRef, newBook);
    fetchBooks();
    setNewBook({ author: '', title: '', publicationDate: '', isFree: true });
    setIsBookModalOpen(false);
  };

  const handleUpdateBook = async (id, updatedBook) => {
    const bookDoc = doc(db, 'books', id);
    await updateDoc(bookDoc, updatedBook);
    fetchBooks();
    setEditBookId(null);
    setIsBookModalOpen(false);
  };

  const handleDeleteBook = async (id) => {
    if (!isAuthenticated) {
      alert("Пожалуйста, авторизуйтесь для удаления книги.");
      return; // Прерываем выполнение функции
    }

    const bookDoc = doc(db, 'books', id);
    await deleteDoc(bookDoc);
    fetchBooks();
  };

  const handleOpenAddBookModal = () => {
    if (!isAuthenticated) {
      alert("Пожалуйста, авторизуйтесь для добавления книги.");
    } else {
      setIsBookModalOpen(true);
    }
  };

  const handleOpenEditBookModal = (book) => {
    if (!isAuthenticated) {
      alert("Пожалуйста, авторизуйтесь для редактирования книги.");
    } else {
      setEditBookId(book.id);
      setNewBook(book);
      setIsBookModalOpen(true);
    }
  };

  const openReaderModal = () => {
    setIsReaderModalOpen(true);
  };

  const closeReaderModal = () => {
    setIsReaderModalOpen(false);
    setEditReaderId(null);
  };

  const closeBookModal = () => {
    setIsBookModalOpen(false);
    setEditBookId(null);
  };

  return (
    <div className="App">
      <header>
        <h1>Библиотечная Система</h1>
        <div>
          <button onClick={() => setIsLibrarianPage(true)}>Библиотекарь</button>
          <button onClick={() => setIsLibrarianPage(false)}>Читатель</button>
        </div>
      </header>

      <main>
        {isLibrarianPage ? (
          <>
            <Login setIsAuthenticated={setIsAuthenticated} />
            <Library 
              users={users} 
              openModal={openReaderModal} 
              handleDeleteUser={handleDeleteUser} 
              setNewReader={setNewReader} 
              setEditReaderId={setEditReaderId} 
              isAuthenticated={isAuthenticated} 
            />
          </>
        ) : (
          <ReaderPage setIsAuthenticated={setIsAuthenticated} />
        )}
        
        {isLibrarianPage && (
          <section id="books">
            <h2>Список книг</h2>
            <button onClick={handleOpenAddBookModal}>Добавить книгу</button>
            <ul className="book-list">
              {books.map(book => (
                <li key={book.id}>
                  Автор: {book.author}, Название: {book.title}, Дата издания: {book.publicationDate}, Статус: {book.isFree ? 'Свободна' : 'Занята'}
                  <button onClick={() => handleOpenEditBookModal(book)}>Редактировать</button>
                  <button onClick={() => handleDeleteBook(book.id)}>Удалить</button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer>
        <p>&copy; 2024 Библиотечная Система от лучшей команды 3013</p>
      </footer>

      <AddReader 
        newReader={newReader} 
        setNewReader={setNewReader} 
        handleAddUser={handleAddUser} 
        isModalOpen={isReaderModalOpen} 
        closeModal={closeReaderModal} 
      />
      
      {editReaderId && (
        <EditReader 
          newReader={newReader} 
          setNewReader={setNewReader} 
          handleUpdateUser={handleUpdateUser} 
          editReaderId={editReaderId} 
          closeModal={closeReaderModal} 
        />
      )}
      
      {isLibrarianPage && (
        <AddBook 
          newBook={newBook} 
          setNewBook={setNewBook} 
          handleAddBook={handleAddBook} 
          isModalOpen={isBookModalOpen} 
          closeModal={closeBookModal} 
          isAuthenticated={isAuthenticated} 
        />
      )}
      
      {editBookId && isLibrarianPage && (
        <EditBook 
          newBook={newBook} 
          setNewBook={setNewBook} 
          handleUpdateBook={handleUpdateBook} 
          editBookId={editBookId} 
          closeModal={closeBookModal} 
          isAuthenticated={isAuthenticated} 
        />
      )}
    </div>
  );
}

export default App;

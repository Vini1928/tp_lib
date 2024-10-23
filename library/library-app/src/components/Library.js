import React from 'react';

const Library = ({ users, openModal, handleDeleteUser, setNewReader, setEditReaderId, isAuthenticated }) => {
  const handleAddClick = () => {
    if (!isAuthenticated) {
      alert('Пожалуйста, авторизуйтесь для добавления читателя.');
      return;
    }
    openModal();
  };

  const handleEditClick = (user) => {
    if (!isAuthenticated) {
      alert('Пожалуйста, авторизуйтесь для редактирования читателя.');
      return;
    }
    setEditReaderId(user.id);
    setNewReader(user);
    openModal();
  };

  const handleDeleteClick = (userId) => {
    if (!isAuthenticated) {
      alert('Пожалуйста, авторизуйтесь для удаления читателя.');
      return;
    }
    handleDeleteUser(userId);
  };

  return (
    <section id="readers">
      <h2>Читатели библиотеки</h2>
      <button onClick={handleAddClick}>Добавить читателя</button>
      <ul className="reader-list">
        {users.map(user => (
          <li key={user.id}>
            Фамилия: {user.lastName}, Имя: {user.firstName}, Дата рождения: {user.birthdate}
            <button onClick={() => handleEditClick(user)}>Редактировать</button>
            <button onClick={() => handleDeleteClick(user.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Library;

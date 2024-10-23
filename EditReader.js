import React from 'react';

const EditReader = ({ newReader, setNewReader, handleUpdateUser, editReaderId, closeModal }) => {
  const handleSubmit = () => {
    handleUpdateUser(editReaderId, newReader); // Обновить данные читателя
    closeModal(); // Закрыть модальное окно
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Редактировать читателя</h3>
        <label htmlFor="lastName">Фамилия:</label>
        <input
          type="text"
          id="lastName"
          value={newReader.lastName}
          onChange={(e) => setNewReader({ ...newReader, lastName: e.target.value })}
          required
        />
        
        <label htmlFor="firstName">Имя:</label>
        <input
          type="text"
          id="firstName"
          value={newReader.firstName}
          onChange={(e) => setNewReader({ ...newReader, firstName: e.target.value })}
          required
        />
        
        <label htmlFor="birthdate">Дата рождения:</label>
        <input
          type="date"
          id="birthdate"
          value={newReader.birthdate}
          onChange={(e) => setNewReader({ ...newReader, birthdate: e.target.value })}
          required
        />
        
        <button onClick={handleSubmit}>Сохранить изменения</button>
        <button onClick={closeModal}>Закрыть</button>
      </div>
    </div>
  );
};

export default EditReader;

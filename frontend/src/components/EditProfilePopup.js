import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Cохранить"
    >
      <input
        className="form__input form__input_type_name"
        name="user-name"
        type="text"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        id="username"
        value={name}
        required
        onChange={handleChangeName}
      />
      <span className="popup__input-error popup__input-error_type_user-name"></span>
      <input
        className="form__input form__input_type_job"
        type="text"
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        name="user-about"
        id="job"
        value={description}
        required
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error popup__input-error_type_user-about"></span>
    </PopupWithForm>
  );
};
export default EditProfilePopup;

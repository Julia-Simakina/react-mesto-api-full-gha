import React from 'react';
import PopupWithForm from './PopupWithForm.js';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avaRef = React.useRef();

  React.useEffect(() => {
    avaRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avaRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на картинку"
        className="form__input"
        ref={avaRef}
        required
      />
      <span id="avatar-error" className="popup__input-error popup__input-error_type_avatar"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;

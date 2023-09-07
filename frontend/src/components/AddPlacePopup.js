import React from 'react';
import PopupWithForm from './PopupWithForm.js';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardName,
      link: cardLink
    });
  }

  function handleNameChange(event) {
    setCardName(event.target.value);
  }

  function handleLinkChange(event) {
    setCardLink(event.target.value);
  }

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_type_place-name"
        name="place-name"
        value={cardName}
        onChange={handleNameChange}
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        id="name"
        required
      />
      <span className="popup__input-error popup__input-error_type_place-name"></span>
      <input
        className="form__input form__input_type_place-url"
        type="url"
        placeholder="Ссылка на картинку"
        name="image-link"
        value={cardLink}
        onChange={handleLinkChange}
        id="link"
        required
      />
      <span className="popup__input-error popup__input-error_type_image-link"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;

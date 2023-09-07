import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `elements__description-like ${
    isLiked && 'elements__description-like_active'
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  const handleClick = () => {
    onCardClick({ link: card.link, name: card.name });
  };

  return (
    <li className="elements__item">
      {isOwn && <button type="button" className="elements__delete" onClick={handleDeleteClick} />}
      <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="elements__description">
        <h2 className="elements__description-name">{card.name}</h2>
        <div className="elements__like">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <span className="elements__description-like-number">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;

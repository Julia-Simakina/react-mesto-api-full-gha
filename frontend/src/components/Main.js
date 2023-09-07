import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardLike,
  onCardClick,
  onCardDelete,
  cards
}) => {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <>
      <main className="main">
        <section className="profile section">
          <div className="profile__container">
            <img
              className="profile__avatar"
              src={avatar}
              alt="Аватар пользователя"
              style={{ backgroundImage: `url(${avatar})` }}
            />
            <button className="profile__avatar-button" onClick={onEditAvatar}></button>
            <div className="profile__info">
              <h1 className="profile__title">{name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
              <p className="profile__subtitle">{about}</p>
            </div>
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>
        <section className="elements section">
          <ul className="elements__list"></ul>
        </section>
        <section className="elements section">
          <ul className="elements__list">
            {cards.map(card => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Main;

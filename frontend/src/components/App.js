import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import { register, login, checkToken } from '../utils/apiAuth.js';
import ProtectedRoute from './ProtectedRoute.js';

import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import PopupWithConfirm from './PopupWithConfirm';
import Footer from './Footer.js';
import { api } from '../utils/api.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistrationValid, setIsRegistrationValid] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState({})

  React.useEffect(() => {
    if(isLoggedIn){
    api
      .getProfile()
      .then(profileInfo => {
        setCurrentUser(profileInfo);
      })
      .catch(err => console.log(err));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if(isLoggedIn){
    api
      .getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
    }
  }, [isLoggedIn]);

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
   //const token = localStorage.getItem('jwt');
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked,)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(id) {
    const token = localStorage.getItem('jwt');;
    api
      .deleteCard(id, token)
      .then(() => {
        setCards(state => state.filter(card => card._id !== id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      });
  }

  const handleCardDeleteClick = (cardId) => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setDeletedCard(cardId);
  };

  function handleUpdateUser(data) {
    const token = localStorage.getItem('jwt');;
    api
      .editProfile(data.name, data.about, token)
      .then(currentUserInfo => {
        setCurrentUser(currentUserInfo);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }

  const handleUpdateAvatar = newAva => {
    const token = localStorage.getItem('jwt');;
    api
      .editAvatar(newAva, token)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  };

  const handleAddPlaceSubmit = data => {
    const token = localStorage.getItem('jwt');
    api
      .addCard(data.name, data.link, token)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      });
  };

  //Регистрация
  function handleRegisterSubmit(email, password) {
    register(email, password)
      .then(() => {
        setIsRegistrationValid(true);
        setInfoToolTipPopupOpen(true);
        navigate('/sign-in');
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
        setInfoToolTipPopupOpen(true);
      });
  }

  //Авторизация
  function handleLoginSubmit(email, password) {
    login(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch(err => {
        setIsRegistrationValid(false);
        console.log(`Ошибка: ${err}`);
        setInfoToolTipPopupOpen(true);
      });
  }

  //Выход
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmail('');
    navigate('/sign-in');
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      checkToken(token)
        .then(res => {
          setIsLoggedIn(true);
          setEmail(res.email);
          navigate('/');
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [navigate]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = card => {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoToolTipPopupOpen(false);
    setIsConfirmPopupOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header email={email} onSignOut={handleLogout} />
          <InfoTooltip />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  onCardLike={handleCardLike}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDeleteClick}
                  cards={cards}
                />
              }
            />

            <Route
              exact
              path="*"
              element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
            />
            <Route path="/sign-up" element={<Register onRegister={handleRegisterSubmit} />} />
            <Route path="/sign-in" element={<Login onLogin={handleLoginSubmit} />} />
          </Routes>
          {isLoggedIn && <Footer />}
        </div>

        {/* <!-- Обновить аватар --> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* <!-- Всплывающее окно редактирования профиля --> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* <!-- Всплывающее окно добавления места --> */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />


        {/* <!-- Забытое с 10 спринта окно подтверждения удаления карточки --> */}
        <PopupWithConfirm
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          card={deletedCard}
        />

        {/* <!-- Попап подтверждения удаления карточки--> */}
        <div className="popup_type_delete-card">
          <div className="popup popup__container">
            <button type="button" className="popup__close"></button>
            <h3 className="popup__title">Вы уверены?</h3>
            <form name="delete-form" action="#" className="popup__form form" noValidate>
              <button type="submit" className="form__save">
                Да
              </button>
            </form>
          </div>
        </div>

        {/* Всплывающее окно с изображением */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          isValid={isRegistrationValid}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

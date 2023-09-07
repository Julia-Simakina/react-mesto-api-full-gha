import successIcon from '../image/success.svg';
import failIcon from '../image/fail.svg';

const InfoTooltip = ({ isOpen, onClose, isValid }) => {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content">
        <button type="button" className="popup__close" onClick={onClose} />
        <img
          src={isValid ? successIcon : failIcon}
          alt={isValid ? 'Регистрация прошла успешно.' : 'Повторите попытку.'}
          className="popup__icon"
        />
        <p className="popup__massage">
          {isValid ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;

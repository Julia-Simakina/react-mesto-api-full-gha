import React from 'react';
const PopupWithForm = props => {
  return (
    <div className={`popup section popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form
          name={`${props.name}`}
          action=""
          className="form popup__form"
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button
            className="form__save form__save_type_edit button"
            type="submit"
            //disabled="disabled"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;

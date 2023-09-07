import React from "react"
//import PopupWithForm from "./PopupWithForm"

const PopupWithConfirm = props => {
const handleConfirm = (event) => {
  event.preventDefault();
  props.onSubmit(props.card);
};

return (
<div className={`popup popup_type_delete-card ${props.isOpen ? "popup_opened" : ""}`}>
  <div className="popup__container">
    <button type="button" className="popup__close" onClick={props.onClose}></button>
    <h3 className="popup__title">Вы уверены?</h3>
    <form 
      name="delete-form" 
      action="#" 
      className="popup__form form" 
      onSubmit={handleConfirm}>
    <button type="submit" className="form__save">
     Да
    </button>
  </form>
  </div>
</div>
)

}
export default PopupWithConfirm;

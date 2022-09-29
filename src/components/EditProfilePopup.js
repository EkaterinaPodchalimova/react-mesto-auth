import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hook/useFormAndValidation";

function EditProfilePopup (props) {
    const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        resetForm();
        setValues( {name: currentUser.name, about: currentUser.about});
    }, [currentUser, props.isOpen]);

    function handleClear() {
        props.onClose();
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onSubmit={handleSubmit} name='edit-user' title='Редактировать профиль'
                       button='Сохранить' onClick={handleClear} isValid={isValid}>
            <input type="text" placeholder="Имя" className="popup__input popup__input_value_name"
                   id="name-input" name="name"
                   required pattern="^[^\s]+(\s.*)?$" minLength="2" maxLength="40" value={values.name || ''} onChange={handleChange}/>
            <span className="name-input-error popup__error">{errors.name}</span>
            <input type="text" placeholder="О себе"
                   className="popup__input popup__input_value_about"
                   id="job-input" required
                   name="about" pattern="^[^\s]+(\s.*)?$" minLength="2" maxLength="400" value={values.about || ''} onChange={handleChange}/>
            <span className="job-input-error popup__error">{errors.about}</span>
        </PopupWithForm>
        )
}

export default EditProfilePopup;
import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hook/useFormAndValidation";

function AddPlacePopup(props) {
    const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

    React.useEffect(() => {
        resetForm()
    }, [props.isOpen]);

    function handleClear() {
        props.onClose();
        setValues({})
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(values);
        setValues({})
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onSubmit={handleSubmit} name='add-card' title='Новое место'
                       button='Создать' onClick={handleClear} isValid={isValid}>
            <input onChange={handleChange} type="text" placeholder="Название" value={values.name || ''}
                   className="popup__input popup__input_value_place"
                   name="name" id="place-input" required pattern="^[^\s]+(\s.*)?$" minLength="2"
                   maxLength="30"/>
            <span className="place-input-error popup__error">{errors.name}</span>
            <input onChange={handleChange} type="url" placeholder="Ссылка на картинку" value={values.link || ''}
                   className="popup__input popup__input_value_photo"
                   name="link" id="photo-input" required pattern="^[^\s]+(\s.*)?$"/>
            <span className="photo-input-error popup__error">{errors.link}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
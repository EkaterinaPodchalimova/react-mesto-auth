import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [formValues, setFormValues] = React.useState({name: "", link: ""});

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormValues(formValues => ({...formValues, [name]: value}));
    }

    function handleClear(e) {
        props.onClose();
        setFormValues({name: "", link: ""})
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(formValues);
        setFormValues({name: "", link: ""})
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onSubmit={handleSubmit} name='add-card' title='Новое место'
                       button='Создать' onClick={handleClear}>
            <input onChange={handleChange} type="text" placeholder="Название" value={formValues.name}
                   className="popup__input popup__input_value_place"
                   name="name" id="place-input" required pattern="^[^\s]+(\s.*)?$" minLength="2"
                   maxLength="30"/>
            <span className="place-input-error popup__error"></span>
            <input onChange={handleChange} type="url" placeholder="Ссылка на картинку" value={formValues.link}
                   className="popup__input popup__input_value_photo"
                   name="link" id="photo-input" required pattern="^[^\s]+(\s.*)?$"/>
            <span className="photo-input-error popup__error"/>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
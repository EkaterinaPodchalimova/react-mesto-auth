import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup (props) {
    const [name, setName] = React.useState('');
    const [description,setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleClear() {
        props.onClose();
        setName(currentUser.name);
        setDescription(currentUser.about)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onSubmit={handleSubmit} name='edit-user' title='Редактировать профиль'
                       button='Сохранить' onClick={handleClear}>
            <input type="text" placeholder="Имя" className="popup__input popup__input_value_name"
                   id="name-input" name="name"
                   required pattern="^[^\s]+(\s.*)?$" minLength="2" maxLength="40" value={name} onChange={handleChangeName}/>
            <span className="name-input-error popup__error"></span>
            <input type="text" placeholder="О себе"
                   className="popup__input popup__input_value_about"
                   id="job-input" required
                   name="about" pattern="^[^\s]+(\s.*)?$" minLength="2" maxLength="400" value={description} onChange={handleChangeDescription}/>
            <span className="job-input-error popup__error"></span>
        </PopupWithForm>
        )
}

export default EditProfilePopup;
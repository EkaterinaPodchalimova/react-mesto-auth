import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hook/useFormAndValidation";


function EditAvatarPopup(props) {
    const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

    React.useEffect(() => {
        resetForm();
    },[props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: values.link,
        });
        setValues({});
    }

    function cleanInput() {
        props.onClose();
        setValues({});
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onSubmit={handleSubmit} name={'edit-avatar'} title={'Обновить аватар'}
                       button={'Сохранить'} onClick={cleanInput} isValid={isValid}>
            <input type="url" placeholder="Ссылка" className="popup__input popup__input_value_link"
                   name="link" id="avatar-input" required pattern="^[^\s]+(\s.*)?$" value={values.link || ''} onChange={handleChange}/>
            <span className="avatar-input-error popup__error">{errors.link}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
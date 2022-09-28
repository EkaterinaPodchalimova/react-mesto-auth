import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
        avatarRef.current.value = '';
    }

    function cleanInput() {
        props.onClose();
        avatarRef.current.value = ''
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onSubmit={handleSubmit} name={'edit-avatar'} title={'Обновить аватар'}
                       button={'Сохранить'} onClick={cleanInput}>
            <input type="url" placeholder="Ссылка" className="popup__input popup__input_value_link"
                   name="link" id="avatar-input" required pattern="^[^\s]+(\s.*)?$" ref={avatarRef}/>
            <span className="avatar-input-error popup__error"/>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
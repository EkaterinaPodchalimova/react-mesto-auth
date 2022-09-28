import React from "react";

function PopupWithForm({name,title,button,isOpen,onSubmit,onClick,children}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? ' popup_opened' : ''}`}>
            <div className={`popup__container popup__container_type_${name}`}>
                <form className={`popup__form popup__form_type_${name}`} name={name} noValidate
                      onSubmit={onSubmit}>
                    <h2 className="popup__label">{title}</h2>
                    {children}
                    <button type="submit"
                            className={`popup__button popup__button_type_${name}`}>{button}</button>
                </form>
                <button className={`popup__close popup__close_type_${name}`} type="button" aria-label="Закрыть"
                        onClick={onClick}/>
            </div>
        </div>
    )
}

export default PopupWithForm;
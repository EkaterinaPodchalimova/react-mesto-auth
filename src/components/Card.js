import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const like = props.card.likes.some(i => i._id === currentUser._id);
    const likeNumber = props.card.likes.length;
    const classListLike = (`element__like ${like ? 'element__like_active' : ''}`);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName =
        (`element__trash ${!isOwn && 'element__trash_hidden'}`);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleCardDelete() {
        props.onTrashClick();
        props.onCardDelete(props.card)
    }

    return (
        <article className="element">
            <img className="element__photo" src={props.card.link} alt={`Изображение ${props.card.name}`}
                 onClick={handleClick}/>
            <button key={'button'} className={cardDeleteButtonClassName} type="button" aria-label="Удалить фото"
                    onClick={handleCardDelete}/>
            <h2 className="element__text">{props.card.name}</h2>
            <div className="element__like-block">
                <button className={classListLike} type="button" aria-label="Поставить лайк" onClick={handleLikeClick}/>
                <p className="element__like-number">{likeNumber}</p>
            </div>
        </article>)

}

export default Card;
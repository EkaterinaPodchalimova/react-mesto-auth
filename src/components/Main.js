import Card from "./Card";
import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="avatar-block" onClick={props.onEditAvatar}>
                    <img className="avatar" src={currentUser.avatar} alt="Аватaр"/>
                    <div className="avatar-edit"></div>
                </div>
                <div className="profile__info">
                    <p className="profile__name">{currentUser.name}</p>
                    <button className="profile__edit-button" type="button"
                            aria-label="Изменить информацию" onClick={props.onEditProfile}/>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить"
                        onClick={props.onAddCard}/>
            </section>
            <section className="elements">
                {props.cards.map((el) => (
                    <Card key={el._id} card={el}
                          onCardClick={props.handleCardClick} onCardLike={props.onCardLike}
                          onTrashClick={props.onCardDelete} onCardDelete={props.handleDeleteClick}/>
                ))}
            </section>
        </main>
    )
}

export default Main;
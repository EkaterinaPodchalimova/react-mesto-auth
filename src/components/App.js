import '../index.css';
import React from "react";
import {Switch, Route, Link, useHistory, withRouter} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithImage from "./PopupWithImage";
import PopupWithAgreement from "./PopupWithAgreement";
import AddPlacePopup from "./AddPlacePopup";
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from './auth.js';

function App() {
    const [isEditAvatarPopupOpen, handleEditAvatarClick] = React.useState(false);
    const [isAddPlacePopupOpen, handleAddCardClick] = React.useState(false);
    const [isEditProfilePopupOpen, handleEditProfileClick] = React.useState(false);
    const [isAgreementPopupOpen, handleDeleteCardClick] = React.useState(false);
    const [isInfoTooltip, handleRegister] = React.useState(false);
    const [selectedDeleteCard, handleDeleteClick] = React.useState({});
    const [selectedCard, handleCardClick] = React.useState({});
    const [currentUser, editUserInformation] = React.useState({});
    const [cards, createCards] = React.useState([]);
    const [loggedIn, handleLogin] = React.useState(false);
    const [isEmail, editEmail] = React.useState('');
    const {push} = useHistory();

    React.useEffect(() => {
        handleTokenCheck();
    }, []);

    function handleUpdateUser({name, about}) {
        api.setUserInformation({name, about})
            .then(() => {
                editUserInformation({...currentUser, name: name, about: about});
                closeAllPopups();
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar({avatar}) {
        api.editAvatar(avatar)
            .then((res) => {
                editUserInformation({...currentUser, avatar: res.avatar});
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                createCards((cards) => cards.map((card) => card._id === newCard._id ? newCard : card))
            })
            .catch((err) => console.log(err));
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                createCards(cards.filter(el => el._id !== card._id))
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit({name, link}) {
        api.postNewCard({name, link})
            .then(newCard => {
                createCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function closeAllPopups() {
        handleEditAvatarClick(false);
        handleAddCardClick(false);
        handleEditProfileClick(false);
        handleDeleteCardClick(false);
        handleRegister(false)
    }

    function handleTokenCheck() {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            auth.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        handleLoginTrue();
                    }
                })
        }
    }

    const handleLogOut = () => {
        handleLogin(false);
        editEmail('');
        localStorage.removeItem('jwt');
        push('/sign-in');
    }

    const handleLoginTrue = () => {
        handleLogin(true);
        push('/');
        Promise.all([
            api.getUserInformation(),
            api.getInitialCards(),
        ])
            .then(([resUser, resCard]) => {
                editUserInformation(resUser);
                createCards(resCard)
            })
            .catch((err) => console.log(err));
    }

    return (
        <Switch>
            <Route path="/sign-up">
                <Register editEmail={editEmail}
                          isOpen={handleRegister}
                          isInfoTooltip={isInfoTooltip}
                          onClick={closeAllPopups}/>
            </Route>
            <Route path="/sign-in">
                <Login editEmail={editEmail} handleLogin={handleLoginTrue}/>
            </Route>
            <ProtectedRoute path='/' loggedIn={loggedIn}>
                <CurrentUserContext.Provider value={currentUser}>
                    <div className="page">
                        <Header>
                            <p className='header__email'>{isEmail}</p>
                            <Link to='/sign-in' onClick={handleLogOut} className="sign__link">Выйти</Link>
                        </Header>
                        <Main cards={cards}
                              onCardLike={handleCardLike}
                              onEditProfile={() => handleEditProfileClick(true)}
                              onAddCard={() => handleAddCardClick(true)}
                              onEditAvatar={() => handleEditAvatarClick(true)}
                              onCardDelete={() => handleDeleteCardClick(true)}
                              isEditProfilePopupOpen={isEditProfilePopupOpen}
                              isAddPlacePopupOpen={isAddPlacePopupOpen}
                              isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                              isAgreementPopupOpen={isAgreementPopupOpen}
                              closeAllPopups={closeAllPopups}
                              handleCardClick={handleCardClick}
                              handleDeleteClick={handleDeleteClick}/>
                        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                          onUpdateUser={handleUpdateUser}/>
                        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                         onUpdateAvatar={handleUpdateAvatar}/>
                        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                       onAddPlace={handleAddPlaceSubmit}/>
                        <PopupWithAgreement onClose={() => {
                            closeAllPopups();
                            handleDeleteClick({})
                        }} onDeleteCard={handleCardDelete} card={selectedDeleteCard}
                                            isOpen={isAgreementPopupOpen}/>
                        <PopupWithImage card={selectedCard} onClose={() => {
                            handleCardClick({})
                        }}/>
                        <Footer/>
                    </div>
                </CurrentUserContext.Provider>
            </ProtectedRoute>
        </Switch>)
}

export default withRouter(App);

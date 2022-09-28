import React from "react";
import TrueImage from '../images/true.svg';
import FalseImage from '../images/false.svg';


function InfoTooltip({isOpen, res, onClick}) {
    const link = res ? TrueImage : FalseImage;

    return (
        <div className={`popup popup_type_info ${isOpen ? ' popup_opened' : ''}`}>
            <div className='info'>
                <img className='info__image' src={link} alt='Итог запроса'/>
                <p className='info__title'>{res ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!' +
                    'Попробуйте ещё раз.'}</p>
                <button className={`popup__close popup__close_type_info`}
                        type="button" aria-label="Закрыть"
                        onClick={onClick}/>
            </div>
        </div>
    )
}

export default InfoTooltip;
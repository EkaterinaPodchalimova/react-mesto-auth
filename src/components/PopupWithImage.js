import React from "react";

class PopupWithImage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
            const classList = `popup popup_type_card ${this.props.card.link && 'popup_opened'}`;
                return (
                    <div className={classList}>
                        <div className="popup__card-container">
                            <img src={this.props.card.link} className="popup__card-photo" alt=""/>
                            <button className="popup__close popup__close_type_card" type="button"
                                    aria-label="Закрыть" onClick={this.props.onClose}></button>
                            <h2 className="popup__card-place">{this.props.card.name}</h2>
                        </div>
                    </div>
                )
        }

}

export default PopupWithImage;
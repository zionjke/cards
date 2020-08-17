import  React from 'react'
import '../scss/cards.scss'
import RatingStars from "../components/RatingStars";
import {NewCardType} from "../types/entities";
import nonVisibleIcon from "../assets/nonVisible.png";
import visibleIcon from "../assets/visible.png";
import deleteIcon from "../assets/delete.png";


type Props = {
    card: NewCardType,
    clickSetVisible: any,
    onClickDeleteCard: any
};


const Card = ({card, clickSetVisible, onClickDeleteCard}: Props) => {

    return (
            <tr>
                <td>
                    <RatingStars card={card} />
                </td>
                <td>{card.question}</td>
                <td className={card.isVisible ? '' : 'nonVisible'}>{card.answer}</td>
                <td className='card-buttons'>
                    <img onClick={() => clickSetVisible(card._id)}
                         className='imgEye'
                         src={card.isVisible ? nonVisibleIcon : visibleIcon}/>
                    <img className='deleteIcon'
                         onClick={() => onClickDeleteCard(card._id)}
                         src={deleteIcon}/>
                </td>
            </tr>
    )

}

export default Card
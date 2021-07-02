import React, {useEffect, useRef, useState} from 'react'
import '../scss/cards.css'
import RatingStars from "../components/RatingStars";
import {NewCardType} from "../types/entities";
import nonVisibleIcon from "../assets/nonVisible.png";
import visibleIcon from "../assets/visible.png";
import good from '../assets/smile.png'
import bad from '../assets/angry.png'
import Button from "../components/Button";
import {action} from "../redux/actions/cards";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";


type Props = {
    card: NewCardType,
    onClickDeleteCard?: any
};


const Card = ({card, onClickDeleteCard}: Props) => {



    const [visible, setVisible] = useState(false)
    const [style, setStyle] = useState(false)
    const dispatch = useDispatch();

    const clickSetVisible = (id: string, e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        setVisible(!visible)
        dispatch(action.setVisible(visible, id))
    }

    const currentCard = () => {
        setStyle(!style)
    }

    const setKnowledgeQuestion = (cardId: string, rate: number) => {
        dispatch(action.setKnowledge(cardId, rate))
    }


    useEffect(() => {
        setVisible(false)
    }, [])


    return (
        <div onClick={currentCard} className={style ? 'cardActive' : 'card'}>
            <div className="headerCard">
                <div className="rateCard">
                    <h6>Рейтинг:</h6>
                    <RatingStars card={card}/>
                </div>
                <div /* ref={visibleRef}*/ className="visibleAnswer">
                    <h6>Подсмотреть ответ:</h6>
                    <img  onClick={(e) => clickSetVisible(card._id, e)}
                         className="visibleIcon"
                         src={card.isVisible ? nonVisibleIcon : visibleIcon} alt=''
                    />
                </div>
            </div>
            <p>{
                visible
                    ? card.answer
                    : card.question
            }</p>
            <div className='footerCard'>
                <div className='knowledge'>
                    <img onClick={() => setKnowledgeQuestion(card._id, 1)} src={good} alt=''/>
                    <h6>Насколько хорошо Вы ответили</h6>
                    <img onClick={() => setKnowledgeQuestion(card._id, 0)} src={bad} alt=''/>
                </div>
                <h4 onClick={(e) => onClickDeleteCard(card._id, e)}>Удалить карточку</h4>
            </div>

        </div>
    )

}

export default Card
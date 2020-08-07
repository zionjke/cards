import * as React from 'react';

import '../scss/cards.scss'
import {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import {NewCardType} from "../types/entities";
import AddedNewCard from "./../components/AddedNewCards";
import {useDispatch, useSelector} from "react-redux";
import {addNewCards, deleteCards, getCards} from "../redux/reducers/cardsReducer";
import {useParams} from 'react-router-dom';
import {AppStateType} from "../redux/store";
import Button from "../components/Button";
import visibleIcon from '../assets/visible.png'
import nonVisibleIcon from '../assets/nonVisible.png'
import deleteIcon from '../assets/delete.png'
import {action} from "../redux/actions/cards";
import {SearchFilter} from "../components/SearchFilter";


type Props = {};


const Cards = (props: Props) => {


    const dispatch = useDispatch();
    let {id} = useParams()
    const [questionTitle, setQuestionTitle] = useState('')
    const [answerTitle, setAnswerTitle] = useState('')
    const [visible, setVisible] = useState(false)
    const {cards} = useSelector(({cards}: AppStateType) => cards)
    const {search} = useSelector(({filter}: AppStateType) => filter)


    useEffect(() => {
        dispatch(getCards(id))
    }, [])

    const onClickAddCard = () => {
        dispatch(addNewCards(id, questionTitle, answerTitle))
        setQuestionTitle('')
        setAnswerTitle('')

    }
    const onClickDeleteCard = useCallback((id: string) => {
        dispatch(deleteCards(id))
    }, [])
    const onChangeQuestionTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setQuestionTitle(e.currentTarget.value)
    }, [])
    const onChangeAnswerTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAnswerTitle(e.currentTarget.value)
    }, [])


    const clickSetVisible = (id: string) => {
        setVisible(!visible)
        dispatch(action.setVisible(visible, id))
        console.log(visible)
    }

    const filteredCards = cards.filter(card => card.question.toLowerCase().indexOf(search.toLowerCase()) !== -1)


    return (
        <>
            <SearchFilter/>
            <AddedNewCard questionTitle={questionTitle}
                          answerTitle={answerTitle}
                          onChangeQuestionTitle={onChangeQuestionTitle}
                          onChangeAnswerTitle={onChangeAnswerTitle}
                          onClickAddCard={onClickAddCard}
            />
            <table id='tableCards'>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                </tr>
                {
                    filteredCards && filteredCards.map((card: NewCardType, index: number) =>
                        <tr key={index}>
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
                        </tr>)
                }

            </table>
        </>
    );
}


export default Cards
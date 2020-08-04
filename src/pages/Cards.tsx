import * as React from 'react';
import {ChangeEvent, useEffect, useState} from "react";
import {CardType} from "../types/entities";
import AddedNewCard from "./AddedNewCards";
import {useDispatch, useSelector} from "react-redux";
import {addNewCards, deleteCards, getCards} from "../redux/reducers/cardsReducer";
import {useParams} from 'react-router-dom';
import {AppStateType} from "../redux/store";


type Props = {};


const Cards = (props: Props) => {

    const dispatch = useDispatch();
    const params = useParams<{ packId: string }>()
    const [questionTitle, setQuestionTitle] = useState('')
    const [answerTitle, setAnswerTitle] = useState('')
    const {cards} = useSelector(({cards}: AppStateType) => cards)


    useEffect(() => {
        dispatch(getCards(params.packId))
    }, [params.packId])

    const onClickAddCard = () => {
        dispatch(addNewCards(params.packId, questionTitle, answerTitle))
    }
    const onClickDeleteCard = (id: string) => {
        dispatch(deleteCards(id))
    }
    const onChangeQuestionTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionTitle(e.currentTarget.value)
    }
    const onChangeAnswerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerTitle(e.currentTarget.value)
    }


    return (
        <div>
            <AddedNewCard questionTitle={questionTitle}
                          answerTitle={answerTitle}
                          onChangeQuestionTitle={onChangeQuestionTitle}
                          onChangeAnswerTitle={onChangeAnswerTitle}
                          onClickAddCard={onClickAddCard}
            />
            {
                cards && cards.map((card: CardType, index: number) =>
                    <div key={index}>
                        Question: {card.question} --- Answer: {card.answer}
                        <button onClick={() => onClickDeleteCard(card._id)}>delete</button>
                    </div>)
            }
        </div>
    );
};

export default Cards
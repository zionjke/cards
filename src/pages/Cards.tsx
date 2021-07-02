import * as React from 'react';

import '../scss/cards.css'
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {NewCardType} from "../types/entities";
import {useDispatch, useSelector} from "react-redux";
import {addNewCards, deleteCards, getCards} from "../redux/reducers/cardsReducer";
import {useParams} from 'react-router-dom';
import {AppStateType} from "../redux/store";
import Button from "../components/Button";
import Field from "../components/Field";
import Card from "./Card";
import good from "../assets/smile.png";
import bad from "../assets/angry.png";
import {action} from "../redux/actions/cards";


type Props = {};


const Cards = (props: Props) => {

    const dispatch = useDispatch();
    let {id} = useParams()

    const [questionTitle, setQuestionTitle] = useState('')
    const [answerTitle, setAnswerTitle] = useState('')

    const {cards} = useSelector(({cards}: AppStateType) => cards)
    const {search} = useSelector(({filter}: AppStateType) => filter)
    const {goodKnowledge} = useSelector(({cards}: AppStateType) => cards)
    const {badKnowledge} = useSelector(({cards}: AppStateType) => cards)


    useEffect(() => {
        dispatch(getCards(id))
    }, [])

    const onClickAddCard = () => {
        dispatch(addNewCards(id, questionTitle, answerTitle))
        setQuestionTitle('')
        setAnswerTitle('')
    }
    const onClickDeleteCard = useCallback((id: string, e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        dispatch(deleteCards(id))
    }, [])
    const onChangeQuestionTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setQuestionTitle(e.currentTarget.value)
    }, [])
    const onChangeAnswerTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAnswerTitle(e.currentTarget.value)
    }, [])

    const setRepeat = (cards: Array<NewCardType>) => {
        dispatch(action.setRepeat(cards))
    }

    //@ts-ignore
   /* const filteredCards = cards.filter(card => card.question.toLowerCase().indexOf(search.toLowerCase()) !== -1)
*/

    return (
        <div className='main-cards'>
            <Field onChange={onChangeQuestionTitle}
                   placeholder={'Add new question'}
                   value={questionTitle}
                   type='text'/>
            <Field onChange={onChangeAnswerTitle}
                   placeholder={'Add new answer'}
                   type='text'
                   value={answerTitle}/>
            <Button color='green' onClick={onClickAddCard}>Add</Button>

            <div className='cardsBlock'>
                {//@ts-ignore
                    cards && cards.map((card: NewCardType, index: number) =>
                        <Card onClickDeleteCard={onClickDeleteCard}
                              card={card}
                              key={card._id}
                        />
                    )
                }
            </div>
            <div>Выберите колоду которую хотите повторить</div>
            <div className='knowledgeCard'>
                <button onClick={()=> setRepeat(goodKnowledge)}>add</button>
                <div className='cardGoodBox'>
                    <img  src={good} alt=''/>
                    {//@ts-ignore
                        goodKnowledge && goodKnowledge.map((c: NewCardType) =>
                            <div className='cardGood'>{c.question}</div>
                        )
                    }

                </div>
                <button onClick={()=> setRepeat(badKnowledge)}>add</button>
                <div className='cardBadBox'>
                    <img   src={bad} alt=''/>
                    {//@ts-ignore
                        badKnowledge && badKnowledge.map((c: NewCardType) =>
                            <div className='cardBad'>{c.question}</div>
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default Cards
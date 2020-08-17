import * as React from 'react';

import '../scss/cards.scss'
import {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import {NewCardType} from "../types/entities";
import AddedNewCard from "../components/AddedNewCards";
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
import Field from "../components/Field";
import Card from "./Card";


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
        }

        const filteredCards = cards.filter(card => card.question.toLowerCase().indexOf(search.toLowerCase()) !== -1)


        return (
            <div className='main-cards'>
                <SearchFilter/>
                <table id='tableCards'>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                    <tr>
                        <th>
                            <Field onChange={onChangeQuestionTitle}
                                   placeholder={'Add new question'}
                                   value={questionTitle}
                                   type='text'/>
                        </th>
                        <th>
                            <Field onChange={onChangeAnswerTitle}
                                   placeholder={'Add new answer'}
                                   type='text'
                                   value={answerTitle}/>
                        </th>
                        <th>
                            <Button color='green' onClick={onClickAddCard}>Add</Button>
                        </th>

                </tr>
                {
                    filteredCards && filteredCards.map((card: NewCardType, index: number) =>
                        <Card clickSetVisible={clickSetVisible}
                              onClickDeleteCard={onClickDeleteCard}
                              card={card}
                              key={card._id}
                        />
                    )
                }
            </table>
            }


           </div>
    );
}

export default Cards
import * as React from 'react';
import {ChangeEvent} from "react";


type Props = {
    onChangeQuestionTitle: (title: ChangeEvent<HTMLInputElement>) => void,
    onChangeAnswerTitle: (title: ChangeEvent<HTMLInputElement>) => void,
    onClickAddCard: () => void
    questionTitle: string,
    answerTitle: string
};


const AddedNewCard = ({onChangeQuestionTitle, onChangeAnswerTitle, onClickAddCard, questionTitle, answerTitle}: Props) => {

    return (
        <div>
            <input onChange={onChangeQuestionTitle}
                   value={questionTitle}
                   placeholder={'question'}/>
            <input onChange={onChangeAnswerTitle}
                   value={answerTitle}
                   placeholder={'answer'}/>
            <button onClick={onClickAddCard}>add card</button>
        </div>

    );
};

export default AddedNewCard
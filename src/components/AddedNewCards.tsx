import * as React from 'react';
import {ChangeEvent} from "react";
import Field from "./Field";
import Button from "./Button";


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
            <Field onChange={onChangeQuestionTitle}
                   placeholder={'question'}
                   type='text'/>
            <Field onChange={onChangeAnswerTitle}
                   placeholder={'answer'}
                   type='text'/>
            <Button color='blue' onClick={onClickAddCard}>Add</Button>

            {/*<input onChange={onChangeQuestionTitle}
                   value={questionTitle}
                   placeholder={'question'}/>*/}
            {/*<input onChange={onChangeAnswerTitle}
                   value={answerTitle}
                   placeholder={'answer'}/>*/}
            {/*<button onClick={onClickAddCard}>add card</button>*/}
        </div>

    );
};

export default AddedNewCard
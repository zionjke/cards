import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import Field from "./Field";
import Button from "./Button";

type Props = {
    addItem?:(title:string)=>void
};
const NewItemForm:React.FC<Props> = ({addItem}) => {
    const [error, setError] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const onAddItemClick = () => {
        let newTitle = title.trim();
        if(title === '') {
            setError(true)
        } else {
            setError(false);
            setTitle('')
            addItem && addItem(newTitle)
        }
    }

    const onTitleChanged = (e:ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onAddItemClick();
        }
    };


    return (
        <div>
            <Field type='text'
                   value={title}
                   onKeyPress={onKeyPress}
                   onChange={onTitleChanged}
                   placeholder='Enter pack name'/>
                   <Button color='green' onClick={onAddItemClick}>
                       Add new pack
                   </Button>
        </div>
    );
};

export default NewItemForm
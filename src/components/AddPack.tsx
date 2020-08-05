import * as React from 'react';
import {useState} from 'react';
import '../scss/addPack.scss'
import NewItemForm from "./newItemForm";
import Button from "./Button";

type Props = {
    onAddPack: (name: string) => void
};
const AddPack: React.FC<Props> = ({onAddPack}) => {
    const [isVisibleForm, setIsVisibleForm] = useState(false);

    const toggleFormVisible = () => {
        setIsVisibleForm(!isVisibleForm)
    }

    return (
        <div className='add-pack_form'>
            {!isVisibleForm ? <div onClick={toggleFormVisible} className='add-pack_form-new'>
                    <Button color='blue'>Add new pack</Button>
                </div>
                : <div className='add-pack_form-block'>
                    <NewItemForm addItem={onAddPack}
                                 toggleFormVisible={toggleFormVisible}
                                 cancelButton/>
                </div>}
        </div>
    );
};

export default AddPack
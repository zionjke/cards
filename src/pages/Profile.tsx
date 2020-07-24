import * as React from 'react';
import Field from "../components/Field";
import Button from "../components/Button";

type Props = {

};
const Profile = (props: Props) => {
    return (
        <div>
            <Field placeholder='Введите имя' type='text'/>
            <Button color={'blue'} disabled>Кнопка</Button>
        </div>
    );
};

export default Profile
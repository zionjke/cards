import * as React from 'react';
import classNames from "classnames";
import {ChangeEvent} from "react";

type Props = {
    type: string
    placeholder?: string,
    onChange?: (e:ChangeEvent<HTMLInputElement>)=> void,
    error?: any
};
const Field: React.FC<Props> = ({type, placeholder, onChange, error}) => {

    return (
        <input onChange={onChange}
               placeholder={placeholder}
               type={type}
               className={classNames('field',{
                   'field-error': error === true
               })}
        />
    );
};

export default Field
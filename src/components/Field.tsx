import * as React from 'react';

type Props = {
    type: string
    placeholder?: string
    onChange?:any
};
const Field: React.FC<Props> = ({type, placeholder,onChange}) => {
    return (
        <input className='field' onChange={onChange}  placeholder={placeholder} type={type}/>
    );
};

export default Field
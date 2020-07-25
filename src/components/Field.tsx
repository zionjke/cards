import * as React from 'react';

type Props = {
    type: string
    placeholder?: string
};
const Field: React.FC<Props> = ({type, placeholder}) => {
    return (
        <input className='field'  placeholder={placeholder} type={type}/>
    );
};

export default Field
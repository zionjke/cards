import React from 'react';
import classNames from 'classnames'

type Props = {
    children?: string
    color?:  string
    disabled? : boolean
};
const Button:React.FC<Props> = ({children,color,disabled}) => {
    return (
            <button className={classNames('button',{
                'button-green': color === 'green',
                'button-gray': color === 'gray',
                'button-red': color === 'red',
                'button-blue': color === 'blue',
                'button-disabled' : disabled
            })}>
                {children}
            </button>
    );
};

export default Button
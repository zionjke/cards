import React from 'react';
import classNames from 'classnames'

type Props = {
    children?: string
    color?:  string
    disabled? : boolean,
    onClick: any
};
const Button:React.FC<Props> = ({children,color,disabled,onClick}) => {
    return (
            <button onClick={onClick}

                className={classNames('button',{
                'button-green': color === 'green',
                'button-gray': color === 'gray',
                'button-red': color === 'red',
                'button-blue': color === 'blue',
                'button-disabled' : disabled === true
            })}>
                {children}
            </button>
    );
};

export default Button
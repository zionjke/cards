import * as React from 'react';
import loader from '../assets/loader.gif'


type Props = {

};
const Loader = (props: Props) => {
    return (
            <img className='loader' src={loader} alt="Loader Gif"/>
    );
};

export default Loader
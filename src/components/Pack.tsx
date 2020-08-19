import * as React from 'react';
import '../scss/pack2.scss'
import removeSvg from '../assets/delete-svg.svg'
import updateSvg from '../assets/update.svg'
import learnSvg from '../assets/learn.svg'

type Props = {
    onUpdatePack:(id:string,name:string) => void
    name:string
    grade: number
    _id: string
    onDeletePack: (packId: string) => void
};

export const Pack = ({name,onUpdatePack,grade,_id,onDeletePack}: Props) => {

    const deletePack = (id:string) => {
        if(window.confirm('Вы действительно хотите удалить колоду?')) {
            onDeletePack(id)
        }
    }

    return (
            <div className="pack">
                <div className="pack__remove">
                    <img onClick={() => deletePack(_id)} src={removeSvg} alt="Remove Icon"/>
                </div>
                <div className='pack__update'>
                    <img src={updateSvg} alt="Update Svg icon"/>
                </div>
                <h3 className="title">{name}</h3>
                <div className="bar">
                    <div className="emptybar"></div>
                    <div className="filledbar"></div>
                </div>
                <div className="circle">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle className="stroke" cx="60" cy="60" r="50"/>
                    </svg>
                </div>
                <div className="pack__learn">
                    <img src={learnSvg} alt="Learn Svg Icon"/>
                </div>
            </div>
    );
};
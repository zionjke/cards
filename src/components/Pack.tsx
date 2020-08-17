import * as React from 'react';
import '../scss/pack.scss'
import Button from "./Button";
import {Link} from 'react-router-dom';
import {useCallback, useState} from "react";



type Props = {
    onUpdatePack:(id:string,name:string) => void
    name:string
    grade: number
    _id: string
    onDeletePack: (packId: string) => void
};
const Pack = React.memo(({onUpdatePack,onDeletePack,name,grade,_id}:Props) => {
    const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
    const openPopup = useCallback(() => {
        setVisiblePopup(true)
    },[])

    const closePopup = useCallback(() => {
        setVisiblePopup(false)
    },[])

    return (
           <tr>
                        <td>{name}</td>
                        <td>{grade}</td>
                        <td className='pack-buttons'>
                            <Button onClick={() => onDeletePack(_id)} color='red'>
                                X
                            </Button>
                            <Button onClick={openPopup} color='blue'>
                                Update
                            </Button>
                            {visiblePopup &&
                            <div className='popup-window'>
                                Popup
                            </div>
                            }
                        </td>
                        <td className='pack-links'>
                            <Link to={`/card/${_id}`}>
                                Cards
                            </Link>
                            <Link to='card/'>
                                Learn
                            </Link>
                        </td>
                    </tr>
                )


});

export default Pack
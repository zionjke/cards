import * as React from 'react';
import '../scss/pack.scss'
import {CardPack} from "../types/entities";
import Button from "./Button";
import {Link} from 'react-router-dom';
import {useCallback, useState} from "react";



type Props = {
    onUpdatePack:(id:string,name:string) => void
    cardPacks: Array<CardPack>
    onDeletePack: (packId: string) => void
};
const Pack = React.memo(({onUpdatePack,cardPacks,onDeletePack}:Props) => {
    const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
    const openPopup = useCallback(() => {
        setVisiblePopup(true)
    },[])

    const closePopup = useCallback(() => {
        setVisiblePopup(false)
    },[])

    return (
        <table id='table'>
            <tr>
                <th>Name</th>
                <th>Grade</th>
            </tr>
            {
                cardPacks.map(pack => <tr key={pack._id}>
                        <td>{pack.name}</td>
                        <td>{pack.grade}</td>
                        <td className='pack-buttons'>
                            <Button onClick={() => onDeletePack(pack._id)} color='red'>
                                X
                            </Button>
                            <Button onClick={() => onUpdatePack(pack._id,'Update Pack')} color='blue'>
                                Update
                            </Button>
                        </td>
                        <td className='pack-links'>
                            <Link to={`/card/${pack._id}`}>
                                Cards
                            </Link>
                            <Link to='card/'>
                                Learn
                            </Link>
                        </td>
                    </tr>
                )}
        </table>
    );
});

export default Pack
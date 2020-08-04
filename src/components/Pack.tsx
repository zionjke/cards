import * as React from 'react';
import '../scss/pack.scss'
import {CardPack} from "../types/entities";
import Button from "./Button";
import {Link} from 'react-router-dom';

type Props = {
    cardPacks: Array<CardPack>
    // onAddPack: () => void
    onDeletePack: (packId: string) => void
};
const Pack = (props: Props) => {
    return (
        <table id='table'>
            <tr>
                <th>Name</th>
                <th>Grade</th>
            </tr>
            {
                props.cardPacks.map(pack => <tr key={pack._id}>
                        <td>{pack.name}</td>
                        <td>{pack.grade}</td>
                        <td className='pack-buttons'>
                            <Button onClick={() => props.onDeletePack(pack._id)} color='red'>
                                X
                            </Button>
                            <Button color='blue'>
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
};

export default Pack
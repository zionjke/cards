import * as React from 'react';
import Pack from "./Pack";
import {CardPack} from "../types/entities";
import '../scss/packs.scss'
import './../scss/pack.scss'

type Props = {
    filteredPacks:Array<CardPack>
    onUpdatePack:(id:string,name:string) => void
    onDeletePack: (packId: string) => void
};
export const Table = ({filteredPacks,onUpdatePack,onDeletePack}: Props) => {
    return (
        <table id='table'>
            <tr>
                <th>Name</th>
                <th>Grade</th>
            </tr>
            {filteredPacks.map(pack => <Pack onUpdatePack={onUpdatePack} onDeletePack={onDeletePack} {...pack}/>)}
        </table>
    );
};
import * as React from 'react';
import {useCallback, useEffect} from "react";
import {addPack, deletePack, getPacks} from "../redux/reducers/packReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import Pack from '../components/Pack';
import {action} from "../redux/actions/login";
import AddPack from "../components/AddPack";

type Props = {};
const Packs = React.memo((props: Props) => {
    const dispatch = useDispatch()
    const {cardPacks} = useSelector(({packs}: AppStateType) => packs)
    const {_id} = useSelector(({login}:AppStateType) => login)

    useEffect(() => {
        dispatch(getPacks(_id))
        dispatch(action.setIsAuth(true))
    }, [_id])

    const onAddPack = useCallback((name) => {
        dispatch(addPack(name))
    },[])

    const onDeletePack = useCallback((packId: string) => {
        dispatch(deletePack(packId))
    },[])


    return (
        <div>
            <AddPack onAddPack={onAddPack}/>
            <Pack  onDeletePack={onDeletePack} cardPacks={cardPacks}/>
        </div>
    );
});

export default Packs
import * as React from 'react';
import { useCallback, useEffect} from "react";
import {addPack, deletePack, getPacks,updatePack} from "../redux/reducers/packReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import Pack from '../components/Pack';
import AddPack from "../components/AddPack";
import { action } from '../redux/actions/login';
import {SearchFilter} from "../components/SearchFilter";
import {actionPack} from "../redux/actions/packs";
import Pagination from "react-js-pagination";
import '../scss/packs.scss'


type Props = {};

const Packs = React.memo((props: Props) => {
    const dispatch = useDispatch()
    const {cardPacks,currentPage,pageCount,cardPackTotalCount} = useSelector(({packs}: AppStateType) => packs)
    const {_id} = useSelector(({login}:AppStateType) => login)
    const {search} = useSelector(({filter}:AppStateType)=> filter)


    useEffect(() => {
        dispatch(getPacks(_id,currentPage,pageCount))
        dispatch(action.setIsAuth(true))
    }, [_id,currentPage,pageCount])

    const onAddPack = useCallback((name) => {
        dispatch(addPack(name))
    },[])

    const onDeletePack = useCallback((packId: string) => {
        dispatch(deletePack(packId))
    },[])

    const onUpdatePack = useCallback((packId,name) => {
        dispatch(updatePack(packId,name))
    },[])

    const handlePageChange = useCallback((pageNumber:number) => {
        console.log(`active page is ${pageNumber}`);
        dispatch(actionPack.setPage(pageNumber))
    },[])


    const filteredPacks = cardPacks.filter(pack => pack.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)

    return (
        <div>
            <SearchFilter/>
            <AddPack onAddPack={onAddPack}/>
            <Pack onUpdatePack={onUpdatePack}  onDeletePack={onDeletePack} cardPacks={filteredPacks}/>
            <Pagination totalItemsCount={cardPackTotalCount}
                        onChange={handlePageChange}
                        activePage={currentPage}
                        itemsCountPerPage={pageCount}/>
        </div>
    );
});

export default Packs
import * as React from 'react';
import Field from "./Field";
import {ChangeEvent} from "react";
import {actionFilter} from "../redux/actions/filter";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import '../scss/searchFilter.scss'

type Props = {

};
export const SearchFilter = (props: Props) => {
    const dispatch = useDispatch()
    const {search} = useSelector(({filter}:AppStateType)=> filter)

    const onSearch = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(actionFilter.setSearchQuery(e.target.value.substr(0,20)))
    };

    return (
        <div className='search-filter'>
            <Field type='text' value={search} onChange={onSearch} placeholder='Поиск...'/>
        </div>
    );
};
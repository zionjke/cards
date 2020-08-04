import axios from 'axios';
import {CardPack} from "../types/entities";


const instanse = axios.create({
    baseURL: 'http://localhost:7542/1.0/'
});

type LoginResponseType = {
    email: string
    name: string
    isAdmin: boolean
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    __v: number
    _id: string
    success: boolean
}

type PacksResponseType = {
    cardPacks: Array<CardPack>
    cardPacksTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    token: string
}

export const api = {
    getPacks(token: string | undefined,userId:string) {
        return instanse.get<PacksResponseType>(`cards/pack?token=${token}&user_id=${userId}`)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instanse.post<LoginResponseType>('auth/login', {email, password, rememberMe},)
    },
    me(token: string) {
        return instanse.post<LoginResponseType>('auth/me', {token})
    },
    addPack(token: string | undefined,name:string) {
        return instanse.post('cards/pack', {cardsPack: {name}, token})
    },
    deletePack(token: string | undefined, id: string) {
        return instanse.delete(`cards/pack?token=${token}&id=${id}`)
    }
}


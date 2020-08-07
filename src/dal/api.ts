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
    getPacks(token: string | undefined ,userId:string) {
        return instanse.get<PacksResponseType>(`cards/pack?token=${token}&user_id=${userId}`)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instanse.post<LoginResponseType>('auth/login', {email, password, rememberMe},)
    },
    me(token: string | undefined) {
        return instanse.post<LoginResponseType>('auth/me', {token})
    },
    addPack(token: string | undefined,name:string) {
        return instanse.post('cards/pack', {cardsPack: {name}, token})
    },
    deletePack(token: string | undefined, id: string) {
        return instanse.delete(`cards/pack?token=${token}&id=${id}`)
    },
    updatePack(_id:string,name:string,token:string | undefined) {
        return instanse.put('cards/pack',{cardsPack:{_id,name},token})
    }
}

export const apiRegistration = {

    postRegistration(email:string, password:string) {
        debugger
        return  axios.post('http://localhost:7542/1.0/auth/register',
            {email, password})
            .then(res => res.data)
    }
}

export const apiCards = {
    getCards(id: string, token: string | undefined) {
        return axios.get(`http://localhost:7542/1.0/cards/card?cardsPack_id=${id}&token=${token}`)
            .then(res => res.data)
    },
    addCards(packId: string, question: string, answer: string, token: string | undefined) {
        return axios.post(`http://localhost:7542/1.0/cards/card`, {card: {cardsPack_id: packId, question: question, answer: answer}, token})
            .then(res => res.data)
    },
    deleteCards(token: string | undefined, id: string) {
        return axios.delete(`http://localhost:7542/1.0/cards/card?token=${token}&id=${id}`)
            .then(res => res.data)
    }
}


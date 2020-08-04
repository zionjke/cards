import axios from 'axios'




export const apiRegistration = {
    postRegistration(email:string, password:string) {
      return  axios.post('http://localhost:7542/1.0/auth/register',
            {email, password})
            .then(res => res.data)
    }
}

export const apiCards = {
    getCards(id: string, token: string | null) {
        return axios.get(`http://localhost:7542/1.0/cards/card?cardsPack_id=${id}&token=${token}`)
            .then(res => res.data)
    },
    addCards({card}: any, token: string | null) {
        debugger
        return axios.post(`http://localhost:7542/1.0/cards/card?${token}`, {card})
            .then(res => res.data)
    },
    deleteCards(token: string | null, id: string) {
        return axios.delete(`http://localhost:7542/1.0/cards/card?token=${token}&id=${id}`)
            .then(res => res.data)
    }
}

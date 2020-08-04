export type CardPack = {
    _id: string
    user_id: string
    name: string
    path: string
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
}

export type CardType = {
    answer: string
    answerImg: string
    answerVideo: any
    cardsPack_id: string
    comments: any
    created: string
    grade: number
    question: string
    questionImg: string
    questionVideo: any
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}


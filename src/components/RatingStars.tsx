import React from 'react'
import {NewCardType} from "../types/entities";
import Rating from '@material-ui/lab/Rating';

import {setRatingCards} from "../redux/reducers/cardsReducer";
import {useDispatch} from "react-redux";

type Props = {
    card: NewCardType
};

const RatingStars = ({card}: Props) => {

    const rating = Math.round(Number(card.grade))
    const dispatch = useDispatch();

    const clickSetRatingCart = (event: any, newValue: number | null) => {
        newValue && dispatch(setRatingCards(newValue, card._id))
        console.log(card._id)
    }

    return (
        <div>
                <Rating
                    onChange={clickSetRatingCart}
                    name={card._id}
                    value={rating}
                />
        </div>
    );
};

export default RatingStars
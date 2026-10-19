import {type Review} from '../types.ts'

type Props = {
    review:Review;
}

export default function Review({review}:Props ) {
    return (
        <div className="review" key={review.id}>
            <div className="review-header">
                <p className={"review_username"}>{review.username}</p>
                <p className={"review_date"}>{review.created_at}</p>
            </div>
            <p className={"review-content"}>{review.content}</p>
        </div>
    )
}
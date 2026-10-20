import {type Review} from '../types.ts'

type Props = {
    review:Review;
}

export default function Review({review}:Props ) {
    return (
        <div className="review" key={review.id}>
            <div className="review-header">
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", gap: ".5em"}}>
                    <div style={{width: ".75em", height: ".75em",
                        background: "var(--header)",
                        borderRadius: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><p style={{color: "var(--paper-color)", fontSize: ".5em", marginBottom: ".2em"}}>{review.username[0]}</p></div>
                    <p className={"review_username"}>{review.username}</p>
                </div>

                <p className={"review_date"}>{review.created_at}</p>
            </div>
            <p className={"review-content"}>{review.content}</p>
        </div>
    )
}
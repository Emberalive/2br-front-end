import {type Review} from '../types.ts'
import type {User} from "../App.tsx";

type Props = {
    review:Review;
    user:User;
}

export default function Review({review, user}:Props ) {

    function timeAgo(dateStr: string): string {
        const [d, m, y] = dateStr.split('/').map(Number);

        const now = new Date();
        const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
        //month starts at 0 so January is 0 not 1
        const posted = Date.UTC(y, m - 1, d);
        //divided by ms in a day
        const days = Math.round((today - posted) / 86_400_000);

        const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? '' : 's'} ago`;

        if (days <= 0) return 'today';
        if (days === 1) return 'yesterday';
        if (days < 7) return plural(days, 'day');
        if (days < 30) return plural(Math.floor(days / 7), 'week');
        if (days < 365) return plural(Math.floor(days / 30.44), 'month');
        return plural(Math.floor(days / 365.25), 'year');
    }

    return (
        <div className="review" key={review.id}>
            <div className="review-header">
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", gap: ".5em"}}>
                    <div style={{width: ".75em", height: ".75em",
                        background: review.username === user.username ? "#8a6a4f" : "#3b2414",
                        borderRadius: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><p style={{color: "var(--paper-color)", fontSize: ".5em", marginBottom: ".2em"}}>{review.username[0]}</p></div>
                    <p className={"review_username"}>{review.username}</p>
                </div>

                <p className={"review_date"}>{timeAgo(review.created_at)}</p>
            </div>
            <p className={"review-content"}>{review.content}</p>
        </div>
    )
}
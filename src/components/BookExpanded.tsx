import type {Book} from "./BookCase.tsx";
import {type Dispatch, type SetStateAction, useState} from "react";
import type {NotificationType, Review} from "../types.ts";
import ReviewElement from "./Review";

type BookExpanded = {
    book: Book;
    setSelectedBook: Dispatch<SetStateAction<Book | null>>;
    api: string;
    handleNotification: (type: NotificationType, message: string) => void
    sessionId:string | null;
}

export default function BookExpanded({book, setSelectedBook, api, handleNotification, sessionId}:BookExpanded) {
    const [addingReview, setAddReview] = useState<boolean>(false);
    const [reviewContent, setReviewContent] = useState<string>("");
    const [bookReviews, setBookReviews] = useState<Review[]>([]);

    async function onSubmit() {
        if (reviewContent === "") {
            handleNotification('error', 'Please add some review content')
            return
        }
        try {
            const response = await fetch(`${api}review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-session-id": sessionId ? sessionId : ""
                },
                body: JSON.stringify({
                    content: reviewContent,
                    book_id: book.id,
                })
            })
            const resData = await response.json()
            if (!resData.success) {
                handleNotification('error', resData.message)
                return
            }
            handleNotification('info', "Your review was added successfully.")
        } catch (e) {
            handleNotification('error', 'Sorry there was a server error')
            console.log("error", e)
        }
    }

    async function getReviews () {
        try {
            const response = await fetch(`${api}review/${encodeURIComponent(book.id)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-session-id": sessionId ? sessionId : "",
                }
            })
            const resData = await response.json()
            if (!resData.success) {
                handleNotification('error', resData.message)
            }
            setBookReviews(resData.rows)
        } catch (e) {
            handleNotification('error', 'Sorry there was a server error')
            console.log("error", e)
        }
     }
    const reviewElements = bookReviews.map((review:Review) => <ReviewElement review={review}/>)

    return (
        <div className={"component__wrapper"} style={{justifyContent: "space-evenly"}}>
            <div className={"expanded-book__wrapper"}>
                <img className={"expanded-book"} src={book.cover} alt={book.title} />
                <div className={"book-details"}>
                    <header>
                        <h1>{book.title}</h1>
                        <button onClick={() => {
                            setSelectedBook(null)
                        }}>X</button>
                    </header>
                    <div className={"book-details__entry"}>
                        <p className={"label"}>Author(s): </p>
                        <p>{book.authors.join(', ')}</p>
                    </div>
                    <div className={"reviews"}>
                        <div className={"review-header"}>
                            <p className={"label"} onClick={async () => {
                                await getReviews()
                            }}>Reviews</p>
                            <div className={"buttons"}>
                                <button onClick={async() => {
                                    if (addingReview) {
                                        await onSubmit()
                                    }
                                    setAddReview(true)
                                }}>{addingReview ? "submit" : "add"}</button>
                                {addingReview && <button onClick={() => {
                                    setAddReview(false)
                                }}>Cancel</button>}
                            </div>
                        </div>
                        {addingReview && <textarea value={reviewContent} className={"review-body"} onChange={(e) => {
                            setReviewContent(e.target.value)
                        }}></textarea>}
                        <div className={"reviews-container"}>
                            {bookReviews.length ? reviewElements : <p style={{color: "var(--header)"}}>No Reviews yet, why not add one</p>}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
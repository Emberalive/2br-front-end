import type {Book} from "./BookCase.tsx";
import {type Dispatch, type SetStateAction, useState} from "react";
import type {NotificationType} from "../types.ts";

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
                            <p className={"label"}>Reviews</p>
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
                    </div>
                </div>
            </div>

        </div>
    )
}
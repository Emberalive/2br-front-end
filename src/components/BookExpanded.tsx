import type {Book} from "./BookCase.tsx";
import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import type {NotificationType, Review} from "../types.ts";
import ReviewElement from "./Review";
import type {User} from "../App.tsx";
const uuid = () => crypto.randomUUID();

type BookExpanded = {
    book: Book;
    setSelectedBook: Dispatch<SetStateAction<Book | null>>;
    api: string;
    handleNotification: (type: NotificationType, message: string) => void
    sessionId:string | null;
    user: User | null;
    setBooks: Dispatch<SetStateAction<Book[]>>;
}

export default function BookExpanded({book, setSelectedBook, api, handleNotification, sessionId, user, setBooks}:BookExpanded) {
    const [addingReview, setAddReview] = useState<boolean>(false);
    const [reviewContent, setReviewContent] = useState<string>("");
    const [bookReviews, setBookReviews] = useState<Review[]>([]);
    const [metaDetails, setMetaDetails] = useState<Book>(book)

    // if (user === null) {
    //     return
    // }

    useEffect(() => {
        console.log(JSON.stringify(metaDetails, null, 2));
    }, [metaDetails]);

    async function submitMetaDetails () {
        const response = await fetch(`${api}book`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-session-id": sessionId ? sessionId : ""
            },
            body: JSON.stringify(metaDetails)
        })
        const resData = await response.json();
        if (!resData.success || !resData) {
            return handleNotification("error", resData.message);
        }
        setBooks((prev) => {
            return prev.map((b) => {
                if (b.id === metaDetails.id) {
                    return metaDetails
                }
                return b
            })
        })
        return handleNotification("info", "updated book details")
    }

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
            setBookReviews((prev) => [{created_at: new Date().toISOString().slice(0, 19).replace('T', ' '), id:uuid(), content: reviewContent, username: user.username} , ...prev])
            handleNotification('info', "Your review was added successfully.")
        } catch (e) {
            handleNotification('error', 'Sorry there was a server error')
            console.log("error", e)
        }
    }

    useEffect(() => {
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
        getReviews();
    }, [])

    const reviewElements = bookReviews.map((review:Review) => <ReviewElement review={review}/>)

    return (
        <div className={"component__wrapper"} style={{justifyContent: "space-evenly"}}>
            <div className={"expanded-book__wrapper"}>
                <img className={"expanded-book"} style={{backgroundImage: `url(${book.placeholder})`, color: "transparent"}} src={book.cover} alt={book.title} />
                <div className={"book-details"}>
                    <header>
                        <h1>{book.title}</h1>
                        <button onClick={async() => {
                            setSelectedBook(null)
                            if (metaDetails !== book) {
                                await submitMetaDetails()
                            }
                        }}>X</button>
                    </header>
                    <div className={"book-details__entry"}>
                        <p className={"label"}>Author(s): </p>
                        <p>{book.authors.join(', ')}</p>
                    </div>
                    <div className={"book-meta"}>
                        <p className={"label"}>Read: </p>
                        <input type={"checkbox"} checked={metaDetails.finished} onChange={(e) => {
                            setMetaDetails((prev) => {
                                return {
                                    ...prev,
                                    finished: e.target.checked
                                }
                            })
                        }}/>
                    </div>
                    <div className={"book-meta"}>
                        <p className={"label"}>Lent out:</p>
                        <input type={"checkbox"} checked={metaDetails.leant} onChange={(e) => {
                            console.log("leant out?: ", e.target.checked)
                            setMetaDetails((prev) => {
                                return {
                                    ...prev,
                                    leant: e.target.checked
                                }
                            })
                        }}/>
                    </div>
                    {metaDetails.leant && <div className={"book-details__entry"} style={{flexDirection: "column", width: "calc(100% - .2em)"}} >
                        <p className={"label"}>Lent to: </p>
                        <input type={"text"} value={metaDetails.leant_to} onChange={(e) => {
                            setMetaDetails((prev) => {
                                return {...prev, leant_to: e.target.value}

                            })
                        }}/>
                    </div>}
                    <div className={"reviews"}>
                        <div className={"review-header"}>
                            <p className={"label"}>Reviews</p>
                            <div className={"buttons"}>
                                <button onClick={async() => {
                                    if (addingReview) {
                                        await onSubmit()
                                        setAddReview(false)
                                        setReviewContent("")
                                        return
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
                            {bookReviews.length ? reviewElements : <p style={{color: "var(--paper-color)", width: "100%", textAlign: "center"}}>No Reviews yet, why not add one</p>}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
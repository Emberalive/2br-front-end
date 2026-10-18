import type {Book} from "./BookCase.tsx";
import {type Dispatch, type SetStateAction, useState} from "react";

type BookExpanded = {
    book: Book;
    setSelectedBook: Dispatch<SetStateAction<Book | null>>;
}

export default function BookExpanded({book, setSelectedBook}:BookExpanded) {
    const [addingReview, setAddReview] = useState<boolean>(false);

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
                                <button onClick={() => {
                                    setAddReview(true)
                                }}>{addingReview ? "submit" : "add"}</button>
                                {addingReview && <button onClick={() => {
                                    setAddReview(false)
                                }}>Cancel</button>}
                            </div>
                        </div>
                        {addingReview && <textarea className={"review-body"}></textarea>}
                    </div>
                </div>
            </div>

        </div>
    )
}
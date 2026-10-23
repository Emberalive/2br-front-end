import {type Book} from './BookCase.tsx'
import type {Dispatch, SetStateAction} from "react";

type BookProps = {
    bookDetails: Book | string
    setSelectedBook: Dispatch<SetStateAction<Book | null>>
}

export default function BookElement ({bookDetails, setSelectedBook}:BookProps) {
    console.log("book details: ", bookDetails);
    if (typeof bookDetails === "string") {
        return (<div className="plant">
            <img src={bookDetails} alt="plant image" />
        </div>
        )
    } else {
        return (
            <div className="book" onClick={() => {
                setSelectedBook(bookDetails)
            }}>
                {bookDetails.finished && <div className="check">
                </div>}
                <img style={{backgroundImage: `url(${bookDetails.placeholder})`}} src={bookDetails.cover} alt={bookDetails.title} loading="lazy"/>
            </div>
        )
    }
}
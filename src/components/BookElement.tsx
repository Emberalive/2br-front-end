import {type Book} from './BookCase.tsx'
import type {Dispatch, SetStateAction} from "react";

type BookProps = {
    bookDetails: Book
    setSelectedBook: Dispatch<SetStateAction<Book | null>>
}

export default function BookElement ({bookDetails, setSelectedBook}:BookProps) {
    return (
        <div className="book" onClick={() => {
            setSelectedBook(bookDetails)
        }}>
            <img src={bookDetails.cover} alt={bookDetails.title}/>
        </div>
    )
}
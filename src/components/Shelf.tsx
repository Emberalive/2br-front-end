import {type Book} from './BookCase.tsx'
import BookElement from './BookElement.tsx'
import type {Dispatch, SetStateAction} from "react";

type ShelfTypes = {
    books: Book[]
    setSelectedBook: Dispatch<SetStateAction<Book | null>>
}

export default function Shelf({ books, setSelectedBook }:ShelfTypes) {
    return (
        <div className="shelf-wrapper">
            <div className="book-wrapper">
                {books.map(book => (
                    <BookElement bookDetails={book} setSelectedBook={setSelectedBook}/>
                ))}
            </div>
            <div className="shelf">
                <div className="top"></div>
                <div className="front"></div>
            </div>
        </div>
    );
}
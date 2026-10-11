import {type Book} from './BookCase.tsx'
import BookElement from './BookElement.tsx'

type ShelfTypes = {
    books: Book[]
}

export default function Shelf({ books }:ShelfTypes) {
    return (
        <div className="shelf-wrapper">
            <div className="book-wrapper">
                {books.map(book => (
                    <BookElement bookDetails={book} />
                ))}
            </div>
            <div className="shelf">
                <div className="top"></div>
                <div className="front"></div>
            </div>
        </div>
    );
}
import {type Book} from './BookCase.tsx'

type ShelfTypes = {
    books: Book[]
}

export default function Shelf({ books }:ShelfTypes) {
    return (
        <div className="shelf-wrapper">
            <div className="book-wrapper">
                {books.map(book => (
                    <div className="book" style={{background: book.colour}} key={book.id}><p style={{fontSize: "0.3em"}}>{book.title}</p></div>
                ))}
            </div>
            <div className="shelf">
                <div className="top"></div>
                <div className="front"></div>
            </div>
        </div>
    );
}
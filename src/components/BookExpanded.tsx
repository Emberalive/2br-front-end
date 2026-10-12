import type {Book} from "./BookCase.tsx";
import type {Dispatch, SetStateAction} from "react";

type BookExpanded = {
    book: Book;
    setSelectedBook: Dispatch<SetStateAction<Book | null>>;
}

export default function BookExpanded({book, setSelectedBook}:BookExpanded) {
    return (
        <div className={"component__wrapper"}>
            <img className={"expanded-book"} src={book.cover} alt={book.title} />
            <div className={"book-details"}>
                <header>
                    <h1>{book.title}</h1>
                    <button onClick={() => {
                        setSelectedBook(null)
                    }}>X</button>
                </header>
                <p>Author(s): {book.authors.join(', ')}</p>
            </div>
        </div>
    )
}
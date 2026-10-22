import {type Book} from './BookCase.tsx'
import BookElement from './BookElement.tsx'
import {type Dispatch, type SetStateAction, useMemo} from "react";

type ShelfTypes = {
    shelfDetails: {books: Book[], plant: string | undefined}
    setSelectedBook: Dispatch<SetStateAction<Book | null>>
    booksPerShelf: number
}

export default function Shelf({ shelfDetails, setSelectedBook, booksPerShelf }:ShelfTypes) {

    const shelfItems:(Book | string | undefined)[] = useMemo(() => {
        if (shelfDetails.plant) {
            let bookIndex = 0
            const arr = new Array(booksPerShelf)
            arr[Math.floor(Math.random() * arr.length)] = shelfDetails.plant
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === undefined && bookIndex < shelfDetails.books.length) {
                    arr[i] = shelfDetails.books[bookIndex]
                    bookIndex ++
                }
            }
            return arr
        } else {
            return shelfDetails.books
        }
    }, [shelfDetails])

    return (
        <div className="shelf-wrapper">
            <div className="book-wrapper">
                {shelfItems.map((item) =>
                    item === undefined ? (
                            <div className={"book-empty"}></div>
                    ) :
                    (
                        <BookElement bookDetails={item} setSelectedBook={setSelectedBook}/>
                    ))
                }
            </div>
            <div className="shelf">
                <div className="top"></div>
                <div className="front"></div>
            </div>
        </div>
    );
}
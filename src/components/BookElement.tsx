import {type Book} from './BookCase.tsx'

type BookProps = {
    bookDetails: Book
}

export default function BookElement ({bookDetails}:BookProps) {
    return (
        <img className={"book"} src={bookDetails.cover} alt={`book cover for ${bookDetails.title}`} />
    )
}
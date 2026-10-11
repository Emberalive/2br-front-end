import {type Book} from './BookCase.tsx'

type BookProps = {
    bookDetails: Book
}

export default function BookElement ({bookDetails}:BookProps) {
    return (
        <div className="book">
            <img src={bookDetails.cover} alt={bookDetails.title}/>
        </div>
    )
}
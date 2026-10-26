import {type Book} from './BookCase'
import {type Dispatch, type SetStateAction, useState} from "react"
import * as React from "react";
import BookLoader from '../assets/book-loader.svg'
import type {NotificationType} from "../types.ts";

type Props = {
    setBooks: Dispatch<SetStateAction<Book[]>>
    setActiveView: Dispatch<SetStateAction<string>>
    api:string
    sessionId:string | null
    handleNotification: (type: NotificationType, message: string) => void
    randomPlaceholder: () => string
}

export default function AddBook({setBooks, api, setActiveView, sessionId, handleNotification, randomPlaceholder}:Props) {
    const [fetchingBook, setFetchingBook] = React.useState<boolean>(false)
    const [bookName, setBookName] = useState("")

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>):Promise<undefined> {
        e.preventDefault();
        setFetchingBook(true);
        const response = await fetch(`${api}book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-session-id": sessionId ? sessionId : "",
            },
            body: JSON.stringify({
                param: bookName,
            })
        })
        const resData = await response.json()
        if (!resData.success) {
            handleNotification('error', resData.message)
            setFetchingBook(false);
            setActiveView("bookcase")
            return
        }

        setBooks((prev):Book[] =>  {
            return [...prev, {...resData.book, placeholder: randomPlaceholder()}]
        })
        setTimeout(() => {
            setFetchingBook(false);
            setActiveView("bookcase")
            handleNotification('info', `book: ${resData.book.title} has been added successfully.`)
        }, 2000)

        return
    }

    return (
        <div className="component__wrapper">
            <div className="component__container">
                <header>
                    <h1>Add Book</h1>
                </header>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-element">
                        <label>book Name:</label>
                        <input id={"book-name"} type={"text"} placeholder={"The Hobbit"} onChange={(e) => {
                            setBookName(e.target.value)
                        }}></input>
                    </div>
                    <div className={fetchingBook ? "buttons disabled" : "buttons"}>
                        <button>Add</button>
                        <button onClick={() => {
                            setActiveView("bookcase")
                        }}>cancel</button>
                    </div>
                </form>
            </div>
            {fetchingBook && <img src={BookLoader} width={64} alt={"Loading"}/>}
        </div>
    )
}
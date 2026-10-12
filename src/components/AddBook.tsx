import {type Book} from './BookCase'
import {type Dispatch, type SetStateAction, useState} from "react"
import * as React from "react";

type Props = {
    setBooks: Dispatch<SetStateAction<Book[]>>
    setActiveView: Dispatch<SetStateAction<string>>
    api:string
    sessionId:string | null
}


export default function AddBook({setBooks, api, setActiveView, sessionId}:Props) {

    const [bookName, setBookName] = useState("")

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>):Promise<undefined> {
        e.preventDefault();
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
        if (!response.ok) return
        const resData = await response.json()
        if (!resData.success) return

        setBooks((prev):Book[] =>  {
            return [...prev, resData.book]
        })
        setActiveView("bookcase")
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
                    <div className="buttons">
                        <button>Add</button>
                        <button onClick={() => {
                            setActiveView("bookcase")
                        }}>cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
import {type Book} from './BookCase'
import {type Dispatch, type SetStateAction, useState} from "react"
import * as React from "react";
import BookLoader from '../assets/book-loader.svg'
import type {NotificationType} from "../types.ts";
import CameraIcon from '../assets/camera.svg'
import IsbnScan from "./IsbnScan.tsx";

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
    const [author, setAuthor] = useState("")
    const [isbn, setIsbn] = useState("")
    const [scanning, setScanning] = useState(false)

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>| undefined):Promise<undefined> {
        if (typeof e !== "undefined"){
            e.preventDefault()
        }
        setScanning(false)
        setFetchingBook(true);
        if ((bookName !== "" || author !== "") && isbn !== "") {
            handleNotification('error', 'Please add a isbn, or title and author')
            return
        }
        const response = await fetch(`${api}book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-session-id": sessionId ? sessionId : "",
            },
            body: JSON.stringify({
                title: bookName,
                author: author,
                isbn: isbn,
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

    return (scanning ?
            <IsbnScan setScanning={setScanning} setIsbn={setIsbn} />
            :
                <div className="component__wrapper">
                    <div className="component__container">
                        <header>
                            <h1>Add Book</h1>
                        </header>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className={isbn ? "disabled form-element" : "form-element"}>
                                <label>Book Name:</label>
                                <input id={"book-name"} value={bookName} type={"text"} placeholder={"The Hobbit"} onChange={(e) => {
                                    setBookName(e.target.value)
                                }}></input>
                            </div>
                            <div className={isbn ? "disabled form-element" : "form-element"}>
                                <label>Book Author:</label>
                                <input id={"book-author"} value={author} type={"text"} placeholder={"J.R.R. Tolkien"} onChange={(e) => {
                                    setAuthor(e.target.value)
                                }}></input>
                            </div>
                            <div style={{height: "1px", backgroundColor: "var(--header)", width: "90%", margin: "10px 0"}}></div>
                            <div className="form-element">
                                <label>ISBN:</label>
                                <input id={"book-isbn"} value={isbn} type={"text"} placeholder={"7384698467125"} onChange={(e) => {
                                    setIsbn(e.target.value)
                                }}></input>
                            </div>
                            <div className={fetchingBook ? "buttons disabled" : "buttons"}>
                                <button>Add</button>
                                <button onClick={() => {
                                    setActiveView("bookcase")
                                }}>cancel</button>
                            </div>
                            <button className={""} title={"not implemented yet"} style={{width: "100%"}} onClick={() => {
                                setScanning(true)
                            }}>
                                <img alt={"camera icon"} src={CameraIcon}/>
                            </button>
                        </form>
                    </div>
                    {fetchingBook && <img src={BookLoader} width={64} alt={"Loading"}/>}
                </div>
    )
}
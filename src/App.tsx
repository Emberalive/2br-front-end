import './index.css'
import BookCase, {type Book} from "./components/BookCase.tsx";
import {type JSX, useEffect, useState} from "react";
import AddBook from "./components/AddBook.tsx";
import Login from "./components/Login.tsx";


export type User = {
    id: string;
    username: string;
}

export default function  App(): JSX.Element {
    const API:string = "http://localhost:2000/";
    const [activeView, setActiveView] = useState<string>("login");
    const [books, setBooks] = useState<Book[]>([]);
    const [user, setUser] = useState<object>({})
    const [sessionId, setSessionId] = useState<string | null>(localStorage.getItem("sessionId"))

    useEffect(() => {
        async function authenticateSession (sessionId: string | null): Promise<void> {
            if (!sessionId) return
            const response = await fetch(`${API}authenticate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-session-id": sessionId,
                }
            });
            if (!response.ok) return
            const resData = await response.json();
            if(!resData) return
            setActiveView("bookcase")
        }
        authenticateSession(sessionId);

    }, []);

    useEffect(() => {
        async function getBooks () {
            const url = `${API}book/getall`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "x-session-id": sessionId ? sessionId : "",
                    }
                });
                const data = await response.json();
                if (data.success && data.books.length > 0) setBooks(data.books);
            } catch (e) {
                console.error("Get books failed", e);
            }
        }
        if(sessionId === "") return
        getBooks()
    }, [])

    return (
      <main>
          {activeView === "login" && <Login setActiveView={setActiveView} setUser={setUser} api={API} setSessionId={setSessionId}/>}
          {activeView === "bookcase" &&<BookCase books={books} setActiveView={setActiveView} user={user}/>}
          {activeView === "addBook" &&<AddBook setBooks={setBooks} api={API} setActiveView={setActiveView} sessionId={sessionId}/>}
      </main>
    )
}
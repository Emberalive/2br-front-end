import './index.css'
import BookCase, {type Book} from "./components/BookCase.tsx";
import {type JSX, useEffect, useState} from "react";
import AddBook from "./components/AddBook.tsx";
import Login from "./components/Login.tsx";
import BookExpanded from "./components/BookExpanded.tsx";


export type User = {
    id: string;
    username: string;
}

export default function  App(): JSX.Element {
    const API:string = "http://localhost:2000/";
    const [activeView, setActiveView] = useState<string>("login");
    const [books, setBooks] = useState<Book[]>([]);
    const [user, setUser] = useState<User | object>({})
    const [sessionId, setSessionId] = useState<string | null>(localStorage.getItem("sessionId"))
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

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
            if(!resData.success) return
            setUser(resData.user);
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
          {selectedBook &&<BookExpanded book={selectedBook} setSelectedBook={setSelectedBook}/>}
          {!selectedBook && activeView === "login" && <Login setActiveView={setActiveView} setUser={setUser} api={API} setSessionId={setSessionId}/>}
          {!selectedBook && activeView === "bookcase" &&<BookCase books={books} setActiveView={setActiveView} user={user} setSelectedBook={setSelectedBook}/>}
          {!selectedBook && activeView === "addBook" &&<AddBook setBooks={setBooks} api={API} setActiveView={setActiveView} sessionId={sessionId}/>}
      </main>
    )
}
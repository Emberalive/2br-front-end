import './index.css'
import BookCase, {type Book} from "./components/BookCase.tsx";
import {type JSX, useEffect, useState} from "react";
import AddBook from "./components/AddBook.tsx";
import Login from "./components/Login.tsx";
import NotificationComponent from "./components/Notification.tsx";
import BookExpanded from "./components/BookExpanded.tsx";
import {nanoid} from "nanoid";
import type {NotificationType, Notification} from "./types.ts";
import placeholder1 from './assets/placeholders/cover-1.svg'
import placeholder2 from './assets/placeholders/cover-2.svg'
import placeholder3 from './assets/placeholders/cover-3.svg'
import placeholder4 from './assets/placeholders/cover-4.svg'
import placeholder5 from './assets/placeholders/cover-5.svg'

export type User = {
    id: string;
    username: string;
}

export default function  App(): JSX.Element {
    const API:string = "/api/";
    const [activeView, setActiveView] = useState<string>("login");
    const [books, setBooks] = useState<Book[]>([]);
    const [user, setUser] = useState<User | null>(null)
    const [sessionId, setSessionId] = useState<string | null>(localStorage.getItem("sessionId"))
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const placeholders = [
        placeholder1,
        placeholder2,
        placeholder3,
        placeholder4,
        placeholder5,
    ]

    const randomPlaceholder = () =>
        placeholders[Math.floor(Math.random() * placeholders.length)];

    function handleNotification(type: NotificationType, message: string): void {
        const id = nanoid();

        setNotifications(prev => [...prev, { id, type, message, active: false }]);

        // let the browser draw the element first, then start the transition
        setTimeout(() => {
            setNotifications(prev =>
                prev.map(n => (n.id === id ? { ...n, active: true } : n))
            );
        }, 10);

        setTimeout(() => {
            setNotifications(prev =>
                prev.map(n => (n.id === id ? { ...n, active: false } : n))
            );
        }, 3000);

        // remove from the DOM once the transition has finished
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 3400); // 3000ms visible + 400ms transition
    }


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

    }, [sessionId]);

    useEffect(() => {
        async function getBooks () {
            const url = `${API}book/getall/user`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "x-session-id": sessionId ? sessionId : "",
                    }
                });
                const data = await response.json();
                if (data.success && data.books.length > 0) {
                    setBooks(data.books.map((book:Book) => ({
                        ...book,
                        placeholder: randomPlaceholder(),
                    })));
                }
            } catch (e) {
                console.error("Get books failed", e);
            }
        }
        if (!sessionId) return
        getBooks()
    }, [sessionId])

    return (
      <main>
          {(selectedBook && user) && <BookExpanded book={selectedBook} setSelectedBook={setSelectedBook} api={API} handleNotification={handleNotification} sessionId={sessionId} user={user} setBooks={setBooks}/>}
          {!selectedBook && activeView === "login" && <Login setActiveView={setActiveView} setUser={setUser} api={API} setSessionId={setSessionId} handleNotification={handleNotification}/>}
          {!selectedBook && activeView === "bookcase" &&<BookCase books={books} setActiveView={setActiveView} user={user} setSelectedBook={setSelectedBook}/>}
          {!selectedBook && activeView === "addBook" &&<AddBook setBooks={setBooks} api={API} setActiveView={setActiveView} sessionId={sessionId} handleNotification={handleNotification} randomPlaceholder={randomPlaceholder}/>}
          <NotificationComponent notifications={notifications}/>
      </main>
    )
}
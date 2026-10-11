import './index.css'
import BookCase, {type Book} from "./components/BookCase.tsx";
import {type JSX, useEffect, useState} from "react";
import AddBook from "./components/AddBook.tsx";

export default function  App(): JSX.Element {
    const API:string = "http://localhost:2000/";
    const [activeView, setActiveView] = useState<string>("bookcase");
    const [books, setBooks] = useState<Book[]>([]);


    useEffect(() => {
        async function getBooks () {
            const url = `${API}book/getall`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                });
                const data = await response.json();
                if (data.success && data.books.length > 0) setBooks(data.books);
            } catch (e) {
                console.error("Get books failed", e);
            }
        }
        getBooks()
    }, [])

    return (
      <main>
          {activeView === "bookcase" &&<BookCase books={books} setActiveView={setActiveView} />}
          {activeView === "addBook" &&<AddBook setBooks={setBooks} api={API} setActiveView={setActiveView} />}
      </main>
    )
}
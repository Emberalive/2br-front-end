import './index.css'
import BookCase, {type Book} from "./components/BookCase.tsx";
import {type JSX, useState} from "react";
import AddBook from "./components/AddBook.tsx";

export default function  App(): JSX.Element {
    const API:string = "http://localhost:2000/";
    const [activeView, setActiveView] = useState<string>("bookcase");
    const [books, setBooks] = useState<Book[]>([]);

    return (
      <main>
          {activeView === "bookcase" &&<BookCase books={books} setActiveView={setActiveView} />}
          {activeView === "addBook" &&<AddBook setBooks={setBooks} api={API} setActiveView={setActiveView} />}
      </main>
    )
}
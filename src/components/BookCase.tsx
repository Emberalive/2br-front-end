import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import Shelf from './Shelf.tsx'
import '../bookCase.css'
import type {User} from "../App.tsx";

export type Book = {
    id: string;
    authors: string[];
    cover: string;
    title: string;
}

type BookCaseProps = {
    books: Book[];
    setActiveView: (activeView:string) => void;
    user: User | null
    setSelectedBook: Dispatch<SetStateAction<Book | null>>
}

export default function BookCase({books, setActiveView, user, setSelectedBook}:BookCaseProps) {
    const [viewPort, setViewPort ] = useState<number>(window.innerWidth);

    const windowWidth = window.innerWidth

    useEffect(() => {
        const handleResize = () => {
            setViewPort(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [windowWidth])

    const BOOKS_PER_SHELF:number = viewPort > 1200 ? 7 : viewPort < 900 ? viewPort < 625 ? 4 : 3 : 5;
    const MIN_SHELVES = 8; // keeps the bookcase looking full when there are few books

    function chunk(arr:Book[], size:number) {
        const out = [];
        for (let i = 0; i < arr.length; i += size) {
            out.push(arr.slice(i, i + size));
        }
        return out;
    }

    const shelves = chunk(books, BOOKS_PER_SHELF);
    while (shelves.length < MIN_SHELVES) shelves.push([]);
    if (!user) {
        return
    }
    return (
        <>
            <div className="bookCase">
                <div className="back"></div>
                <div className="header">
                    <p>{user.username}'s Library</p>
                    <div className="menu">
                        <button>Profile</button>
                        <button className={"add"} onClick={() => {
                            setActiveView("addBook")
                        }}>+</button>
                    </div>

                </div>
                <div className="left-side side"></div>
                <div className="right-side side"></div>

                {shelves.map((shelfBooks, i) => (
                    <Shelf key={i} books={shelfBooks} setSelectedBook={setSelectedBook}/>
                ))}
            </div>
        </>
    );
}

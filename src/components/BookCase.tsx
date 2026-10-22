import {type Dispatch, type SetStateAction, useEffect, useMemo, useState} from "react";
import Shelf from './Shelf.tsx'
import '../bookCase.css'
import type {User} from "../App.tsx";
import HeaderIngraving from "../assets/floral-header.svg"
import * as React from "react";
import BunnyEarCactus from '../assets/plants/bunny-ear-cactus.svg'
import Echeveria from '../assets/plants/echeveria.svg'
import Fern from '../assets/plants/fern.svg'
import Monstera from '../assets/plants/monstera-cutting.svg'
import Snake from '../assets/plants/snake-plant.svg'
import Cactus from '../assets/plants/teacup-cactus.svg'
import Pilea from '../assets/plants/pilea.svg'
import Bonsai from '../assets/plants/jade-bonsai.svg'


export type Book = {
    id: string;
    authors: string[];
    cover: string;
    title: string;
    leant: boolean;
    leant_to: string;
    finished: boolean;
    placeholder: string;
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
    const [BOOKS_PER_SHELF, setBooksPerShelf] = React.useState<number>(0)

    const plants = [
        BunnyEarCactus,
        Echeveria,
        Fern,
        Monstera,
        Snake,
        Cactus,
        Pilea,
        Bonsai
    ]

    function randomPlant ():string {
        return plants[Math.floor(Math.random() * plants.length)];
    }

    useEffect(() => {
        const handleResize = () => {
            setViewPort(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [windowWidth])

    // const BOOKS_PER_SHELF:number = viewPort > 1200 ? 8 : viewPort < 900 ? viewPort < 625 ? viewPort < 500 ? 3 : 4 : 3 : 6;
    function booksPerShelf(width: number): number {
        switch (true) {
            case width < 475: return 3;
            case width < 600: return 4;
            case width < 625: return 3;
            case width < 750: return 3;
            case width < 850: return 4;
            case width < 1000: return 5;
            case width < 1200: return 6;
            case width <= 1400: return 7; // you didn't have a value for 1200 to 1400; pick one
            default: return 8;
        }
    }

    useEffect(() => {
        function handleBooksPerShelf() {
            setBooksPerShelf(booksPerShelf(viewPort))
        }
        handleBooksPerShelf()
    }, [viewPort]);

    const MIN_SHELVES = 6; // keeps the bookcase looking full when there are few books

    function shuffle<T>(items: T[]): T[] {
        const a = [...items];
        for (let i = a.length; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a
    }


    function chunk(arr:Book[], size:number):{books: Book[], plant: string | undefined}[] {
        let bag:string[] = []
        const out = [];
        let i
        for (i = 0; i < arr.length;) {
            let plant: string | undefined = undefined;
            if (Math.random() > 0.4) {
                if (bag.length === 0) bag = shuffle(plants)
                plant = bag.pop()
            }
            const n = plant ? size - 1 : size
            out.push({ books: arr.slice(i, i + n), plant });
            i += n
        }
        return out;
    }

    const shelves = useMemo(() => chunk(books, BOOKS_PER_SHELF ), [books, BOOKS_PER_SHELF]);
    while (shelves.length < MIN_SHELVES) shelves.push({books: new Array(BOOKS_PER_SHELF), plant: Math.random() < 0.4 ? randomPlant() : undefined});
    if (!user) {
        return
    }
    return (
        <>
            <div className="bookCase">
                <div className="back"></div>
                    <div   style={{ '--engraving': `url(${HeaderIngraving})` } as React.CSSProperties}
                        className="header">
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

                {shelves.map((shelfBooks, i) => {
                    return <Shelf key={i} shelfDetails={shelfBooks} setSelectedBook={setSelectedBook} booksPerShelf={BOOKS_PER_SHELF}/>
                })

                }
            </div>
        </>
    );
}

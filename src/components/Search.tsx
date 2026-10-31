import SearchIcon from "../assets/icons/search.svg"
import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import Select, {type SingleValue} from "react-select";
import type {Book} from "./BookCase.tsx";

type Option = { value: string; label: string };

type SearchTypes ={
    books: Book[];
    setFilteredBooks: Dispatch<SetStateAction<Book[]>>
}

export default function Search ({books, setFilteredBooks}: SearchTypes) {
    const [isOpen, setIsOpen] = useState(false);
    const options: Option[] = [
        { value: "author", label: "Author" },
        { value: "title", label: "Book-Title" },
    ];
    const [searchValue, setSearchValue] = useState<string>("");
    const [selected, setSelected] = useState<SingleValue<Option>>(options[0]);

    useEffect(() => {
        if(!isOpen || searchValue === "") {
            setFilteredBooks(books);
        }
    }, [isOpen, searchValue]);

    function handleSearch () {
        console.log("SELECTED VALUE:", selected)
        if (selected?.value === "title") {
            setFilteredBooks( books.filter((book) => {
                return book.title.toLowerCase().includes(searchValue.toLowerCase());
            }))
        } else if (selected?.value === "author") {
            setFilteredBooks(books.filter(book =>
                book.author.some(a => a.toLowerCase().includes(searchValue.toLowerCase()))
            ));
        }
    }

    return(
            <div className={`search-bar ${isOpen ? "open" : ""}`}>
                <div className="search-bar__container">
                    <Select<Option>
                        value={selected}
                        isSearchable={false}
                        className="search-select"          // outer container: this gets the transition
                        classNamePrefix="search"           // inner parts become .search__control, .search__menu, etc.
                        unstyled                           // strips the default look so your CSS doesn't fight it
                        options={options}
                        placeholder="search..."
                        menuPortalTarget={document.body}   // renders the menu outside the bar (see below)\
                        onChange={opt => setSelected(opt)}
                    />
                    <input type={"text"} value={searchValue} placeholder={"search..."} onChange={e => {
                        setSearchValue(e.target.value)
                        handleSearch()
                    }} />
                </div>

                <img className={"search-icon"} src={SearchIcon} alt={"search icon"} onClick={()=>setIsOpen((prev) => !prev)}/>
            </div>
        )
}
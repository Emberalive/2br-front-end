import SearchIcon from "../assets/icons/search.svg"
import {useState} from "react";
import Select, {type SingleValue} from "react-select";

type Option = { value: string; label: string };

export default function Search () {
    const [isOpen, setIsOpen] = useState(false);
    const options: Option[] = [
        { value: "author", label: "Author" },
        { value: "title", label: "Book-Title" },
    ];
    const [selected, setSelected] = useState<SingleValue<Option>>(options[0]);

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
                    <input type={"text"} placeholder={"search..."}/>
                </div>

                <img className={"search-icon"} src={SearchIcon} alt={"search icon"} onClick={()=>setIsOpen((prev) => !prev)}/>
            </div>
        )
}
import SearchIcon from "../assets/icons/search.svg"
import {useState} from "react";

export default function Search () {
    const [isOpen, setIsOpen] = useState(false);
    return(
            <div className={`search-bar ${isOpen ? "open" : ""}`}>
                <input type={"text"} placeholder={"search..."}/>
                <img className={"search-icon"} src={SearchIcon} alt={"search icon"} onClick={()=>setIsOpen((prev) => !prev)}/>
            </div>
        )
}
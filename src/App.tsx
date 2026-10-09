import './index.css'
import BookCase, {type Book} from "./components/BookCase.tsx";
import {type JSX} from "react";

export default function  App(): JSX.Element {
    const books:Book[] = [
        { id: 1,  title: "The Hobbit",                         author: "J.R.R. Tolkien",        year: 1937, genre: "Fantasy",         colour: "#7a3e2b" },
        { id: 2,  title: "Nineteen Eighty-Four",               author: "George Orwell",         year: 1949, genre: "Dystopian",       colour: "#2f3e46" },
        { id: 3,  title: "Pride and Prejudice",                author: "Jane Austen",           year: 1813, genre: "Romance",         colour: "#9c6644" },
        { id: 4,  title: "Dune",                               author: "Frank Herbert",         year: 1965, genre: "Science Fiction", colour: "#c08552" },
        { id: 5,  title: "The Name of the Wind",               author: "Patrick Rothfuss",      year: 2007, genre: "Fantasy",         colour: "#5e503f" },
        { id: 6,  title: "Brave New World",                    author: "Aldous Huxley",         year: 1932, genre: "Dystopian",       colour: "#355070" },
        { id: 7,  title: "To Kill a Mockingbird",              author: "Harper Lee",            year: 1960, genre: "Literary Fiction",colour: "#6d597a" },
        { id: 8,  title: "The Martian",                        author: "Andy Weir",             year: 2011, genre: "Science Fiction", colour: "#b56576" },
        { id: 9,  title: "Jane Eyre",                          author: "Charlotte Brontë",      year: 1847, genre: "Gothic",          colour: "#4a4e69" },
        { id: 10, title: "The Hitchhiker's Guide to the Galaxy",author: "Douglas Adams",        year: 1979, genre: "Comedy Sci-Fi",   colour: "#e09f3e" },
        { id: 11, title: "Mistborn: The Final Empire",         author: "Brandon Sanderson",     year: 2006, genre: "Fantasy",         colour: "#540b0e" },
        { id: 12, title: "Frankenstein",                       author: "Mary Shelley",          year: 1818, genre: "Gothic",          colour: "#335c67" },
        { id: 13, title: "The Great Gatsby",                   author: "F. Scott Fitzgerald",   year: 1925, genre: "Literary Fiction",colour: "#9e2a2b" },
        { id: 14, title: "Project Hail Mary",                  author: "Andy Weir",             year: 2021, genre: "Science Fiction", colour: "#2a9d8f" },
        { id: 15, title: "Good Omens",                         author: "Terry Pratchett & Neil Gaiman", year: 1990, genre: "Comedy Fantasy", colour: "#264653" },
        { id: 16, title: "The Count of Monte Cristo",          author: "Alexandre Dumas",       year: 1844, genre: "Adventure",       colour: "#8a5a44" },
        { id: 17, title: "Neuromancer",                        author: "William Gibson",        year: 1984, genre: "Cyberpunk",       colour: "#1d3557" },
        { id: 18, title: "Wuthering Heights",                  author: "Emily Brontë",          year: 1847, genre: "Gothic",          colour: "#6b705c" },
        { id: 19, title: "The Lies of Locke Lamora",           author: "Scott Lynch",           year: 2006, genre: "Fantasy",         colour: "#a44a3f" },
        { id: 20, title: "Small Gods",                         author: "Terry Pratchett",       year: 1992, genre: "Comedy Fantasy",  colour: "#457b9d" },
        { id: 21, title: "Fahrenheit 451",                     author: "Ray Bradbury",          year: 1953, genre: "Dystopian",       colour: "#bc4749" },
        { id: 22, title: "The Left Hand of Darkness",          author: "Ursula K. Le Guin",     year: 1969, genre: "Science Fiction", colour: "#3d405b" },
        { id: 23, title: "Dracula",                            author: "Bram Stoker",           year: 1897, genre: "Gothic",          colour: "#370617" },
        { id: 24, title: "The Way of Kings",                   author: "Brandon Sanderson",     year: 2010, genre: "Fantasy",         colour: "#386641" },
        { id: 25, title: "Of Mice and Men",                    author: "John Steinbeck",        year: 1937, genre: "Literary Fiction",colour: "#7f5539" },
    ];
  return (
      <BookCase books={books}/>
  )
}
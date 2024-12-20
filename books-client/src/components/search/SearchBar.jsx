import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("title");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchChange = async (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);

    if (newValue.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/api/books/searchby${searchType}/${newValue}`
      );

      const results = response.data || [];

      // Filter unique values based on the search type
      const uniqueResults = results.filter(
        (item, index, self) =>
          index ===
          self.findIndex((t) =>
            searchType === "title"
              ? t.title === item.title
              : searchType === "author"
              ? t.name === item.name // Assuming `name` is the author field
              : t.genre === item.genre
          )
      );

      setSearchResults(uniqueResults);
    } catch (error) {
      console.error(`Error searching by ${searchType}: ${error}`);
      setSearchResults([]);
    }
  };

  const handleSearchClick = async () => {
    if (searchValue === "") return;
    if (searchType === "title") navigate(`/searchbytitle/${searchValue}`);
    else if (searchType === "genre") navigate(`/searchbygenre/${searchValue}`);
  };

  const handleResultClick = (value) => {
    setSearchValue(value);
    setSearchResults([]); // Clear the results after selection
  };

  return (
    <div className="search relative">
      <div className="flex items-center">
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="p-2 rounded-md"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
        </select>
        <input
          type="text"
          value={searchValue}
          placeholder="Search"
          onChange={handleSearchChange}
          className="p-2 ml-2 rounded-md flex-1"
        />
        <button
          onClick={handleSearchClick}
          className="p-2 ml-2 bg-slate-800 text-cyan-500 rounded-md hover:bg-cyan-500 hover:text-slate-800 transition-all duration-200"
        >
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="absolute bg-white text-black mt-2 w-full border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((result) => (
            <div
              key={
                searchType === "title"
                  ? result.title
                  : searchType === "author"
                  ? result.name // Assuming `name` is the author field
                  : result.genre
              }
              className="p-2 hover:bg-slate-200 cursor-pointer"
              onClick={() => handleResultClick(
                searchType === "title"
                  ? result.title
                  : searchType === "author"
                  ? result.name
                  : result.genre
              )}
            >
              {searchType === "title"
                ? result.title
                : searchType === "author"
                ? result.name
                : result.genre}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

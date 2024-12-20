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
      if (searchType === "author") {
        // If searching by author, update searchResults with user names (authors)
        setSearchResults(response.data || []);
      } else {
        // For title and genre, update the results as usual
        setSearchResults(response.data || []);
      }
    } catch (error) {
      console.error(`Error searching by ${searchType}: ${error}`);
      setSearchResults([]);
    }
  };

  const handleSearchClick = async () => {
    console.log("search clicked")
    if(searchValue==''){return}
    if(searchType=='title'){navigate(`/searchbytitle/${searchValue}`)}
    else if(searchType=='genre'){navigate(`/searchbygenre/${searchValue}`)}

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
              key={result._id}
              className="p-2 hover:bg-slate-200 cursor-pointer"
              onClick={() => handleResultClick(
                searchType === "title"
                  ? result.title
                  : searchType === "author"
                  ? result.name // Assuming `name` is the author field in userModel
                  : result.genre
              )}
            >
              {searchType === "title"
                ? result.title
                : searchType === "author"
                ? result.name // Displaying author's name
                : result.genre}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

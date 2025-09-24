import type { SetStateAction } from "react";
import {FaSearch} from "react-icons/fa"
type search = {
  search:string;
  setSearch: React.Dispatch<SetStateAction<string>>;
}

const Search: React.FC<search> = ({search, setSearch}) => {
  return (
  <>
    <div className="searchbar flex items-center">
        <FaSearch className="searchbar_icon"/>
        <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for movies"
        className="searchbar_input"
        />
    </div>
  </> 
  )
}

export default Search

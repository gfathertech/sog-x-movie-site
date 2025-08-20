import {FaSearch} from "react-icons/fa"


const Search = ({search, setSearch}) => {
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

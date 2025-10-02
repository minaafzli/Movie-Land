import search_icon from "../image/Search_icon.svg";

function SearchBar({ onSearch }) {
  return (
    <div className="flex relative items-center justify-center w-[500px]">
      <input
        type="text"
        className="bg-bgGray placeholder-muted text-accent mx-4 p-4 rounded-2xl w-full border-border"
        placeholder="Search Movie"
        onChange={(e) => onSearch(e.target.value)}
      />
      <img src={search_icon} className="absolute right-8 cursor-pointer" />
    </div>
  );
}

export default SearchBar;

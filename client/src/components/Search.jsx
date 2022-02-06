import React, { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          placeholder="Search..."
          className="bg-black px-4 py-2 rounded-lg w-full font-normal text-base text-slate-300 outline-none"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </form>
    </div>
  );
}

export default Search;

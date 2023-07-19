import { useState } from "react";
import SearchIcon from "@/assets/icons/searchIcon.svg";
import Image from "next/image";

interface Props {
  placeholder: string;
  onChange: (value: string) => void;
}

function SearchBar(props: Props) {
  const { placeholder, onChange } = props;
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSearch = e.target.value;
    setSearch(updatedSearch);
    onChange(updatedSearch);
  };

  return (
    <div>
      <span className="flex gap-2 px-4 py-2.5 bg-input rounded-xl">
        <Image src={SearchIcon} alt="Search icon" className="w-6" />
        <input
          className="w-22 rounded-md focus:outline-none bg-transparent placeholder-gray text-input-text font-medium"
          type="text"
          name="text"
          placeholder={placeholder}
          aria-label={placeholder}
          value={search}
          onChange={handleSearch}
        />
      </span>
    </div>
  );
}

export default SearchBar;

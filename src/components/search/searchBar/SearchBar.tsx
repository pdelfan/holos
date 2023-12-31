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
    setSearch(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div>
      <span className="flex gap-2 px-4 py-2.5 bg-input rounded-xl dark:bg-neutral-800">
        <Image
          src={SearchIcon}
          alt="Search icon"
          height={20}
          className="w-auto"
        />
        <input
          className="w-full rounded-md outline-none bg-transparent placeholder-input-placeholder text-input-text font-medium dark:text-neutral-300"
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

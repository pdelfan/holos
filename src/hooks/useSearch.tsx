import { useState } from "react";

export default function useSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return { searchTerm, handleSearch };
}

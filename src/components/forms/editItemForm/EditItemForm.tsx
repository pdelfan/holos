import useOutsideSelect from "@/hooks/useOutsideSelect";
import {
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import FormSelect from "../formSelect/FormSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import toast from "react-hot-toast";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";

interface Props {
  onClose: () => void;
  groupID: number;
  onAddItem: (item: SetStateAction<[] | PackItem[]>) => void;
}

export default function EditItemForm(props: Props) {
  const { onClose, onAddItem, groupID } = props;
  const supabase = createClientComponentClient<Database>();
  const ref = useOutsideSelect({ callback: () => onClose() });

  const [search, setSearch] = useState("");
  const [type, setType] = useState("General");
  const [quantity, setQuantity] = useState(1);
  const debouncedSearch = useDebounce({ value: search, delay: 750 });
  const [searchResults, setSearchResults] = useState<
    [] | InventoryItem[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const searchInventory = useCallback(
    async (query: string) => {
      if (query.trim() === "") return;
      setIsLoading(true);

      // format query if there's more than one term
      if (query.trim().split(" ").length > 1) {
        query = query.trim().replace(/\s+/g, " ").split(" ").join(" | ");
      }

      const { data, error } = await supabase
        .from("inventory")
        .select()
        .textSearch("title", query);

      if (error) {
        toast.error("Couldn't search inventory.");
        setIsLoading(false);
        return;
      }

      setSearchResults(data);
      setIsLoading(false);
    },
    [supabase]
  );

  useEffect(() => {
    searchInventory(debouncedSearch);
  }, [debouncedSearch, searchInventory]);

  const onAdd = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session || !selectedItem) {
      onClose();
      return;
    }

    const { data, error } = await supabase
      .from("pack_item")
      .insert([
        {
          position: 0,
          quantity: quantity,
          group_id: groupID,
          inventory_id: selectedItem?.id,
          type: type,
        },
      ])
      .select();

    if (error) {
      toast.error("Couldn't add item to group.");
      return;
    }

    onAddItem((prev) => [
      ...prev,
      {
        ...data[0],
        inventory: selectedItem,
      },
    ]);
    
    toast.success("Added item to group.");
    onClose();
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[70vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200"
    >
      <form onSubmit={onAdd} className="gap-y-8 flex flex-col">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-auto">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Search
            </label>
            <input
              autoFocus
              maxLength={80}
              type="text"
              placeholder="Search inventory for an item"
              aria-label="Item title"
              className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {isLoading && search.trim().length > 0 && (
              <ul className="absolute flex flex-col gap-4 bg-white border p-3 mt-1 rounded-xl shadow-lg">
                <li>Loading...</li>
              </ul>
            )}
            {!isLoading &&
              search.trim().length > 0 &&
              searchResults?.length === 0 && (
                <ul className="absolute flex flex-col gap-4 bg-white border p-3 mt-1 rounded-xl shadow-lg">
                  <li>No results found</li>
                </ul>
              )}
            {!isLoading &&
              search.trim().length > 0 &&
              searchResults &&
              searchResults.length > 0 && (
                <ul className="absolute flex flex-col gap-1 bg-white border p-1 mt-1 rounded-xl shadow-lg">
                  {searchResults?.map((item) => (
                    <li
                      className="rounded-lg hover:bg-button-hover  m-1"
                      key={item.id}
                    >
                      <button
                        className="flex items-center gap-2 p-2"
                        onClick={() => {
                          setSelectedItem(item);
                          setSearch("");
                        }}
                      >
                        {item.image_url && (
                          <Image
                            className="bg-white border p-1 rounded-lg"
                            src={item.image_url}
                            alt="Item image"
                            width={30}
                            height={30}
                          />
                        )}
                        <span className="text-left">{item.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>

        {selectedItem && (
          <div>
            <p className="text-md font-medium text-gray-900 dark:text-white">
              Selected Item
            </p>
            <div className="flex  flex-wrap items-center gap-2 mt-1">
              {selectedItem.image_url && (
                <Image
                  className="bg-white border p-1 rounded-lg"
                  src={selectedItem.image_url}
                  alt="Item image"
                  width={40}
                  height={40}
                />
              )}
              {selectedItem.title}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <div className="flex-1">
            <FormSelect
              label="Type"
              options={["General", "Wearable", "Consumable"]}
              onChange={setType}
            />
          </div>
          <div className="flex-1">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Quantity
            </label>
            <input
              required
              type="number"
              step="1"
              placeholder="0"
              aria-label="Item quantity"
              className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-50 text-zinc-500 text-sm font-medium px-4 py-2 border hover:bg-zinc-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-zinc-600 text-gray-100 text-sm font-medium px-4 py-2 border hover:bg-zinc-700"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

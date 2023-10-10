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
import Button from "@/components/actions/button/Button";
import Input from "@/components/inputs/Input/Input";
import Label from "@/components/inputs/label/Label";

interface Props {
  onClose: () => void;
  groupID: number;
  onAddItem: (item: SetStateAction<[] | GroupData[] | null>) => void;
  newPosition: number;
}

export default function ItemForm(props: Props) {
  const { onClose, onAddItem, groupID, newPosition } = props;
  const supabase = createClientComponentClient<Database>();
  const ref = useOutsideSelect({ callback: () => onClose() });
  const [loading, setLoading] = useState(false);
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

      const { data, error } = await supabase
        .from("inventory")
        .select()
        .limit(15)
        .ilike("title", `%${query}%`);

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

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("pack_item")
        .insert([
          {
            position: newPosition,
            quantity: quantity,
            group_id: groupID,
            inventory_id: selectedItem?.id,
            type: type,
          },
        ])
        .select(
          "*, inventory ( id, title, description, image_url, url, price, weight, weight_unit )"
        );

      if (error) {
        toast.error("Couldn't add item to group.");
        return;
      }

      onAddItem((prev) => {
        if (!prev) return prev;
        const group = prev.find((group) => group.id === groupID);
        if (!group || !data) return prev;
        return [
          ...prev.filter((group) => group.id !== groupID),
          {
            ...group,
            pack_item: [
              ...group.pack_item,
              { ...data[0], inventory: selectedItem },
            ],
          },
        ];
      });

      toast.success("Added item to group.");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[70vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border-2 border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200 dark:bg-neutral-700 dark:border-neutral-600"
    >
      <form onSubmit={onAdd} className="gap-y-8 flex flex-col">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-auto">
            <Label>Search</Label>
            <Input
              autoFocus
              maxLength={80}
              type="text"
              placeholder="Search inventory for an item"
              aria-label="Item title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {isLoading && search.trim().length > 0 && (
              <ul className="absolute flex flex-col gap-4 bg-white border p-3 mt-1 rounded-xl shadow-lg dark:bg-neutral-700 dark:border-neutral-500 dark:text-neutral-200">
                <li>Loading...</li>
              </ul>
            )}
            {!isLoading &&
              search.trim().length > 0 &&
              searchResults?.length === 0 && (
                <ul className="absolute flex flex-col gap-4 bg-white border p-3 mt-1 rounded-xl shadow-lg dark:bg-neutral-700 dark:border-neutral-500 dark:text-neutral-200">
                  <li>No results found</li>
                </ul>
              )}
            {!isLoading &&
              search.trim().length > 0 &&
              searchResults &&
              searchResults.length > 0 && (
                <ul className="absolute flex flex-col gap-1 bg-white border mt-1 rounded-xl shadow-lg max-h-40 overflow-auto dark:bg-neutral-700 dark:border-neutral-500 dark:text-neutral-200">
                  {searchResults?.map((item) => (
                    <li
                      className="rounded-lg hover:bg-button-hover m-1 dark:hover:bg-neutral-800"
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
                            className="bg-white border p-1 rounded-lg dark:border-neutral-400"
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
            <Label>Selected Item</Label>
            <div className="flex flex-col justify-center flex-wrap items-center gap-2 mt-1">
              {selectedItem.image_url && (
                <Image
                  className="bg-white border p-1 rounded-lg"
                  src={selectedItem.image_url}
                  alt="Item image"
                  width={40}
                  height={40}
                />
              )}
              <span className="dark:text-neutral-200">
                {selectedItem.title}
              </span>
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
            <Label>Quantity</Label>
            <Input
              required
              type="number"
              step="1"
              placeholder="0"
              aria-label="Item quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-end">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading ? true : selectedItem ? false : true}
            bgColor="bg-zinc-600 dark:bg-zinc-800"
            textColor="text-gray-100"
            aria-disabled={loading}
          >
            {loading ? "Adding Item..." : "Add Item"}
          </Button>
        </div>
      </form>
    </div>
  );
}

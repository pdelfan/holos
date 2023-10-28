"use client";

import WishlistCard from "@/components/contentDisplay/wishlistCard/WishlistCard";
import WishlistGridSkeleton from "./WishListGridSkeleton";
import { useAtom } from "jotai";
import { wishlistAtom } from "@/store/store";
import { sortWishlist } from "@/utils/filterUtils";
import useFetchDB from "@/hooks/useFetchDB";
import Pagination from "@/components/navigational/pagination/Pagination";
import Result from "../result/Result";
import { useState } from "react";
import Modal from "@/components/feedback/modal/Modal";
import EditWishlistForm from "@/components/forms/editWishlistForm/EditWishlistForm";
import { deleteWishlistItem } from "@/utils/api/wishlistAPI";

interface Props {
  search: string;
  viewFilter: SelectOption;
  sortFilter: SelectOption;
}

export default function WishlistGrid(props: Props) {
  const { search, viewFilter, sortFilter } = props;
  const [showModal, setShowModal] = useState(false);
  const [currentWishlistItem, setCurrentWishlistItem] =
    useState<WishlistItem | null>(null);
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const {
    pageIndex,
    setPageIndex,
    totalPages,
    error,
    isLoading,
    isValidating,
  } = useFetchDB({
    table: "wishlist",
    setData: setWishlist,
  });

  const onDeleteWishlistItem = async (id: number) => {
    deleteWishlistItem(id);
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <>
      {isLoading || isValidating ? (
        <WishlistGridSkeleton />
      ) : (
        <>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 mt-10 animate-fade">
            {wishlist &&
              sortWishlist(wishlist, sortFilter.text)
                .filter(
                  (item) =>
                    item.url.includes(search) ||
                    item?.title?.includes(search) ||
                    item?.title?.toLocaleLowerCase().includes(search)
                )
                .map((item) => (
                  <WishlistCard
                    key={item.id}
                    item={item}
                    viewMode={viewFilter.text}
                    onEdit={() => {
                      setCurrentWishlistItem(item);
                      setShowModal(true);
                    }}
                  />
                ))}
          </section>
          {wishlist.length === 0 && (
            <Result status="info">No wishlist items found</Result>
          )}
          {error && (
            <Result status="error">Could not get wishlist items</Result>
          )}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              pageIndex={pageIndex}
              onChange={setPageIndex}
            />
          )}
        </>
      )}
      {showModal && currentWishlistItem && (
        <Modal>
          <EditWishlistForm
            wishlistItem={currentWishlistItem}
            onDelete={() => onDeleteWishlistItem(currentWishlistItem.id)}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

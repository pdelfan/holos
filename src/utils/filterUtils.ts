export const sortWishlist = (wishlist: WishlistItem[], sortMode: string) =>
  [...wishlist].sort((a, b) => {
    if (sortMode === "By Date ↓") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    if (sortMode === "By Date ↑") {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    if (sortMode === "By Name ↓") {
      return a.url.localeCompare(b.url);
    }
    if (sortMode === "By Name ↑") {
      return b.url.localeCompare(a.url);
    }
    return 0;
  });

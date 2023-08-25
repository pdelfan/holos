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

export const sortInventory = (inventory: InventoryItem[], sortMode: string) =>
  [...inventory].sort((a, b) => {
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
      return a.title.localeCompare(b.title);
    }
    if (sortMode === "By Name ↑") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

export const sortTrips = (wishlist: TripItem[], sortMode: string) =>
  [...wishlist].sort((a, b) => {
    if (sortMode === "By Date ↓") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortMode === "By Date ↑") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }

    if (sortMode === "By Name ↓") {
      return a.title.localeCompare(b.title);
    }
    if (sortMode === "By Name ↑") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

export const sortPacks = (pack: Pack[], sortMode: string) =>
  [...pack].sort((a, b) => {
    if (sortMode === "By Date ↓") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (sortMode === "By Date ↑") {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }

    if (sortMode === "By Name ↓") {
      return a.title.localeCompare(b.title);
    }
    if (sortMode === "By Name ↑") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

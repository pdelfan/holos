import { mutate } from "swr";

export const updateTripData = () => mutate("getTrips");

export const updateWishlistData = () => mutate("getWishlist");

export const updateIventoryData = () => mutate("getInventory");
import { mutate } from "swr";

export const updateTripData = () => mutate("getTrips");

export const updateWishlistData = () => mutate("getWishlist");

export const updateIventoryData = () => mutate("getInventory");

export const updatePackData = () => mutate("getPacks");

export const updateGroupData = () => mutate("getGroups");
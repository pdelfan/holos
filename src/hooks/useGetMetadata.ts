import useSWR from "swr";
import { getSiteMetadata } from "@/utils/linkUtils";

interface Props {
  wishlistItem: WishlistItem;
}

export default function useGetMetadata(props: Props) {
  const { wishlistItem } = props;
  const url = wishlistItem.url;
  const { data, error, isLoading, isValidating } = useSWR(url, async (url) => {
    const data: Metadata = await getSiteMetadata(url);
    return data;
  });

  return { data, error, isLoading, isValidating };
}

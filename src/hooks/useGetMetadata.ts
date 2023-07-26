import useSWR from "swr";
import { getSiteMetadata } from "@/utils/linkUtils";

interface Props {
  url: string;
}

export default function useGetMetadata(props: Props) {
  const { url } = props;
  const { data, error, isLoading, isValidating } = useSWR(url, async (url) => {
    const data: Metadata = await getSiteMetadata(url);
    return data;
  });

  return { data, error, isLoading, isValidating };
}

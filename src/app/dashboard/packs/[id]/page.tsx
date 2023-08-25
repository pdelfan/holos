"use client";
import PackSummary from "@/components/contentDisplay/packSummary/PackSummary";
import useGetPack from "@/hooks/useGetPack";
import useGetPreferredCurrency from "@/hooks/useGetPreferredCurrency";

interface Props {
  params: { id: string };
}

export default function Pack(props: Props) {
  const { params } = props;
  const { pack, setPack, error, isLoading, isValidating } = useGetPack({
    packID: params.id,
  });
  const { currency } = useGetPreferredCurrency();

  return (
    <>
      {pack && (
        <>
          <h1 className="text-3xl font-semibold text-header-1">{pack.title}</h1>
          <h2 className="font-medium text-header-2 mt-1 max-w-2xl">
            {pack.description}
          </h2>
          <section className="mt-8 flex">
            <PackSummary data={{ ...pack, currency }} />
          </section>
        </>
      )}
    </>
  );
}

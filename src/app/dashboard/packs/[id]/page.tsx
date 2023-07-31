"use client";

interface Props {
  params: { id: string };
}

export default function Pack(props: Props) {
  const { params } = props;
  return (
    <>
      <h1 className="text-3xl font-semibold text-header-1">Pack</h1>
      <h2 className="text-header-2">{params.id}</h2>
    </>
  );
}

import PackSummary from "../packSummary/PackSummary";

interface Props {
  title: string;
  description: string;
  packSummary: PackSummary;
}

function PackCard(props: Props) {
  const { title, description, packSummary } = props;

  return (
    <article className="inline-flex flex-wrap flex-col bg-white rounded-2xl border-2 p-5">
      <div className="mb-6">
        <h2 className="text-stone-600 font-medium">{title}</h2>
        <h3 className="break-words overflow-clip text-stone-400">
          {description}
        </h3>
      </div>
      <PackSummary />
    </article>
  );
}

export default PackCard;

interface Props {
  image?: string;
  title: string;
  date: Date;
  baseWeight: number;
  consumables: number;
  worn: number;
  totalWeight: number;
}

function TripCard(props: Props) {
  const { image, title, date, baseWeight, consumables, worn, totalWeight } =
    props;

  const bgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0), rgba(0, 0, 0, 0.9)), url(${image})`,
    backgroundSize: "cover",
  };

  const selectedStyle = image ? "grayscale hover:grayscale-0" : "bg-black";

  return (
    <article
      className={`flex flex-col justify-between rounded-2xl p-5 max-w-lg ${selectedStyle}`}
      style={bgStyle}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl text-white font-semibold">{title}</h2>
        <h3 className="text-xl text-white font-semibold">
          {date.getFullYear()}
        </h3>
      </div>
      <ul className="flex flex-wrap justify-between gap-3 mt-20">
        <li className="flex flex-col">
          <span className="text-white text-lg font-medium">{baseWeight}</span>
          <span className="text-stone-300">Base weight</span>
        </li>
        <li className="flex flex-col">
          <span className="text-white text-lg font-medium">{consumables}</span>
          <span className="text-stone-300">Consumables</span>
        </li>
        <li className="flex flex-col">
          <span className="text-white text-lg font-medium">{worn}</span>
          <span className="text-stone-300">Worn</span>
        </li>
        <li className="flex flex-col">
          <span className="text-white text-lg font-medium">{totalWeight}</span>
          <span className="text-stone-300">Total weight</span>
        </li>
      </ul>
    </article>
  );
}

export default TripCard;

interface Props {
  title: string;
}

function Tag(props: Props) {
  const { title } = props;

  return (
    <div className="px-2.5 py-1 text-xs text-stone-600 font-medium bg-lime-300 border-lime-500 border rounded-full">
      {title}
    </div>
  );
}

export default Tag;

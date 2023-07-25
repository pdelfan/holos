interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export default function DropdownButton(props: Props) {
  const { onClick, children } = props;
  return <button onClick={onClick}>{children}</button>;
}

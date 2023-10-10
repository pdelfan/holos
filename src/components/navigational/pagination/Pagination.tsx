import Button from "@/components/actions/button/Button";
import LeftArrowIcon from "@/assets/icons/leftArrowIcon.svg";
import RightArrowIcon from "@/assets/icons/rightArrowIcon.svg";
import { SetStateAction, useState } from "react";

interface Props {
  onChange: (value: SetStateAction<number>) => void;
  totalPages: number;  
  pageIndex: number;
}

export default function Pagination(props: Props) {
  const { onChange, totalPages, pageIndex } = props;
  const [page, setPage] = useState(pageIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      onChange(newPage);
      setPage(newPage);
    }
  };

  return (
    <div className="flex max-w-fit mx-auto items-center justify-center gap-3 p-2 mt-5 border-2 dark:border-neutral-700 rounded-full">
      <select
        className="appearance-none text-center px-3 py-1 border-2 text-neutral-500 dark:text-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 rounded-full"
        // for Safari, see https://bugs.webkit.org/show_bug.cgi?id=40216
        style={{ textAlignLast: "center" }}
        onChange={(e: React.FormEvent<HTMLSelectElement>) =>
          handlePageChange(Number(e.currentTarget.value) - 1)
        }
        value={page + 1}
      >
        {Array(totalPages)
          .fill(0)
          .map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
      </select>

      <span className="text-neutral-500 dark:text-neutral-300">
        of {totalPages} {totalPages === 1 ? "page" : "pages"}
      </span>
      <div className="flex gap-1">
        <Button
          bgColor="bg-button dark:bg-neutral-700"
          textColor="text-button-text dark:text-neutral-300"
          icon={LeftArrowIcon}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
        />
        <Button
          bgColor="bg-button dark:bg-neutral-700"
          textColor="text-button-text dark:text-neutral-300"
          icon={RightArrowIcon}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
        />
      </div>
    </div>
  );
}

import clsx from "clsx";
import { ReactNode } from "react";

export default function CategoryTag({
  children,
  onClick,
  active,
  className,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-block px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 text-sm font-medium cursor-pointer transition-all duration-200 border border-gray-200 hover:border-gray-300",
        className,
        {
          "!bg-gray-900 !text-white !border-gray-900": active,
        }
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

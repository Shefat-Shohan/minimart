import clsx from "clsx";
import React from "react";

type Props = {
  title: string;
  className?: string;
};

export default function Title({ title, className }: Props) {
  return (
    <div className={clsx("py-10 ", className)}>
      <h2
        className={clsx(
          "md:text-4xl text-xl font-bold text-gray-700 text-center",
          className
        )}
      >
        {title}
      </h2>
    </div>
  );
}

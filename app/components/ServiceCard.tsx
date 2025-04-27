import React, { ComponentType, SVGProps } from "react";

type Props = {
  title: string;
  subtitle: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
};

export default function ServiceCard({ title, subtitle, Icon }: Props) {
  return (
    <div className="flex gap-3 items-center">
      <Icon className="size-8" />
      <div>
        <h2 className="text-sm font-bold text-gray-700">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

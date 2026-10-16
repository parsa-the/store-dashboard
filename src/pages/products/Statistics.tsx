import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  ProductLoadingIcon,
  PackageOutOfStockIcon,
} from "@hugeicons/core-free-icons";
const products = [
  {
    icon: ProductLoadingIcon,
    title: "Total products",
    number: 123,
    textColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: PackageOutOfStockIcon,
    title: "Out of stock",
    number: 12,
    textColor: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    icon: DashboardSquare01Icon,
    title: "Categories",
    number: 8,
    textColor: "text-violet-600",
    bgColor: "bg-violet-100",
  },
];
const Statistics = () => {
  return (
    <section className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((item) => (
        <div
          key={item.title}
          className="flex min-w-0 items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div
            className={`flex  size-16 shrink-0 items-center justify-center rounded-full ${item.bgColor}  ${item.textColor}`}
          >
            <HugeiconsIcon icon={item.icon} size={30} />
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-sm text-zinc-500">{item.title}</p>
            <p className="text-2xl font-black text-zinc-800 sm:text-4xl">
              {item.number}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Statistics;

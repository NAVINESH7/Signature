import { ArrowUpRight } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
}: StatCardProps) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        bg-white
        border
        border-[#E7E0D4]
        p-8
        shadow-[0_10px_30px_rgba(0,0,0,0.04)]
        transition-all
        hover:-translate-y-1
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
      "
    >
      <div
        className="
          absolute
          right-0
          top-0
          h-24
          w-24
          rounded-full
          bg-[#F8F2E6]
          translate-x-10
          -translate-y-10
        "
      />

      <div className="relative z-10">
        <p
          className="
            text-[11px]
            uppercase
            tracking-[5px]
            text-[#B8860B]
            mb-5
            font-medium
          "
        >
          {title}
        </p>

        <h3
          className="
            text-5xl
            font-bold
            text-[#111111]
            leading-none
          "
        >
          {value}
        </h3>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {subtitle}
          </p>

          <div
            className="
              h-10
              w-10
              rounded-full
              bg-[#F8F2E6]
              flex
              items-center
              justify-center
            "
          >
            <ArrowUpRight
              size={18}
              className="text-[#B8860B]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
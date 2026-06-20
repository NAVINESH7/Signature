export default function DashboardHeader() {
  return (
    <div>
      <p
        className="
          uppercase
          tracking-[6px]
          text-[#B8860B]
          text-sm
          mb-3
        "
      >
        Signature Admin
      </p>

      <h1
        className="
          font-luxury
          text-6xl
          text-[#111111]
          leading-none
        "
      >
        Dashboard
      </h1>

      <p className="mt-4 text-gray-500 text-lg">
        Welcome to your luxury commerce control center.
      </p>
    </div>
  );
}
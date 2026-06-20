export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="
        min-h-screen
        bg-[#F8F6F2]
        flex
        items-center
        justify-center
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-xl
          bg-white
          border
          border-[#E7E0D4]
          rounded-[32px]
          p-8
          shadow-sm
        "
      >
        <div className="text-center mb-8">
          <h1
            className="
              font-luxury
              text-3xl
              text-[#111111]
            "
          >
            SIGNATURE
          </h1>

          <p
            className="
              text-xs
              uppercase
              tracking-[4px]
              text-[#B8860B]
              mt-2
            "
          >
            Luxury Silk Sarees
          </p>
        </div>

        {children}
      </div>
    </main>
  );
}
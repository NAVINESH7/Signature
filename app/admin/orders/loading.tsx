export default function Loading() {
  return (
    <main className="p-10">
      <div className="animate-pulse">
        <div
          className="
            h-10
            w-60
            bg-gray-200
            rounded
          "
        />

        <div
          className="
            mt-3
            h-5
            w-80
            bg-gray-200
            rounded
          "
        />

        <div
          className="
            mt-10
            bg-white
            border
            rounded-2xl
            p-8
          "
        >
          <div className="space-y-4">
            {Array.from({
              length: 8,
            }).map((_, i) => (
              <div
                key={i}
                className="
                  h-12
                  bg-gray-100
                  rounded
                "
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
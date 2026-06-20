export default function Loading() {
  return (
    <main className="p-10">
      <div className="animate-pulse">
        <div
          className="
            h-10
            w-80
            bg-gray-200
            rounded
          "
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <div
            className="
              h-64
              bg-white
              border
              rounded-2xl
            "
          />

          <div
            className="
              h-64
              bg-white
              border
              rounded-2xl
            "
          />
        </div>

        <div
          className="
            mt-8
            h-72
            bg-white
            border
            rounded-2xl
          "
        />

        <div
          className="
            mt-8
            h-32
            bg-white
            border
            rounded-2xl
          "
        />
      </div>
    </main>
  );
}
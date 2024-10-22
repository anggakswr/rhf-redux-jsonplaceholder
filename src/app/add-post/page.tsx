"use client";

import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-bold">Posts</p>

        <Link href={`/`} className="bg-blue-500 px-4 py-2 text-sm text-white">
          Back
        </Link>
      </div>

      <p className="mb-2 font-bold">Title</p>
      <div className="mb-4">
        <input
          type="text"
          className="w-full border border-black px-2 py-1"
          placeholder="Title"
        />
      </div>

      <p className="mb-2 font-bold">Body</p>
      <div className="mb-8">
        <input
          type="text"
          className="w-full border border-black px-2 py-1"
          placeholder="Body"
        />
      </div>

      <button className="bg-blue-500 px-4 py-2 text-sm text-white">
        Submit
      </button>
    </>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const pageNumber = parseInt(page);

  // The `state` arg is correctly typed as `RootState` already
  // const posts = useAppSelector((state) => state.posts.posts);
  // const dispatch = useAppDispatch();

  // https://jsonplaceholder.typicode.com/posts
  const query = useQuery({
    queryKey: ["/posts", pageNumber],
    queryFn: () =>
      axios.get(
        `https://jsonplaceholder.typicode.com/posts?page=${pageNumber}`,
      ),
  });

  const posts: Post[] = query.data?.data.slice(0, 5) ?? [];

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-bold">Posts</p>

        <Link
          href={`/add-post`}
          className="bg-blue-500 px-4 py-2 text-sm text-white"
        >
          Add Post
        </Link>
      </div>

      {query.isError ? (
        <p className="text-red-500">Sorry, an error occurred.</p>
      ) : null}

      {query.isPending ? (
        <p>Loading ...</p>
      ) : (
        <>
          {posts.map((post) => (
            <div key={`post-${post.id}`} className="mb-4 border p-4 shadow">
              <p className="font-bold">Title</p>
              <p className="mb-4">{post.title}</p>

              <p className="font-bold">Body</p>
              <p>{post.body}</p>
            </div>
          ))}

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 px-4 py-2 text-white"
              onClick={() => {
                router.push(`?page=${pageNumber + 1}`);
              }}
            >
              Load More
            </button>
          </div>
        </>
      )}
    </>
  );
}

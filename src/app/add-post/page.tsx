"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface FormData {
  title: string;
  body: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      axios.post(`https://jsonplaceholder.typicode.com/posts`, data),
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-bold">Posts</p>

        <Link href={`/`} className="bg-blue-500 px-4 py-2 text-sm text-white">
          Back
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="mb-2 font-bold">Title</p>
        <div className="mb-4">
          <div className="mb-2">
            <input
              type="text"
              className="w-full border border-black px-2 py-1"
              placeholder="Title"
              defaultValue=""
              {...register("title", { required: true })}
              disabled={mutation.isPending}
            />
          </div>

          {errors.title && (
            <p className="text-xs text-red-500">This field is required</p>
          )}
        </div>

        <p className="mb-2 font-bold">Body</p>
        <div className="mb-8">
          <div className="mb-2">
            <input
              type="text"
              className="w-full border border-black px-2 py-1"
              placeholder="Body"
              defaultValue=""
              {...register("body", { required: true })}
              disabled={mutation.isPending}
            />
          </div>

          {errors.body && (
            <p className="text-xs text-red-500">This field is required</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 text-sm text-white"
            disabled={mutation.isPending}
          >
            Submit
          </button>

          {mutation.isPending ? <p>Loading ...</p> : null}
        </div>
      </form>
    </>
  );
}

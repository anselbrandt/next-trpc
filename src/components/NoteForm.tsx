import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";

type Inputs = {
  title: string;
  content: string;
  authorId: string;
};

const NoteForm: NextPage = () => {
  const client = trpc.useContext();
  const { mutate } = trpc.useMutation("notes.create", {
    onSuccess: () => {
      client.invalidateQueries("notes.getAll");
      reset();
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  return (
    <div className="my-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-xl font-bold underline">New note:</div>
        <div>
          <input
            className="border"
            placeholder="title"
            {...register("title", { required: true })}
          />
        </div>
        {errors.title && <div className="text-red-300">title required</div>}
        <div>
          <textarea className="border" {...register("content")} />
        </div>
        <div>
          <input
            className="border"
            placeholder="authorId"
            {...register("authorId", { required: true })}
          />
        </div>
        {errors.authorId && (
          <div className="text-red-300">authorId required</div>
        )}
        <div className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded w-auto inline-block">
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;

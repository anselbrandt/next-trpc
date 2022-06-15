import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";

type Inputs = {
  email: string;
  name: string;
};

const UserForm: NextPage = () => {
  const client = trpc.useContext();
  const { mutate } = trpc.useMutation("users.create", {
    onSuccess: () => {
      client.invalidateQueries("users.getAll");
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
        <div className="text-xl font-bold underline">New user:</div>
        <div>
          <input
            className="border"
            placeholder="name@mail.com"
            {...register("email", { required: true })}
          />
        </div>
        {errors.email && <div className="text-red-300">email required</div>}
        <div>
          <input
            className="border"
            placeholder="name"
            {...register("name", { required: true })}
          />
        </div>

        <div className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded w-auto inline-block">
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

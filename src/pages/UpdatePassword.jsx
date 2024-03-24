import { supabase } from "@/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const typedPassword = watch("password");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.updateUser({ password: formData.password });
      if (error) {
        throw new Error();
      }
      console.log(data);
      toast.success("passowrd updated successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onError = () => {
    console.log(errors);
  };
  const validateRepeatedPassword = (value) => {
    return value === typedPassword || "Passwords do not match";
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-slate-300 border-[1px] rounded-md shadow-md max-w-lg min-w-[350px] lg:w-3/6 md:w-4/6 sm:w-5/6 p-5">
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit, onError)}>
          <p className="text-slate-800 font-semibold text-md">New password</p>
          <Input
            disabled={isLoading}
            className={`${errors.password ? "border-red-500" : ""}`}
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: "this field is required", minLength: { value: 8, message: "password must at least 8 characters" } })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <p className="text-slate-800 font-semibold text-md">Repeat new password</p>
          <Input
            disabled={isLoading}
            className={`${errors.repeatedPassword ? "border-red-500" : ""}`}
            placeholder="Enter your password"
            type="password"
            {...register("repeatedPassword", { required: "this field is required", validate: validateRepeatedPassword })}
          />
          {errors.repeatedPassword && <p className="text-red-500 text-sm">{errors.repeatedPassword.message}</p>}

          <Button
            disabled={isLoading}
            className="mt-5">
            Reset your password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;

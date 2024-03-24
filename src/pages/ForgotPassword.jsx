import { supabase } from "@/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: "https://mohammedatef1.github.io/Authentication",
      });

      if (error) {
        throw new Error();
      }
      console.log(data);
      toast.success("resst password link sent to your email");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-slate-300 border-[1px] rounded-md shadow-md max-w-lg min-w-[350px] lg:w-3/6 md:w-4/6 sm:w-5/6 p-5">
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl text-slate-800 font-bold text-center mb-5">Login</h2>
          <p className="text-slate-800 font-semibold text-md">Email</p>
          <Input
            disabled={isLoading}
            className={`${errors.email ? "border-red-500" : ""}`}
            placeholder="Enter your email"
            {...register("email", {
              required: "this field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />

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

export default ForgotPassword;

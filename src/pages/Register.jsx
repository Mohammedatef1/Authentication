import { supabase } from "@/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      console.log(formData);

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            username: formData.username,
          },
        },
      });

      if (error) {
        toast.error("An error occured!");
        throw error;
      }
      toast.success("Account created successfully");
      console.log("Registration successful:", data);
    } catch (error) {
      console.error("Registration error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onError = () => {
    console.log(errors);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-slate-300 border-[1px] rounded-md shadow-md max-w-lg min-w-[350px] lg:w-3/6 md:w-4/6 sm:w-5/6 p-5">
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit, onError)}>
          <h2 className="text-2xl text-slate-800 font-bold text-center mb-5">Create an account</h2>

          <p className="text-slate-800 font-semibold text-md">Name</p>
          <Input
            disabled={isLoading}
            className={`${errors.name ? "border-red-500" : ""}`}
            placeholder="Enter your name"
            {...register("name", { required: "this field is required", maxLength: { value: 20, message: "name must be less than 20 characters" } })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <p className="text-slate-800 font-semibold text-md">Username</p>
          <Input
            disabled={isLoading}
            className={`${errors.username ? "border-red-500" : ""}`}
            placeholder="Enter your username"
            {...register("username", { required: "this field is required", maxLength: { value: 30, message: "username must be less than 30 characters" } })}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

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
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <p className="text-slate-800 font-semibold text-md">Password</p>
          <Input
            disabled={isLoading}
            className={`${errors.email ? "border-red-500" : ""}`}
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: "this field is required", minLength: { value: 8, message: "password must at least 8 characters" } })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          <Button
            disabled={isLoading}
            type="submit"
            className="mt-5">
            Register
          </Button>
          <p className="text-slate-800 text-md text-center">
            Already have an account?{" "}
            <Link
              className="font-bold transition hover:underline hover:text-slate-900"
              to="/login">
              Log in!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

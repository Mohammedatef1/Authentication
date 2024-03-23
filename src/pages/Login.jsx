import { supabase } from "@/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const getSession = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log(data, error);
    if (data?.session) {
      navigate("/", { replace: true }); //replace option to replace the current history entry
    }
  }, [navigate]);

  useEffect(() => {
    getSession();
  }, [getSession]);

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        toast.error(error.message == "Failed to fetch" ? "something went wrong!" : error.message);
        throw Error;
      }
      toast.success(`Login successfully, ${data.user.user_metadata.name}`);
      console.log("Login successfully", data);
      navigate("/");
    } catch (error) {
      console.log(error);
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
          <h2 className="text-2xl text-slate-800 font-bold text-center mb-5">Login</h2>
          <p className="text-slate-800 font-semibold text-md">Email</p>
          <Input
            disabled={isLoading}
            className={`${errors.email ? "border-red-500" : ""}`}
            placeholder="Enter your email"
            {...register("email", { required: "this field is required" })}
          />
          <p className="text-slate-800 font-semibold text-md">Password</p>
          <Input
            disabled={isLoading}
            className={`${errors.password ? "border-red-500" : ""}`}
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: "this field is required" })}
          />
          <Button
            disabled={isLoading}
            className="mt-5">
            Login
          </Button>
          <p className="text-slate-800 text-md text-center">
            Doesn&apos;t have an account?{" "}
            <Link
              className="font-bold transition hover:underline hover:text-slate-900"
              to="/register">
              Create one!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

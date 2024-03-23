import { supabase } from "@/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("something went wrong!");
        throw new Error();
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button
        disabled={isLoading}
        onClick={onClick}>
        Sign out
      </Button>
    </div>
  );
};

export default Dashboard;

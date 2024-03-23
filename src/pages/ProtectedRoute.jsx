import { supabase } from "@/client";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [err, setErr] = useState();

  const getSession = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();
    setData(data);
    setErr(error);
    console.log(data, error);
    if (!data?.session) {
      navigate("/login", { replace: true }); //replace option to replace the current history entry
    }
  }, [navigate]);

  useEffect(() => {
    getSession();
  }, [getSession]);

  return !err && data ? <>{children}</> : null;
};

export default ProtectedRoute;

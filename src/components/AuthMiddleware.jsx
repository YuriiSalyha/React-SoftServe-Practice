// components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AdminMiddleware = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data, error } = await supabase
        .from("Profiles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      console.log(data, error);
      if (error || !data || data.role !== "admin") {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, user]);


  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || isAdmin === false) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminMiddleware;

import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useUser } from "@clerk/clerk-react";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import Footer from "./Footer";

const ProtectedRoute = ({ hasFooter = true }) => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <main>
          {!isLoaded ? (
            <LoadingScreen />
          ) : !isSignedIn ? (
            <Navigate to="/signin" replace />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
      {hasFooter && <Footer />}
    </div>
  );
};

export default ProtectedRoute;

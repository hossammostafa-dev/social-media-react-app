import { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";

function ProtectedRoute() {
  const [checkToken, setCheckToken] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null || token === "") {
      setCheckToken(false);
    } else {
      setCheckToken(true);
    }
  }, [setCheckToken]);
  return (
    <>
      {checkToken ? <Home /> : <Login />}
    </>
  );
}

export default ProtectedRoute;

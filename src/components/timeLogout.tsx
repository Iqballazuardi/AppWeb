/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const useAutoLogout = (timeout: number) => {
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      Swal.fire({
        title: "Session Expired!",
        text: "You have been logged out due to inactivity.",
        icon: "warning",
        confirmButtonText: "OK!",
      });
      Cookies.remove("LoginTimeout");
      localStorage.removeItem("userId");
      localStorage.removeItem("authToken");
      navigate("/login");
    }, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeout, navigate]);

  return null;
};

export default useAutoLogout;

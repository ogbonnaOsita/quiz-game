/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useRef } from "react";

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  return minutes + ":" + seconds;
};

const Timer = ({ initialTime, callback, countdown, setCountdown }) => {
  // const [countdown, setCountdown] = useState(initialTime);
  const Ref = useRef();

  useEffect(() => {
    if (countdown > 0) {
      Ref.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(Ref.current);
    }
  }, [countdown]);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(Ref.current);
      callback();
      setCountdown(initialTime);
    }
  }, [countdown]);

  return (
    <div className="w-full text-center md:text-right">
      <h2 className="text-base font-semibold mx-auto">
        Time Left: {formatTime(countdown)}
      </h2>
    </div>
  );
};

export default Timer;

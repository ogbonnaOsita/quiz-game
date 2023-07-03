/* eslint-disable react/prop-types */
import DOMPurify from "dompurify";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../App";
import Timer from "./Timer";

const QuizPage = ({ questions, handleStartQuiz }) => {
  const initialTime = 30;
  const { score, setScore } = useContext(Context);
  const { index, setIndex } = useContext(Context);
  const { setActive, urlCategory } = useContext(Context);
  const [countdown, setCountdown] = useState(initialTime);
  const noOfQuestions = questions.results.length;
  const alphabets = ["A", "B", "C", "D", "E", "F"];

  const { register, handleSubmit } = useForm();

  //   Warning on page reload
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const getSelectedAnswer = (value) => {
    if (
      value &&
      value.answer_options === questions.results[index].correct_answer
    ) {
      setScore(score + 1);
    }
    const radio = document.querySelector(
      "input[type=radio][name=answer_options]:checked"
    );
    if (radio !== null) {
      radio.checked = false;
    }
    setIndex(index + 1);
  };

  const handleRating = () => {
    if (score / noOfQuestions >= 0.7) {
      return (
        <h2 className="text-green-500 text-xl font-medium mt-2">Excellent!</h2>
      );
    } else if (score / noOfQuestions >= 0.5) {
      return (
        <h2 className="text-yellow-500 text-xl font-medium mt-2">
          Average Result!
        </h2>
      );
    } else {
      return (
        <h2 className="text-red-500 text-xl font-medium mt-2">Poor Result!</h2>
      );
    }
  };

  const handleEndQuiz = () => {
    setIndex(0);
    setScore(0);
    setActive(false);
  };
  return (
    <div className="relative">
      <div className="text-center">
        <h2 className="text-5xl font-black">QUIZ</h2>
        <div className="flex items-center justify-center">
          <p>Answer Trivia questions for fun!</p>
          <img src="/quiz.png" className="h-[40px] ml-3" />
        </div>
      </div>
      {index < questions.results.length && (
        <div className="timer md:absolute md:top-0 md:right-0 w-full">
          <Timer
            initialTime={initialTime}
            callback={getSelectedAnswer}
            countdown={countdown}
            setCountdown={setCountdown}
          />
        </div>
      )}
      <hr className="h-px my-8 bg-gray-400 border-0 w-full" />
      {index < questions.results.length ? (
        <>
          <div className="text-center">
            <h2>
              Question: {index + 1} of {questions.results.length}
            </h2>
            <p
              className="max-w-[75ch] my-8 mx-auto"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(questions.results[index].question),
              }}
            />
          </div>
          <div className="w-full md:w-[60%] mx-auto">
            <form className="w-full" onSubmit={handleSubmit(getSelectedAnswer)}>
              <div className="quiz-options">
                {questions.results[index].answers.map((answer, i) => (
                  <div key={i}>
                    <input
                      type="radio"
                      id={`answer-${i}`}
                      {...register("answer_options")}
                      value={answer}
                    />
                    <label
                      className="radio-label"
                      htmlFor={`answer-${i}`}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          alphabets[i] + ". " + answer
                        ),
                      }}
                    />
                    <br />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setCountdown(initialTime)}
                  className="w-full px-6 py-3 leading-5 text-white  transition-colors duration-200 transform bg-[#D07A76] rounded-md hover:bg-[#7F4242] focus:outline-none"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div>
          <div className="flex flex-col items-center">
            <img src="/cup.png" className="w-[8rem]" />
            {handleRating()}
            <h3 className="font-medium text-2xl">
              Your score: {score}/{noOfQuestions}
            </h3>
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <button
              onClick={() => handleStartQuiz(urlCategory)}
              className="w-full px-6 py-3 leading-5 text-white  transition-colors duration-200 transform bg-[#D07A76] rounded-md hover:bg-[#7F4242] focus:outline-none focus:bg-gray-600"
            >
              Repeat Quiz
            </button>
            <button
              onClick={handleEndQuiz}
              className="w-full px-6 py-3 leading-5 text-white  transition-colors duration-200 transform bg-[#D07A76] rounded-md hover:bg-[#7F4242] focus:outline-none"
            >
              End Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

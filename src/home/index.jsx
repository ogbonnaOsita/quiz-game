import { useState } from "react";
import axios from "axios";
import StartPage from "../components/StartPage";
import QuizPage from "../components/QuizPage";
import { Context } from "../App";
import { useContext } from "react";

const HomePage = () => {
  const [questions, setQuestions] = useState();
  const { active, setActive } = useContext(Context);
  const { setScore } = useContext(Context);
  const { setIndex } = useContext(Context);

  const startQuiz = (url) => {
    axios
      .get(url)
      .then((res) => {
        res.data.results.map((result) => {
          result.answers = result.incorrect_answers;
          result.answers.splice(
            ((result.answers.length + 1) * Math.random()) | 0,
            0,
            result.correct_answer
          );
        });
        setQuestions(res.data);
        setActive(true);
        setScore(0);
        setIndex(0);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="min-h-[80vh] pb-10 md:pb-20 px-3 sm:px-5 md:px-0">
      <div className="h-full md:w-[80%] w-full mt-10 md:mt-20 px-5 md:px-10 py-16 md:mx-auto rounded-lg border border-1 bg-white">
        {!active ? (
          <>
            <div className="flex flex-col items-center">
              <h2 className="text-5xl font-black">QUIZ</h2>
              <div className="flex items-center">
                <p>Answer Trivia questions for fun!</p>
                <img src="/quiz.png" className="h-[40px] ml-3" />
              </div>
            </div>
            <hr className="h-px my-8 bg-gray-400 border-0 w-full" />
            <StartPage handleStartQuiz={startQuiz} />
          </>
        ) : (
          questions && (
            <QuizPage questions={questions} handleStartQuiz={startQuiz} />
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;

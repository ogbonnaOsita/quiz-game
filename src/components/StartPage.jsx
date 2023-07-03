/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../App";

const StartPage = ({ handleStartQuiz }) => {
  const [categories, setCategories] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { setUrlCategory } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUserPreference = (values) => {
    const url = `https://opentdb.com/api.php?amount=${values.questions}${
      values.category !== "" ? "&category=" + values.category : ""
    }${values.difficulty !== "" ? "&difficulty=" + values.difficulty : ""}${
      values.type !== "" ? "&type=" + values.type : ""
    }`;

    setUrlCategory(url);
    handleStartQuiz(url);
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="flex flex-col items-center">
      {isLoading && <div className="loader"></div>}
      {categories && (
        <>
          <div>
            <div className="flex items-end justify-center mt-3">
              <h2 className="text-xl font-semibold">Choose your fate</h2>
              <img src="/wizard.png" className="h-[40px] ml-3" />
            </div>
            <small>You have 30 seconds to answer each question</small>
          </div>
          <div className="w-full md:w-[80%]">
            <form onSubmit={handleSubmit(handleUserPreference)}>
              <div className="grid grid-cols-1 gap-2 gap-y-4 mt-4 md:grid-cols-2 w-full">
                <div>
                  <label className=" dark:text-gray-500" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    className="block w-full px-4 py-2.5  text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    {...register("category")}
                  >
                    <option value="">Any Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className=" dark:text-gray-500" htmlFor="type">
                    Type
                  </label>
                  <select
                    id="type"
                    className="block w-full px-4 py-2.5  text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    {...register("type")}
                  >
                    <option value="">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                  </select>
                </div>

                <div>
                  <label className=" dark:text-gray-500" htmlFor="difficulty">
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    className="block w-full px-4 py-2.5  text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    {...register("difficulty")}
                  >
                    <option value="">Any Dificulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className=" dark:text-gray-500" htmlFor="questions">
                    No. Of questions
                  </label>
                  <input
                    id="questions"
                    type="number"
                    defaultValue={10}
                    min="10"
                    max="50"
                    required
                    className="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    {...register("questions")}
                  />
                  {errors.questions && (
                    <span className="error-span">
                      {errors.questions?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="w-full px-6 py-3 leading-5 text-white  transition-colors duration-200 transform bg-[#D07A76] rounded-md hover:bg-[#7F4242] focus:outline-none focus:bg-gray-600">
                  Start!
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default StartPage;

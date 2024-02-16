"use client";
import React, { useState, useRef } from "react";
import axios from "axios";

const Home = () => {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [factArray, setFactArray] = useState(["hey Number Api"]);


  const removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };

  const handleInputChange = (index, value) => {
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    // If the value is filled and there's a next input field, focus on it
    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputYear = digits.join("");
    if (inputYear >= 2025) {
      alert("we cannot go beyond 2025");
    } else {
      try {
        const response = await axios.get(`http://numberapi.com/${inputYear}/year`);
        setFactArray([...factArray, response.data]);
        
        setInterval(() => {
          factArray.shift();
        }, 10000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  (factArray.length>=10)?factArray.shift():null;
  const uniqueFacts = removeDuplicates(factArray);

  return (
    <form onSubmit={handleSubmit} className="border-2 p-2 mt-3 w-full">
      <ul className=" flex border-2 p-2 justify-center mx-auto     ">
        {[0, 1, 2, 3].map((index) => (
          <li key={index} className="border-2 p-2 ">
          <span className="">
            <input
              ref={(ref) => (inputRefs.current[index] = ref)}
              className=" text-center card h-max w-14  p-2  "
              type="text"
              maxLength={1}
              value={digits[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            </span>
          </li>
        ))}
      </ul>
      <button type="submit">Submit</button>
      <ul className="flex  facts flex-col gap-2">
        {factArray &&
          factArray.map((fact, index) => (
            <li key={index} className=" card p-1 text-center  hover:border-2 hover:font-medium hover:text-orange-500 "><span>{fact}</span></li>
          ))}
      </ul>
     
    </form>
  );
};

export default Home;

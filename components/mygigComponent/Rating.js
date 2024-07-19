"use client";
import { FaStar } from "react-icons/fa";
import React, { useState } from "react";

function Rating({ rating, setRating }) {
  const [hover, setHover] = useState();
  console.log(`Rating: ${rating}`);
  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label
            key={index}
            style={{
              color: currentRating <= (hover || rating) ? "yellow" : "white",
            }}
          >
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
            <FaStar
              className="star text-neutral-200"
              color={
                currentRating <= (hover || rating) ? "yellow" : "lightgray"
              }
              onMouseOver={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
              size={"22px"}
            />
          </label>
        );
      })}
    </div>
  );
}

export default Rating;

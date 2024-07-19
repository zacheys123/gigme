"use client";
import { FaStar } from "react-icons/fa";
import React, { useState } from "react";

function GigRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label
            key={index}
            style={{
              color: rating && currentRating <= rating ? "yellow" : "white",
            }}
          >
            <input type="radio" name="rating" value={rating} />
            <FaStar
              className="star text-neutral-200"
              color={rating && currentRating <= rating ? "yellow" : "lightgray"}
              size={"22px"}
            />
          </label>
        );
      })}
    </div>
  );
}

export default GigRating;

"use client";
import React from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HearthButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HearthButton = ({ listingId, currentUser }: HearthButtonProps) => {
  const hasFavorited = true;
  const toggleFavorite = () => {};
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute  -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HearthButton;

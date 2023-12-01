"use client";

import Image from "next/image";
import React from "react";

const Avatar = () => {
  return (
    <Image
      alt="avatar"
      src="/images/placeholder.png"
      className="rounded-full"
      height="30"
      width="30"
      layout="fixed"
    />
  );
};

export default Avatar;

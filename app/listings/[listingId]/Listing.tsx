import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import React from "react";

interface ListingProps {
  reservation?: Reservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}
const Listing = ({ listing, currentUser }: ListingProps) => {};

export default Listing;

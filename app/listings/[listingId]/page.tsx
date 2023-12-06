import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import React from "react";
import Listing from "./Listing";

interface IParams {
  listingId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const currentUser = getCurrentUser();

  const listing = await getListingById(params);

  return <Listing listing={listing} currentUser={currentUser} />;
};

export default page;

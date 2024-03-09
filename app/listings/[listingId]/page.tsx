import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import React from "react";
import Listing from "./Listing";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
  listingId?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return <Listing listing={listing} currentUser={currentUser} />;
};

export default page;

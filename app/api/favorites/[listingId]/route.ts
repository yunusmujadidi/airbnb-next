import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismaclient";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

// This function is used to add a listing to the user's favorites.
export async function POST(request: Request, { params }: { params: Params }) {
  // Get the current user. This function is not shown in the code excerpt.
  const currentUser = await getCurrentUser();

  // If there is no current user, return an error response.
  if (!currentUser) {
    return NextResponse.error();
  }

  // Get the listingId from the parameters.
  const { listingId } = params;

  // If there is no listingId or if it's not a string, throw an error.
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listingId");
  }

  // Get the current user's favoriteIds, or an empty array if they don't have any.
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  // Add the listingId to the favoriteIds.
  favoriteIds.push(listingId);

  // Update the user in the database with the new favoriteIds.
  const user = await prisma.user.update({
    data: {
      favoriteIds,
    },
    where: {
      id: currentUser.id,
    },
  });

  // Return the updated user as a JSON response.
  return NextResponse.json(user);
}

// This function is used to remove a listing from the user's favorites.
export async function DELETE(request: Request, { params }: { params: Params }) {
  // Get the current user. This function is not shown in the code excerpt.
  const currentUser = await getCurrentUser();

  // If there is no current user, return an error response.
  if (!currentUser) {
    return NextResponse.error();
  }

  // Get the listingId from the parameters.
  const { listingId } = params;

  // If there is no listingId or if it's not a string, throw an error.
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listingId");
  }

  // Get the current user's favoriteIds, or an empty array if they don't have any.
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  // Remove the listingId from the favoriteIds.
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  // Update the user in the database with the new favoriteIds.
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  // Return the updated user as a JSON response.
  return NextResponse.json(user);
}

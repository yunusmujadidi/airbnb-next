import prisma from "../libs/prismaclient"; // Importing the Prisma client

interface IParams {
  listingId?: string; // Defining an interface for the function parameter
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params; // Destructuring the listingId from the params object
    const listing = await prisma.listing.findUnique({
      // Using Prisma client to find a unique listing
      where: {
        id: listingId, // Specifying the condition to find the listing by its ID
      },
      include: {
        user: true, // Including the associated user with the listing
      },
    });
    if (!listing) throw new Error("Listing not found"); // Throwing an error if the listing is not found
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(), // Converting the createdAt date to ISO string format
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(), // Converting the user's createdAt date to ISO string format
        updatedAt: listing.user.updatedAt.toISOString(), // Converting the user's updatedAt date to ISO string format
        emailVerified: listing.user.emailVerified?.toISOString(), // Converting the user's emailVerified date to ISO string format (if it exists)
      },
    };
  } catch (error: any) {
    throw new Error(error); // Throwing any caught error
  }
}

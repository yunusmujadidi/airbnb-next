import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface UseFavorites {
  listingId: string;
  currentUser?: SafeUser | null;
}
// This hook is used to manage the user's favorite listings.
const useFavorites = ({ listingId, currentUser }: UseFavorites) => {
  // Get the current route from the Next.js router.
  const router = useRouter();

  // Get the login modal state from the useLoginModal hook.
  const loginModal = useLoginModal();

  // Determine if the current listing is in the user's favorites.
  const hasFavorited = useMemo(() => {
    // Get the user's favoriteIds, or an empty array if they don't have any.
    const list = currentUser?.favoriteIds || [];

    // Check if the list includes the current listingId.
    return list.includes(listingId);
  }, [currentUser, listingId]);

  // This function is used to add or remove the current listing from the user's favorites.
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      // Stop the event from propagating to parent elements.
      e.stopPropagation();

      // If there is no current user, open the login modal and return.
      if (!currentUser) {
        loginModal.onOpen();
        return;
      }

      try {
        // If the user has favorited the current listing, remove it from their favorites.
        if (hasFavorited) {
          await axios.delete(`/api/favorites/${listingId}`);
        } else {
          // If the user hasn't favorited the current listing, add it to their favorites.
          await axios.post(`/api/favorites/${listingId}`);
        }

        // Refresh the current route to update the UI.
        router.refresh();

        // Show a success message.
        toast.success("Successfully updated favorites");
      } catch (error) {
        // Log the error and show an error message.
        console.error(error);
        toast.error("Unable to favorite listing");
      }
    },
    // List of dependencies for the useCallback hook.
    [currentUser, listingId, loginModal, hasFavorited, router]
  );

  // Return the hasFavorited state and the toggleFavorite function.
  return { hasFavorited, toggleFavorite };
};

// Export the useFavorites hook.
export default useFavorites;

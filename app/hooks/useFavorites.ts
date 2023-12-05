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

const useFavorites = ({ listingId, currentUser }: UseFavorites) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        loginModal.onOpen();
        return;
      }

      try {
        if (hasFavorited) {
          await axios.delete(`/api/favorites/${listingId}`);
        } else {
          await axios.post(`/api/favorites/${listingId}`);
        }
        router.refresh();
        toast.success("Successfully updated favorites");
      } catch (error) {
        console.error(error);
        toast.error("Unable to favorite listing");
      }
    },
    [currentUser, listingId, loginModal, hasFavorited, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorites;

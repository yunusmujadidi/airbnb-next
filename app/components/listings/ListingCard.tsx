"use client";
import { Listing } from "@prisma/client";
import React, { useCallback } from "react";

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountry";

interface ListingCardProps {
  data: Listing;
  reservation?: boolean;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  //get other data by location
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!disabled) return;

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = () => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  };
  return <div>ListingCard</div>;
};

export default ListingCard;

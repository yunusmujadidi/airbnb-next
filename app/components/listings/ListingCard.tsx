"use client";
import { Listing, Reservation } from "@prisma/client";
import React, { useCallback, useMemo } from "react";

import { SafeUser, SafeReservation, SafeListing } from "@/app/types";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountry";
import { format } from "date-fns";
import Image from "next/image";
import { BiHeart } from "react-icons/bi";
import HearthButton from "../HearthButton";
import Button from "@/app/components/Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
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

  //function to handle click on card
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!disabled) return;

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listings"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HearthButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibild text-lg">
          {location?.region},{location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="font-semibold">$ {price}</div>
        {!reservation && <div className="font-light">night</div>}
      </div>
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  );
};

export default ListingCard;

"use client";
import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { useMemo } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingProps {
  reservations?: Reservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const Listing = ({ listing, currentUser, reservations = [] }: ListingProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disableDate = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
        totalPrice,
      })
      .then(() => {
        toast.success("Listing Created Successfully");
        setDateRange(initialDateRange);
        //redirect to /trip
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dateRange, totalPrice, currentUser, listing?.id, loginModal, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-col-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md=col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                onChangeData={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disableDate={disableDate}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Listing;

import { useSearchParams } from "react-router-dom";

export function calTotalPrice(rentalPrice, discountPercent) {
  // Calculate the total price
  const totalDiscount = (rentalPrice * discountPercent) / 100;
  const totalPrice = rentalPrice - totalDiscount;
  return totalPrice;
}

export function scrollToTopFunction() {
  window.scrollTo(0, 0);
}

export function getAllParamsFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  return {
    types: searchParams.getAll("type"),
    seats: searchParams.getAll("seats").map((value) => parseInt(value)),
    maxPrice: searchParams.get("maxPrice"),
  };
}

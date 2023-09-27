export function calTotalPrice(rentalPrice, discountPercent) {
  // Calculate the total price
  const totalDiscount = (rentalPrice * discountPercent) / 100;
  const totalPrice = rentalPrice - totalDiscount;
  return totalPrice;
}

export function scrollToTopFunction() {
  window.scrollTo(0, 0);
}

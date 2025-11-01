import { useLocation, useNavigate } from "react-router";
import { Button } from "src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import { CheckCircle, Calendar, MapPin, CreditCard } from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { rental, car } = location.state || {};

  if (!rental || !car) {
    // Redirect to home if no rental data
    navigate("/");
    return null;
  }

  // Format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
              Payment Successful!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Your rental has been confirmed. Thank you for choosing our
              service.
            </p>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Rental Confirmation</span>
                <span className="text-sm font-normal">
                  #{rental._id.slice(-6)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Car Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                  {car.images?.[0] ? (
                    <img
                      src={car.images[0]}
                      alt={`${car.make} ${car.model}`}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 border-2 border-dashed rounded-xl dark:bg-gray-700" />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {car.make} {car.model}
                    </h3>
                    <p className="text-gray-500">
                      {car.year} • {car.specs?.type}
                    </p>
                  </div>
                </div>

                {/* Rental Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Pick-Up</p>
                      <p className="font-medium">
                        {formatDate(rental.startDate)}
                      </p>
                      <p className="text-sm">{formatTime(rental.startDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{rental.pickupLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Drop-Off</p>
                      <p className="font-medium">
                        {formatDate(rental.endDate)}
                      </p>
                      <p className="text-sm">{formatTime(rental.endDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{rental.dropoffLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-500">Payment Method</span>
                    </div>
                    <span className="font-medium capitalize">
                      {rental.paymentMethod}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-500">Total Paid</span>
                    <span className="text-lg font-bold">
                      ${rental.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={() => navigate("/profile")}
                    className="flex-1"
                  >
                    View My Rentals
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/cars")}
                    className="flex-1"
                  >
                    Browse More Cars
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>A confirmation email has been sent to your email address.</p>
            <p className="mt-2">Need help? Contact our support team.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

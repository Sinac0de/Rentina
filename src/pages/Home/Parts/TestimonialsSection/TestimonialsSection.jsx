import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";
import StarFilledIcon from "../../../../assets/Icons/StarFilledIcon";

const TestimonialsSection = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Los Angeles, CA",
      rating: 5,
      content:
        "Rentina made my vacation planning so much easier. The car was in perfect condition and the pickup process was seamless. I'll definitely be using them again!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "New York, NY",
      rating: 5,
      content:
        "As a frequent business traveler, I need reliability and efficiency. Rentina delivers on both. Their customer service is outstanding and their vehicles are always well-maintained.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Miami, FL",
      rating: 4,
      content:
        "Great experience overall! The website is user-friendly and the prices are competitive. My only suggestion would be to expand the electric vehicle options.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 4,
      name: "David Wilson",
      location: "Chicago, IL",
      rating: 5,
      content:
        "Booking through Rentina was a breeze. The car was exactly as described and even cleaner than expected. Will recommend to all my friends!",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    },
    {
      id: 5,
      name: "Jessica Thompson",
      location: "Seattle, WA",
      rating: 4,
      content:
        "Very satisfied with my rental experience. The process was straightforward and the car was in excellent condition. Customer support was responsive when I had questions.",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <StarFilledIcon key={i} isBig={false} />
        ))}
      </div>
    );
  };

  return (
    <section
      id="testimonials"
      className="rounded-2xl py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to
            say about their experience with Rentina.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-2 lg:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-2 lg:pl-4 basis-full lg:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="h-full border-0 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800 mb-5">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">
                              {testimonial.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {testimonial.location}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          {renderStars(testimonial.rating)}
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 flex-grow">
                          "{testimonial.content}"
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
              <CarouselPrevious className="static transform-none rounded-full w-10 h-10 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 text-primary" />
              <CarouselNext className="static transform-none rounded-full w-10 h-10 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 text-primary" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

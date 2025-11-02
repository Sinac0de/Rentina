import { useState } from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I book a car?",
      answer:
        "Booking a car is easy! Simply use our search feature to find available vehicles, select your desired dates, and complete the reservation process online. You'll receive a confirmation email with all the details.",
    },
    {
      question: "What documents do I need to rent a car?",
      answer:
        "You'll need a valid driver's license, proof of insurance, and a credit card in your name. International renters may need additional documentation such as a passport and visa.",
    },
    {
      question: "Can I modify or cancel my reservation?",
      answer:
        "Yes, you can modify or cancel your reservation through your account dashboard. Cancellation policies vary depending on the vehicle and timing, so please check the specific terms during booking.",
    },
    {
      question: "What is your fuel policy?",
      answer:
        "Our standard fuel policy is full-to-full. You receive the vehicle with a full tank and should return it with a full tank. Prepaid fuel options are also available at select locations.",
    },
    {
      question: "Are there mileage limitations?",
      answer:
        "Most of our rentals include unlimited mileage. However, some special offers or long-term rentals may have mileage restrictions which will be clearly stated during the booking process.",
    },
    {
      question: "What happens if I return the car late?",
      answer:
        "Late returns may incur additional charges. We recommend contacting us as soon as possible if you anticipate returning the vehicle after the agreed time to discuss options and potential fees.",
    },
  ];

  return (
    <section className="py-12" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about renting with us. Can&apos;t find
            an answer? Feel free to contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800">
                    <p>{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

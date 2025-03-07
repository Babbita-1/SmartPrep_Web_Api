import React from "react";
import about from "../assets/about.jpg";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      {/* Main Title */}
      <h1 className="text-5xl md:text-6xl font-bold text-blue-700 mb-8">
        About <span className="text-blue-600">SmartPrep</span>
      </h1>

      {/* Illustration */}
      <div className="w-3/4 md:w-2/3 lg:w-1/2">
        <img
          src={about}
          alt="Home Illustration"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* Content Section */}
      <div className="mt-10 w-11/12 md:w-2/3 lg:w-1/2 text-center">
        <p className="text-xl md:text-2xl  text-gray-700 leading-relaxed mb-6">
          SmartPrep is your all-in-one platform for enhanced learning. We provide
          grade-level specific resources, interactive quizzes, and personalized
          practice exams to help you master every subject at your own pace.
        </p>

        <p className="text-xl md:text-2xl  text-gray-700 leading-relaxed mb-6">
          Our mission is to empower students across the globe by offering
          high-quality educational materials tailored to their curriculum. We
          believe in making learning both accessible and engaging, ensuring
          every learner can excel in and outside the classroom.
        </p>

        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
          Whether you’re looking to strengthen your fundamentals or challenge
          yourself with advanced concepts, SmartPrep is designed to guide you
          every step of the way. By combining modern technology with proven
          teaching methods, we strive to deliver the best possible experience
          for learners of all levels.
        </p>

        <div className="mt-8 bg-white shadow-lg rounded-lg p-8 text-left">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">
            Why Choose SmartPrep?
          </h2>
          <ul className="list-disc list-inside space-y-4 text-xl md:text-2xl text-gray-700 leading-relaxed">
            <li>
              <span className="font-semibold">Comprehensive Coverage:</span>{" "}
              Access tailored resources for every grade-level subject.
            </li>
            <li>
              <span className="font-semibold">Interactive Practice:</span>{" "}
              Stay engaged with quizzes, short tests, and full-length exams
              that adapt to your learning pace.
            </li>
            <li>
              <span className="font-semibold">User-Friendly Interface:</span>{" "}
              Navigate easily with our intuitive design, built for students and educators.
            </li>
            <li>
              <span className="font-semibold">Data-Driven Insights:</span>{" "}
              Track your progress through detailed performance analytics.
            </li>
            <li>
              <span className="font-semibold">Dedicated Support:</span>{" "}
              Our support team is here to help with technical issues or academic queries.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../App';

import featureExam from "../assets/featureExam.jpg";
import featureLearn from "../assets/featureLearn.jpg";
import featurePractice from "../assets/featurePractice.jpg";
import heroImage from "../assets/heroImage.png";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Home = () => {

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (auth !== null) {
      setIsAuthChecked(true);
      if (auth.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setIsAuthChecked(true); // Ensures Home content is shown if not logged in
    }
  }, [auth, navigate]);

  if (!isAuthChecked) {
    return <div className="text-center mt-20 text-xl text-gray-700">Loading...</div>;
  }
  const handleGetStarted = () => {
    // navigate to sign-up
    navigate("/sign-up");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <motion.header
        className="flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto px-4 py-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUpVariant}
      >
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
            Empower Your Learning with{" "}
            <span className="text-blue-600">smartPrep</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg md:text-xl">
            Access grade-specific subjects, learn with interactive resources,
            and practice with real-time quizzes. Take your studying
            to the next level.
          </p>
          <button
            onClick={handleGetStarted}
            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md shadow hover:bg-blue-700 transition-colors text-lg"
          >
            Get Started
          </button>
        </div>

        {/* Right: Hero Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={heroImage}
            alt="Hero"
            className="max-w-full h-auto rounded-md shadow-md"
          />
        </div>
      </motion.header>

      {/* Features Section */}
      <motion.section
        className="py-12 bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUpVariant}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center">
            Key Features
          </h2>
          <p className="text-center text-gray-600 mt-2 text-lg md:text-xl">
            Everything you need for a comprehensive study experience
          </p>

          <div className="mt-12 space-y-16">
            {/* Feature 1 */}
            <motion.div
              className="flex flex-col md:flex-row items-center gap-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="md:w-1/2">
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Learn
                </h3>
                <p className="text-gray-600 mt-2 text-lg md:text-xl">
                  Dive into expertly curated resources, videos, and notes
                  tailored to your grade level.
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  src={featureLearn}
                  alt="Learn"
                  className="mx-auto max-w-full h-auto rounded-md shadow-md"
                />
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="flex flex-col md:flex-row-reverse items-center gap-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="md:w-1/2">
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Practice
                </h3>
                <p className="text-gray-600 mt-2 text-lg md:text-xl">
                  Test your knowledge with quizzes and interactive activities,
                  and track your performance in real-time.
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  src={featurePractice}
                  alt="Practice"
                  className="mx-auto max-w-full h-auto rounded-md shadow-md"
                />
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="flex flex-col md:flex-row items-center gap-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="md:w-1/2">
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Exams
                </h3>
                <p className="text-gray-600 mt-2 text-lg md:text-xl">
                  Challenge yourself with full-length practice exams
                  to simulate real test conditions.
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  src={featureExam}
                  alt="Exams"
                  className="mx-auto max-w-full h-auto rounded-md shadow-md"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-12 bg-blue-600"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUpVariant}
      >
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="mt-2 text-lg md:text-xl">
            Sign up now and unlock your next level of learning.
          </p>
          <button
            onClick={handleGetStarted}
            className="mt-6 px-8 py-3 bg-white text-blue-600 rounded-md shadow hover:opacity-90 text-lg"
          >
            Create an Account
          </button>
        </div>
      </motion.section>

      {/* Footer  */}
      <footer className="text-center py-4 bg-gray-200 text-gray-600 text-lg">
        <p>&copy; {new Date().getFullYear()} smartPrep. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

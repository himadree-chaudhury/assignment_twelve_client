import React from "react";
import Stepper, { Step } from "../Animation/Stepper/Stepper";
import { useNavigate } from "react-router";

const Workflow = () => {
  const navigate = useNavigate();
  const steps = [
    {
      step: "Step 1",
      title: "Create Your Biodata",
      description:
        "Sign up and fill in your details to create a personalized biodata profile.",
      icon: (
        <svg
          className="text-primary h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      step: "Step 2",
      title: "Explore Matches",
      description:
        "Use our advanced filters to find potential partners that match your preferences.",
      icon: (
        <svg
          className="text-primary h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      step: "Step 3",
      title: "Connect and Celebrate",
      description:
        "Reach out to your perfect match and start your journey towards a happy marriage.",
      icon: (
        <svg
          className="text-primary h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="section-layout">
      <Stepper
        initialStep={1}
        onFinalStepCompleted={() => navigate("/all-biodata")}
        backButtonText="Previous"
        nextButtonText="Next"
        className="w-full"
      >
        {steps.map((step, index) => (
          <Step>
            <div key={index} className="text-center *:mb-2">
              <div className="flex justify-center">{step.icon}</div>
              <p className="text-sm uppercase">{step.step}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};
export default Workflow;

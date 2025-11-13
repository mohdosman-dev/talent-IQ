import React from "react";
import toast from "react-hot-toast";

const HomePage = () => {
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => toast.success("Toast working!")}
      >
        Click me
      </button>
    </div>
  );
};

export default HomePage;

import React from "react";

const Home: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main>
      SIDEBAR
      {children}
    </main>
  );
};

export default Home;

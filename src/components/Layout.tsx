import React from "react";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <div className="relative h-auto">
      <Navbar />
      {props.children}
      <div className="sticky bottom-0 right-0 z-10 mb-4 mr-4">
        <div>
          <a
            title="Follow me on twitter"
            href="https://www.twitter.com/asad_codes"
            target="_blank"
            className="block h-16 w-16 transform rounded-full shadow transition-all hover:rotate-12 hover:scale-110 hover:shadow-lg"
          >
            <img
              className="h-full w-full rounded-full object-cover object-center"
              src="https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2019/12/twitter-logo.jpg"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Layout;

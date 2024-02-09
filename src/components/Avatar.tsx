import React from "react";

const Avatar = ({
  src = "https://lh3.googleusercontent.com/a/ACg8ocKwzJzGfWFGUK5VJdqXaOaGVBleLZHWSm0PzhDl0pzK=s96-c",
  alt = "Aditya Shende",
}) => {
  return (
    <img
      alt={alt}
      src={src}
      className="relative inline-block h-full w-full rounded-full object-cover object-center"
      data-popover-target="profile-menu"
    />
  );
};

export default Avatar;

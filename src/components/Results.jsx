import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Loader } from "./Loader";
import BgImage from "../assets/images/bg.svg";

// Results
export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  // fetch Results
  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/videos") {
        getResults(`/video/q=${searchTerm}&num=40`);
      } else if (location.pathname === "/images") {
        getResults(`/image/q=${searchTerm}&num=40`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`);
      }
    }
  }, [searchTerm, location.pathname]);

  // Loading
  if (isLoading) return <Loader />;

  // No Results Found
  if (!results?.length)
    return (
      <div className="flex justify-center items-center w-full h-full flex-col">
        <img src={BgImage} alt="No Results Found." className="w-5/6 md:w-3/6" />
        <h1 className="text-2xl">No Results Found.</h1>
      </div>
    );

  switch (location.pathname) {
    // search page
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ link, title }, i) => (
            <div key={i} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                {/* Link */}
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                {/* Title */}
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    // images page
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map(({ image, link: { href, title } }, i) => (
            <a
              href={href}
              key={i}
              target="_blank"
              rel="noreferrer"
              className="sm:p-3 p-5"
            >
              {/* Image */}
              <img src={image?.src} alt={title} loading="lazy" />
              {/* Title */}
              <p className="w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
    // news page
    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {results?.map(({ links, source, title }, i) => {
            return (
              <div key={i} className="md:w-2/5 w-full">
                <a
                  href={links?.[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {/* Title */}
                  <p className="text-lg dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
                <div className="flex gap-4">
                  {/* Source Link */}
                  <a href={source?.href} target="_blank" rel="noreferrer">
                    {source?.href}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      );
    // videos page
    case "/videos":
      return (
        <div className="flex flex-wrap">
          {results?.map(({ link, title }, i) => (
            <div key={i} className="p-2">
              {/* Video frame */}
              {typeof link === "string" && (
                <iframe
                  width="355px"
                  height="200px"
                  src={
                    link?.includes("/watch?v=")
                      ? link?.replace("/watch?v=", "/embed/")
                      : link
                  }
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title}
                ></iframe>
              )}
            </div>
          ))}
        </div>
      );
    // Incorrect Route
    default:
      return <Navigate to="/search" />;
  }
};

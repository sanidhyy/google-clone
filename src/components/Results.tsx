import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { useResultContext } from "../contexts/ResultContextProvider";
import {
  isImageResult,
  isNewsResult,
  isSearchResult,
  isSearchTab,
  isVideoResult,
} from "../types";
import { Loader } from "./Loader";
import BgImage from "../assets/images/bg.svg";

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    const tab = location.pathname.slice(1);

    if (searchTerm && isSearchTab(tab)) {
      void getResults(tab, searchTerm);
    }
  }, [searchTerm, location.pathname, getResults]);

  if (isLoading) return <Loader />;

  if (!results.length) {
    return (
      <div className="flex justify-center items-center w-full h-full flex-col">
        <img src={BgImage} alt="No Results Found." className="w-5/6 md:w-3/6" />
        <h1 className="text-2xl">No Results Found.</h1>
      </div>
    );
  }

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results.filter(isSearchResult).map(({ link, title }, i) => (
            <div key={i} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results.filter(isImageResult).map(({ image, link }, i) => (
            <a
              href={link.href}
              key={i}
              target="_blank"
              rel="noreferrer"
              className="sm:p-3 p-5"
            >
              <img src={image.src} alt={link.title} loading="lazy" />
              <p className="w-36 break-words text-sm mt-2">{link.title}</p>
            </a>
          ))}
        </div>
      );
    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {results.filter(isNewsResult).map(({ links, source, title }, i) => (
            <div key={i} className="md:w-2/5 w-full">
              <a
                href={links[0]?.href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
              <div className="flex gap-4">
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.href}
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap">
          {results.filter(isVideoResult).map(({ link, title }, i) => (
            <div key={i} className="p-2">
              {typeof link === "string" && (
                <iframe
                  width="355px"
                  height="200px"
                  src={
                    link.includes("/watch?v=")
                      ? link.replace("/watch?v=", "/embed/")
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
    default:
      return <Navigate to="/search" />;
  }
};

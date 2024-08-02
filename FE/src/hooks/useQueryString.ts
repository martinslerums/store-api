import { useState, useEffect } from "react";

const useQueryString = () => {
  const [query, setQuery] = useState(window.location.search);

  useEffect(() => {
    const handleUrlChange = () => {
      setQuery(window.location.search);
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("pushstate", handleUrlChange);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("pushstate", handleUrlChange);
    };
  }, []);

  return query;
};

export default useQueryString;

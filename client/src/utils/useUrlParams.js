import { useNavigate, useLocation } from "react-router-dom";

const useUrlParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Update URL parameters
  const updateUrlParams = (
    keyOrKeys,
    value = null,
    deleteFlag = false,
    appendFlag = false
  ) => {
    if (!Array.isArray(keyOrKeys)) {
      updateUrlParams(
        [{ key: keyOrKeys, value }],
        null,
        deleteFlag,
        appendFlag
      );
      return;
    }

    const searchParams = new URLSearchParams(location.search);

    keyOrKeys.forEach((obj) => {
      if (deleteFlag || !appendFlag) {
        if (obj.value !== undefined && obj.value !== null) {
          searchParams.delete(obj.key, obj.value);
        } else {
          searchParams.delete(obj.key);
        }
      }
      if (!deleteFlag) {
        if (appendFlag) {
          searchParams.append(obj.key, obj.value);
        } else {
          searchParams.set(obj.key, obj.value);
        }
      }
    });

    navigate({ search: searchParams.toString() });
  };

  // Remove params by key(s)
  const removeUrlParams = (keyOrKeys, value = null) => {
    updateUrlParams(keyOrKeys, value, true);
  };

  // Set or Replace params by key(s)
  const replaceUrlParams = (keyOrKeys, value = null) => {
    updateUrlParams(keyOrKeys, value);
  };

  // Append params by key(s)
  const appendUrlParams = (keyOrKeys, value = null) => {
    updateUrlParams(keyOrKeys, value, false, true);
  };

  // Check if a specific parameter in URL exists
  const paramExists = (key, value = null) => {
    // current URL's query
    const searchParams = new URLSearchParams(location.search);
    if (value === null) {
      return searchParams.has(key);
    } else {
      return searchParams.has(key, value);
    }
  };

  // get value of specific parameter in URL
  const getUrlParams = (key) => {
    // current URL's query
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(key);
  };

  return {
    updateUrlParams,
    removeUrlParams,
    replaceUrlParams,
    appendUrlParams,
    paramExists,
    getUrlParams,
  };
};

export default useUrlParams;

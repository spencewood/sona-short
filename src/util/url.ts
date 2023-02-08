export const isValidUri = (uri: string): boolean => {
  try {
    new URL(uri);
    return true;
  } catch (err) {
    // error fallthrough
  }
  return false;
};

export const getScheme = (uri: string): string => {
  if (!isValidUri(uri)) {
    return "";
  }

  const url = new URL(uri);

  // remove ":" if it exists
  const schemeRe = /([^:]+):?/;
  const [, scheme] = url.protocol.match(schemeRe) ?? [];
  return scheme;
};

export const getPath = (uri: string): string => {
  if (!isValidUri(uri)) {
    return "";
  }

  const url = new URL(uri);

  return [url.pathname, url.hash].join("");
};

export const getRoot = (uri: string): string => {
  if (!isValidUri(uri)) {
    return "";
  }

  const url = new URL(uri);

  return url.host;
};

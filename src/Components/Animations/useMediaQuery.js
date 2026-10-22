import { useEffect, useState } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

export const useImageSize = () => {
  const isTablet = useMediaQuery('(min-width: 750px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  if (isDesktop) return 'desktop';
  return isTablet ? 'tablet' : 'mobile';
};

export default useMediaQuery;

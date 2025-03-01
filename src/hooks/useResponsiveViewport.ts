import { useEffect, useState } from 'react';

export default function useResponsiveViewport(
  width: number,
  delay: number = 100
) {
  const [isViewportWidthOrLess, setIsViewportWidthOrLess] =
    useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const newViewportState = window.innerWidth <= width;
      setIsViewportWidthOrLess(newViewportState);
    };

    const debounceResize = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(handleResize, delay);
    };

    let debounceTimeout: NodeJS.Timeout;

    // Initial check
    handleResize();

    window.addEventListener('resize', debounceResize);

    return () => {
      clearTimeout(debounceTimeout); // Clear the timeout on cleanup
      window.removeEventListener('resize', debounceResize);
    };
  }, [width, delay]);

  return isViewportWidthOrLess;
}

import { useState, useEffect, useRef } from "react";

export function useIconSize() {
  const [iconSize, setIconSize] = useState({ padding: '0.5rem', width: '0.75rem', height: '0.75rem' });
  const backIconRef = useRef(null);
  const settingsIconRef = useRef(null);

  useEffect(() => {
    const updateIconSize = () => {
      const width = window.innerWidth;
      let padding, iconWidth, iconHeight;
      
      if (width >= 2200) {
        padding = '1rem';
        iconWidth = '2.5rem';
        iconHeight = '2.5rem';
      } else if (width >= 1900) {
        padding = '0.875rem';
        iconWidth = '2.25rem';
        iconHeight = '2.25rem';
      } else if (width >= 1600) {
        padding = '0.75rem';
        iconWidth = '2rem';
        iconHeight = '2rem';
      } else if (width >= 1280) {
        padding = '0.555rem';
        iconWidth = '1.75rem';
        iconHeight = '1.75rem';
      } else if (width >= 1024) {
        padding = '0.375rem';
        iconWidth = '1rem';
        iconHeight = '1rem';
      } else if (width >= 768) {
        padding = '0.5rem';
        iconWidth = '1rem';
        iconHeight = '1rem';
      } else if (width >= 640) {
        padding = '0.375rem';
        iconWidth = '0.875rem';
        iconHeight = '0.875rem';
      } else {
        padding = '0.25rem';
        iconWidth = '0.75rem';
        iconHeight = '0.75rem';
      }

      setIconSize({ padding, width: iconWidth, height: iconHeight });
      
      // Directly update DOM elements
      if (backIconRef.current) {
        backIconRef.current.style.padding = padding;
        const icon = backIconRef.current.querySelector('svg');
        if (icon) {
          icon.style.width = iconWidth;
          icon.style.height = iconHeight;
        }
      }
      if (settingsIconRef.current) {
        settingsIconRef.current.style.padding = padding;
        const icon = settingsIconRef.current.querySelector('svg');
        if (icon) {
          icon.style.width = iconWidth;
          icon.style.height = iconHeight;
        }
      }
    };

    updateIconSize();
    window.addEventListener('resize', updateIconSize);
    return () => window.removeEventListener('resize', updateIconSize);
  }, []);

  return { iconSize, backIconRef, settingsIconRef };
}

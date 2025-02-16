// hooks/useAnimationSettings.js
import { useState, useEffect } from '@wordpress/element';
import { parseClassNames, generateAnimationClasses } from '../src/utils';

export const useAnimationSettings = (initialAttributes, setAttributes) => {
  const [settings, setSettings] = useState(() =>
    parseClassNames(initialAttributes.className)
  );

  useEffect(() => {
    if (initialAttributes.className) {
      const parsedSettings = parseClassNames(initialAttributes.className);
      setSettings(parsedSettings);
    }
  }, []);

  const updateSettings = newSettings => {
    const currentClasses = initialAttributes.className
      ? initialAttributes.className.split(' ')
      : [];

    const filteredClasses = currentClasses.filter(
      cls => !isAnimationClass(cls)
    );
    const newAnimationClasses = generateAnimationClasses(newSettings);
    const updatedClassName = [...filteredClasses, ...newAnimationClasses]
      .filter(Boolean)
      .join(' ');

    setSettings(newSettings);
    setAttributes({
      ...newSettings,
      className: updatedClassName || undefined,
    });
  };

  return [settings, updateSettings];
};

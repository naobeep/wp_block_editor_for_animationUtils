// components.js
import {
  TextControl,
  RangeControl,
  SelectControl,
} from '@wordpress/components';

import { createElement } from '@wordpress/element';

import {
  textAnimationOptions,
  wipeOptions,
  easingOptions,
  moveOptions,
  startPointOptions,
} from './constants';

export const renderRootMarginInput = (attributes, updateSettings) => {
  if (attributes.useRootMargin) {
    return createElement(TextControl, {
      label: 'Root Margin 値',
      type: 'number',
      value: attributes.rootMarginValue || '',
      onChange: value =>
        updateSettings({ ...attributes, rootMarginValue: value }),
    });
  }
  return null;
};

export const renderDurationInput = (attributes, updateSettings) => {
  if (attributes.useDuration) {
    return createElement(RangeControl, {
      label: 'Duration 倍率',
      value: attributes.durationValue || 1,
      onChange: value =>
        updateSettings({ ...attributes, durationValue: value }),
      min: 0.1,
      max: 10,
      step: 0.1,
      marks: [
        {
          value: 1,
          label: '標準',
        },
      ],
    });
  }
  return null;
};

export const renderEasingOption = (attributes, updateSettings) => {
  if (['box-animation', 'text-animation'].includes(attributes.animationClass)) {
    return createElement(SelectControl, {
      label: 'イージング',
      value: attributes.easingType || 'none',
      options: easingOptions,
      onChange: value => updateSettings({ ...attributes, easingType: value }),
    });
  }
  return null;
};

export const renderMoveOption = (attributes, updateSettings) => {
  if (['box-animation', 'text-animation'].includes(attributes.animationClass)) {
    return createElement(SelectControl, {
      label: '要素の移動',
      value: attributes.moveType || 'none',
      options: moveOptions,
      onChange: value => updateSettings({ ...attributes, moveType: value }),
    });
  }
  return null;
};

export const renderStartPointOption = (attributes, updateSettings) => {
  if (['text-animation'].includes(attributes.animationClass)) {
    return createElement(SelectControl, {
      label: '文字アニメーションの開始点',
      value: attributes.startPoint || 'none',
      options: startPointOptions,
      onChange: value => updateSettings({ ...attributes, startPoint: value }),
    });
  }
  return null;
};

export const renderTypeSpecificOptions = (attributes, updateSettings) => {
  switch (attributes.animationClass) {
    case 'text-animation':
      return createElement(SelectControl, {
        label: '特殊なテキストアニメーション',
        value: attributes.typeEffect || '',
        options: textAnimationOptions,
        onChange: value => updateSettings({ ...attributes, typeEffect: value }),
      });
    case 'wipe':
      return createElement(SelectControl, {
        label: 'ワイプエフェクト',
        value: attributes.typeEffect || '',
        options: wipeOptions,
        onChange: value => updateSettings({ ...attributes, typeEffect: value }),
      });
    default:
      return null;
  }
};

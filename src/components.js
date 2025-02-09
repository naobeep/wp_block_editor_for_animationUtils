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
  startPointOptions,
  getMoveOptions,
  wipeSettings,
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
      options: getMoveOptions(attributes.animationClass),
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





const getTypeEffectWithCount = (baseType, count) => {
  if (!baseType || baseType === 'none') return '';
  return `${baseType}${count}`;
};

// 現在のtypeEffectから基本タイプを取得する関数を追加
const getBaseEffectType = typeEffect => {
  if (!typeEffect || typeEffect === 'none') return 'none';
  return typeEffect.replace(/\d+$/, '');
};

export const renderWipeCountInput = (attributes, updateSettings) => {
  if (attributes.animationClass !== 'wipe') return null;

  const baseEffectType = getBaseEffectType(attributes.typeEffect);
  if (!['stripe', 'windmill'].includes(baseEffectType)) return null;

  const setting = wipeSettings[baseEffectType];
  const currentValue =
    baseEffectType === 'stripe'
      ? attributes.stripeCount
      : attributes.windmillCount;

  return createElement(TextControl, {
    label: setting.label,
    type: 'number',
    value: currentValue,
    min: setting.min,
    max: setting.max,
    onChange: value => {
      const numValue = parseInt(value, 10);
      if (isNaN(numValue) || numValue < setting.min || numValue > setting.max) {
        return;
      }

      const updates =
        baseEffectType === 'stripe'
          ? { stripeCount: numValue }
          : { windmillCount: numValue };

      updateSettings({
        ...attributes,
        ...updates,
        typeEffect: getTypeEffectWithCount(baseEffectType, numValue),
      });
    },
  });
};

export const renderTypeSpecificOptions = (attributes, updateSettings) => {
  switch (attributes.animationClass) {
    case 'text-animation':
      return createElement('div', null, [
        createElement(SelectControl, {
          label: '特殊なテキストアニメーション',
          value: attributes.typeEffect || '',
          options: textAnimationOptions,
          onChange: value =>
            updateSettings({ ...attributes, typeEffect: value }),
        }),
      ]);
    case 'wipe':
      return createElement('div', null, [
        createElement(SelectControl, {
          label: 'ワイプエフェクト',
          value: getBaseEffectType(attributes.typeEffect),
          options: wipeOptions,
          onChange: value => {
            if (value === 'none') {
              updateSettings({
                ...attributes,
                typeEffect: 'none',
                stripeCount: 1,
                windmillCount: 1,
              });
            } else {
              const count =
                value === 'stripe'
                  ? attributes.stripeCount
                  : attributes.windmillCount;
              updateSettings({
                ...attributes,
                typeEffect: getTypeEffectWithCount(value, count),
              });
            }
          },
        }),
        renderWipeCountInput(attributes, updateSettings),
      ]);
    default:
      return null;
  }

};

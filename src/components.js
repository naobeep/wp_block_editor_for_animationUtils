// components.js
import {
  TextControl,
  RangeControl,
  SelectControl,
  CheckboxControl,
} from '@wordpress/components';

import { createElement } from '@wordpress/element';

import {
  textAnimationOptions,
  wipeOptions,
  easingOptions,
  startPointOptions,
  getMoveOptions,
  wipeSettings,
  rotateOptions,
} from './constants';

export const renderRootMarginInput = (attributes, updateSettings) => {
  if (attributes.useRootMargin) {
    return createElement(TextControl, {
      label: 'アニメーション開始位置',
      type: 'number',
      value: attributes.rootMarginValue || '',
      onChange: value =>
        updateSettings({ ...attributes, rootMarginValue: value }),
      help: '要素が画面上端から何%の位置に来たらアニメーションを開始するかを設定します。100%で要素が画面に入った瞬間、0%で画面上端に到達した時点でアニメーションを開始します。',
    });
  }
  return null;
};

export const renderDurationInput = (attributes, updateSettings) => {
  if (attributes.useDuration) {
    return createElement(RangeControl, {
      label: 'アニメーション時間',
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
      help: '数値が大きいほどアニメーションがゆっくりになります。1が標準の速さです。',
    });
  }
  return null;
};

export const renderDelayInput = (attributes, updateSettings) => {
  if (attributes.useDelay) {
    return createElement(RangeControl, {
      label: '開始遅延時間',
      value: attributes.delayValue || 0,
      onChange: value => updateSettings({ ...attributes, delayValue: value }),
      min: 0,
      max: 10,
      step: 0.1,
      marks: [
        {
          value: 0,
          label: '遅延なし',
        },
      ],
      help: 'アニメーション開始までの待機時間を設定します。標準的なアニメーション時間を1とし、数値を指定することで本来同時に開始するアニメーションに時間差をつくり、順番に動かす演出が行えます。',
    });
  }
  return null;
};

export const renderOpacityInput = (attributes, updateSettings) => {
  if (attributes.useOpacity) {
    return createElement(RangeControl, {
      label: '初期透明度',
      value: attributes.initialOpacity || 0,
      onChange: value => {
        const newValue = Math.max(0, Math.min(100, value));
        updateSettings({ ...attributes, initialOpacity: newValue });
      },
      min: 0,
      max: 100,
      step: 1,
      marks: [
        {
          value: 0,
          label: '透明',
        },
        {
          value: 50,
          label: '50%',
        },
        {
          value: 100,
          label: '不透明',
        },
      ],
      help: 'アニメーション開始前の透明度を設定します。0%で完全に透明、100%で完全に不透明になります。',
    });
  }
  return null;
};

export const renderMoveDistanceInput = (attributes, updateSettings) => {
  const customMoveTypes = [
    'move-y-custom',
    'move-x-custom',
    'leave-y-custom',
    'leave-x-custom',
  ];

  const boxCustomMoveTypes = [
    'box-move-y-custom',
    'box-move-x-custom',
    'leave-box-y-custom',
    'leave-box-x-custom',
  ];

  if (customMoveTypes.includes(attributes.moveType)) {
    const isYAxis = attributes.moveType.includes('-y-');
    const axisLabel = isYAxis ? '上下' : '左右';

    return createElement(TextControl, {
      label: `${axisLabel}移動距離 (px)`,
      type: 'number',
      value: attributes.moveDistance || 0,
      onChange: value => {
        const numValue = parseInt(value, 10) || 0;
        const newMoveDistance = Math.max(-1000, Math.min(1000, numValue));
        updateSettings({ ...attributes, moveDistance: newMoveDistance });
      },
      help: '移動距離をピクセル単位で指定します。正の値は下/右方向、負の値は上/左方向への移動を表します。-1000から1000pxの範囲で設定できます。',
    });
  } else if (boxCustomMoveTypes.includes(attributes.moveType)) {
    const isYAxis = attributes.moveType.includes('-y-');
    const axisLabel = isYAxis ? '上下' : '左右';

    return createElement(TextControl, {
      label: `${axisLabel}移動量（ボックスサイズ倍率）`,
      type: 'number',
      value: attributes.boxSizeMultiplier || 1,
      onChange: value => {
        const numValue = parseFloat(value) || 0;
        const newMultiplier = Math.max(-10, Math.min(10, numValue));
        updateSettings({ ...attributes, boxSizeMultiplier: newMultiplier });
      },
      help: 'ボックスの高さ/幅を基準とした移動量を指定します。1でボックスサイズと同じ距離、2で2倍の距離を移動します。-10から10倍の範囲で設定できます。',
    });
  }
  return null;
};

export const renderScaleInput = (attributes, updateSettings) => {
  if (
    ['box-animation', 'text-animation'].includes(attributes.animationClass) &&
    attributes.useScale
  ) {
    return createElement(TextControl, {
      label: '拡大・縮小率',
      type: 'number',
      value: attributes.scaleValue || 1,
      onChange: value => {
        const numValue = parseFloat(value) || 1;
        updateSettings({ ...attributes, scaleValue: numValue });
      },
      help: '1が等倍、2で2倍、0.5で半分のサイズになります。マイナスの値を設定すると反転します。',
    });
  }
  return null;
};

export const renderRotateOptions = (attributes, updateSettings) => {
  if (['box-animation', 'text-animation'].includes(attributes.animationClass)) {
    return createElement('div', null, [
      createElement(SelectControl, {
        label: '回転',
        value: attributes.rotateType || 'none',
        options: rotateOptions,
        onChange: value =>
          updateSettings({
            ...attributes,
            rotateType: value,
            rotateValue: value === 'none' ? 0 : attributes.rotateValue || 0,
          }),
      }),
      attributes.rotateType !== 'none' &&
        createElement(TextControl, {
          label: '回転角度',
          type: 'number',
          value: attributes.rotateValue || 0,
          onChange: value => {
            const numValue = parseInt(value, 10) || 0;
            updateSettings({ ...attributes, rotateValue: numValue });
          },
          help: '360度で1回転します。マイナスの値を設定すると逆方向に回転します。',
        }),
      ['rotate', 'rotateX'].includes(attributes.rotateType) &&
        createElement(TextControl, {
          label: '回転中心のオフセット',
          type: 'number',
          value: attributes.rotateRadius || 0,
          onChange: value => {
            const numValue = parseInt(value, 10) || 0;
            updateSettings({ ...attributes, rotateRadius: numValue });
          },
          help: '回転の中心をY軸方向にずらす距離をピクセル単位で指定します。',
        }),
    ]);
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
      label: '文字アニメーションの発火順',
      value: attributes.startPoint || 'none',
      options: startPointOptions,
      onChange: value => updateSettings({ ...attributes, startPoint: value }),
    });
  }
  return null;
};

export const renderAmountOption = (attributes, updateSettings) => {
  if (attributes.animationClass === 'text-animation') {
    return createElement(CheckboxControl, {
      label: '一定期間内にアニメーションを完了させる',
      checked: attributes.useAmount || false,
      onChange: value => updateSettings({ ...attributes, useAmount: value }),
    });
  }
  return null;
};

export const getTypeEffectWithCount = (baseType, count) => {
  if (!baseType || baseType === 'none') return '';
  return `${baseType}${count}`;
};

export const getBaseEffectType = typeEffect => {
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

export const renderAngleInput = (attributes, updateSettings) => {
  // defaultまたはstripeの場合のみ表示
  const allowedTypes = ['none', 'stripe'];
  if (
    attributes.animationClass === 'wipe' &&
    allowedTypes.includes(getBaseEffectType(attributes.typeEffect)) &&
    attributes.useAngle
  ) {
    return createElement(RangeControl, {
      label: 'アングル（度）',
      value: attributes.angleValue || 0,
      onChange: value => {
        // -360から360までの値に制限
        const newValue = Math.max(-360, Math.min(360, value));
        updateSettings({ ...attributes, angleValue: newValue });
      },
      min: -360,
      max: 360,
      step: 1,
      marks: [
        {
          value: 0,
          label: '0°',
        },
        {
          value: 90,
          label: '90°',
        },
        {
          value: -90,
          label: '-90°',
        },
        {
          value: 180,
          label: '180°',
        },
        {
          value: -180,
          label: '-180°',
        },
      ],
    });
  }
  return null;
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
      const allowedTypes = ['none', 'stripe'];
      const baseEffectType = getBaseEffectType(attributes.typeEffect);

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
        allowedTypes.includes(baseEffectType) &&
          createElement(CheckboxControl, {
            label: 'アングルのカスタマイズ',
            checked: attributes.useAngle || false,
            onChange: value =>
              updateSettings({ ...attributes, useAngle: value }),
          }),
        renderAngleInput(attributes, updateSettings),
      ]);
    default:
      return null;
  }
};

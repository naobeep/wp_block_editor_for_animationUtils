// utils.js
import { getDefaultSettings } from './constants';
import { getBaseEffectType } from './components';

export const parseClassNames = className => {
  if (!className) return getDefaultSettings();

  const classes = className.split(' ');
  const settings = getDefaultSettings();

  // アニメーションタイプの検出
  const animationType = classes.find(cls =>
    ['text-animation', 'box-animation', 'wipe'].includes(cls)
  );
  if (animationType) settings.animationClass = animationType;

  // テキストアニメーション効果の検出
  const textEffect = classes.find(cls =>
    [
      'standup',
      'typewriter',
      'whirl-wind',
      'whirl-wind2',
      'scrub',
      'pin',
    ].includes(cls)
  );
  if (textEffect) settings.typeEffect = textEffect;

  // ワイプエフェクトとその数値の検出
  const wipeEffectClass = classes.find(cls =>
    cls.match(/^(stripe|windmill|ripple)\d+$/)
  );

  if (wipeEffectClass) {
    const match = wipeEffectClass.match(/^(stripe|windmill|ripple)(\d+)$/);
    if (match) {
      const [, effectType, count] = match;
      settings.typeEffect = wipeEffectClass;
      if (effectType === 'stripe') {
        settings.stripeCount = parseInt(count, 10);
      } else if (effectType === 'windmill') {
        settings.windmillCount = parseInt(count, 10);
      } else if (effectType === 'ripple') {
        settings.rippleCount = parseInt(count, 10);
      }
    }
  }

  // アングルの検出
  const angleClass = classes.find(cls => cls.match(/^-?\d+deg$/));
  if (angleClass) {
    settings.useAngle = true;
    settings.angleValue = parseInt(angleClass, 10);
  }

  // Root Margin の検出
  const rootMargin = classes.find(cls => cls.startsWith('root-margin'));
  if (rootMargin) {
    settings.useRootMargin = true;
    settings.rootMarginValue = rootMargin.replace('root-margin', '');
  }

  // Duration の検出
  const duration = classes.find(cls => cls.startsWith('duration'));
  if (duration) {
    settings.useDuration = true;
    settings.durationValue = parseFloat(duration.replace('duration', ''));
  }

  // Delay の検出
  const delay = classes.find(cls => cls.startsWith('delay'));
  if (delay) {
    settings.useDelay = true;
    settings.delayValue = parseFloat(delay.replace('delay', ''));
  }

  // イージングの検出
  const easing = classes.find(cls =>
    ['linear', 'back', 'bounce', 'elastic', 'stepped', 'slowMo'].includes(cls)
  );
  if (easing) settings.easingType = easing;

  // 初期透過度の検出
  const alphaClass = classes.find(cls => cls.match(/^alpha\d+$/));
  if (alphaClass) {
    const opacity = parseInt(alphaClass.replace('alpha', ''), 10);
    settings.useOpacity = true;
    settings.initialOpacity = opacity;
  }

  // スケールの検出
  const scaleClass = classes.find(cls => cls.startsWith('scale'));
  if (scaleClass) {
    settings.useScale = true;
    settings.scaleValue = parseFloat(scaleClass.replace('scale', ''));
  }

  // 回転の検出
  const rotateClass = classes.find(cls => {
    return cls.match(/^(rotate|rotateX|rotateY)-?\d+$/);
  });

  if (rotateClass) {
    const match = rotateClass.match(/^(rotate|rotateX|rotateY)(-?\d+)$/);
    if (match) {
      const [, type, value] = match;
      settings.rotateType = type;
      settings.rotateValue = parseInt(value, 10);
    }
  }

  // 回転半径の検出
  const rotateRadiusClass = classes.find(cls =>
    cls.match(/^rotate-radius-?\d+$/)
  );
  if (rotateRadiusClass) {
    const radius = parseInt(rotateRadiusClass.replace('rotate-radius', ''), 10);
    settings.rotateRadius = radius;
  }

  // 移動タイプの検出
  const moveType = classes.find(cls =>
    [
      'horizontal',
      'vertical',
      'vertical-up',
      'move-y',
      'move-x',
      'leave-y',
      'leave-x',
      'leave-box-y',
      'leave-box-x',
      'leave-horizontal',
      'leave-vertical',
      'leave-vertical-up',
    ].includes(cls)
  );
  if (moveType) settings.moveType = moveType;

  // 移動タイプと距離の検出
  const moveClass = classes.find(cls => {
    return cls.match(/^(move-[xy]|leave-[xy])-?\d+$/);
  });

  // ボックスサイズベースの移動の検出
  const boxMoveClass = classes.find(cls => {
    return cls.match(/^(box-move-[xy]|leave-box-[xy])-?[\d.]+$/);
  });

  if (moveClass) {
    const match = moveClass.match(/^(move-[xy]|leave-[xy])(-?\d+)$/);
    if (match) {
      const [, baseType, distance] = match;
      settings.moveType = `${baseType}-custom`;
      settings.moveDistance = parseInt(distance, 10);
    }
  } else if (boxMoveClass) {
    const match = boxMoveClass.match(
      /^(box-move-[xy]|leave-box-[xy])(-?[\d.]+)$/
    );
    if (match) {
      const [, baseType, multiplier] = match;
      settings.moveType = `${baseType}-custom`;
      settings.boxSizeMultiplier = parseFloat(multiplier);
    }
  } else {
    // 既存の移動タイプの検出（変更なし）
    const moveType = classes.find(cls =>
      [
        'horizontal',
        'vertical',
        'vertical-up',
        'leave-horizontal',
        'leave-vertical',
        'leave-vertical-up',
      ].includes(cls)
    );
    if (moveType) settings.moveType = moveType;
  }

  // 開始位置の検出
  const startPoint = classes.find(cls =>
    ['shuffle', 'end', 'center', 'edge'].includes(cls)
  );
  if (startPoint) settings.startPoint = startPoint;

  // amount クラスの検出
  if (classes.includes('amount')) {
    settings.useAmount = true;
  }

  return settings;
};

export const isAnimationClass = className => {
  return [
    'text-animation',
    'box-animation',
    'wipe',
    'root-margin',
    'duration',
    'delay',
    'linear',
    'back',
    'bounce',
    'elastic',
    'stepped',
    'slowMo',
    'horizontal',
    'vertical',
    'vertical-up',
    'move-y',
    'move-x',
    'leave-y',
    'leave-x',
    'leave-box-y',
    'leave-box-x',
    'leave-horizontal',
    'leave-vertical',
    'leave-vertical-up',
    'shuffle',
    'end',
    'center',
    'edge',
    'standup',
    'typewriter',
    'whirl-wind',
    'whirl-wind2',
    'scrub',
    'pin',
    'scale',
    'rotate',
    'rotateX',
    'rotateY',
    'amount',
  ].some(prefix => {
    if (className.match(/^alpha\d+$/)) {
      return true;
    }
    if (className.match(/^(move-[xy]|leave-[xy])-?\d+$/)) {
      return true;
    }
    if (className.match(/^(box-move-[xy]|leave-box-[xy])-?[\d.]+$/)) {
      return true;
    }
    if (className.match(/^-?\d+deg$/)) {
      return true;
    }
    if (className.match(/^scale-?[\d.]+$/)) {
      return true;
    }
    if (className.match(/^(rotate|rotateX|rotateY)-?\d+$/)) {
      return true;
    }
    if (className.match(/^(stripe|windmill|ripple)\d+$/)) {
      return true;
    }
    if (className.match(/^rotate-radius-?\d+$/)) {
      return true;
    }
    return className === prefix || className.startsWith(`${prefix}`);
  });
};

export const generateAnimationClasses = settings => {
  if (!settings.animationClass || settings.animationClass === 'none') {
    return [];
  }

  const classes = [settings.animationClass];

  if (settings.typeEffect) {
    classes.push(settings.typeEffect);
  }

  if (settings.useRootMargin && settings.rootMarginValue) {
    classes.push(`root-margin${settings.rootMarginValue}`);
  }

  if (
    settings.useDuration &&
    settings.durationValue &&
    settings.durationValue !== 1
  ) {
    classes.push(`duration${settings.durationValue}`);
  }

  if (settings.useDelay) {
    classes.push(`delay${settings.delayValue}`);
  }

  if (settings.easingType && settings.easingType !== 'none') {
    classes.push(settings.easingType);
  }

  if (
    ['box-animation', 'text-animation'].includes(settings.animationClass) &&
    settings.useOpacity &&
    typeof settings.initialOpacity === 'number' &&
    settings.initialOpacity > 0
  ) {
    classes.push(`alpha${settings.initialOpacity}`);
  }

  if (settings.rotateType && settings.rotateType !== 'none') {
    classes.push(`${settings.rotateType}${settings.rotateValue}`);
  }

  if (
    ['rotate', 'rotateX'].includes(settings.rotateType) &&
    typeof settings.rotateRadius === 'number' &&
    settings.rotateRadius !== 0
  ) {
    classes.push(`rotate-radius${settings.rotateRadius}`);
  }

  if (settings.moveType && settings.moveType !== 'none') {
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

    if (customMoveTypes.includes(settings.moveType)) {
      const baseType = settings.moveType.replace('-custom', '');
      classes.push(`${baseType}${settings.moveDistance}`);
    } else if (boxCustomMoveTypes.includes(settings.moveType)) {
      const baseType = settings.moveType.replace('-custom', '');
      classes.push(`${baseType}${settings.boxSizeMultiplier}`);
    } else {
      classes.push(settings.moveType);
    }
  }

  if (settings.startPoint && settings.startPoint !== 'none') {
    classes.push(settings.startPoint);
  }

  // アングルクラスの追加
  if (
    settings.animationClass === 'wipe' &&
    ['none', 'stripe'].includes(getBaseEffectType(settings.typeEffect)) &&
    settings.useAngle &&
    settings.angleValue !== 0
  ) {
    classes.push(`${settings.angleValue}deg`);
  }

  if (settings.useScale && settings.scaleValue !== 1) {
    classes.push(`scale${settings.scaleValue}`);
  }

  if (settings.useAmount) {
    classes.push('amount');
  }

  return classes;
};

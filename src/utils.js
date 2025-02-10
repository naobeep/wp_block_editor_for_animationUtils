// utils.js
import { getDefaultSettings } from './constants';
import { getBaseEffectType } from "./components";

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

  // ワイプ効果の検出
  const wipeEffect = classes.find(cls => ['stripe', 'windmill'].includes(cls));
  if (wipeEffect) settings.typeEffect = wipeEffect;

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
    'stripe',
    'windmill',
  ].some(prefix => {
    if (className.match(/^(move-[xy]|leave-[xy])-?\d+$/)) {
      return true;
    }
    if (className.match(/^(box-move-[xy]|leave-box-[xy])-?[\d.]+$/)) {
      return true;
    }
    if (className.match(/^-?\d+deg$/)) {
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

  return classes;
};

// constants.js
export const getDefaultSettings = () => ({
  animationClass: 'none',
  typeEffect: '',
  useRootMargin: false,
  rootMarginValue: '',
  useDuration: false,
  durationValue: 1,
  useDelay: false, // 追加
  delayValue: 0, // 追加
  easingType: 'none',
  moveType: 'none',
  moveDistance: 0,
  rotateType: 'none',
  rotateValue: 360,
  useScale: false,
  scaleValue: 1,
  boxSizeMultiplier: 1,
  startPoint: 'none',
  useAngle: false,
  angleValue: 0,
  stripeCount: 5,
  windmillCount: 1,
});

export const animationOptions = [
  { label: 'なし', value: 'none' },
  { label: 'テキストアニメーション', value: 'text-animation' },
  { label: 'ボックスアニメーション', value: 'box-animation' },
  { label: 'ワイプ', value: 'wipe' },
];

export const easingOptions = [
  { label: 'なし', value: 'none' },
  { label: 'Linear', value: 'linear' },
  { label: 'Back', value: 'back' },
  { label: 'Bounce', value: 'bounce' },
  { label: 'Elastic', value: 'elastic' },
  { label: 'Stepped', value: 'stepped' },
  { label: 'SlowMo', value: 'slowMo' },
];

const commonMoveOptions = [
  { label: 'なし', value: 'none' },
  { label: '水平に移動', value: 'horizontal' },
  { label: '画面外から垂直に落下', value: 'vertical' },
  { label: '画面外から垂直に上昇', value: 'vertical-up' },
  { label: 'Y軸で移動（数値指定）', value: 'move-y-custom' },
  { label: 'X軸で移動（数値指定）', value: 'move-x-custom' },
  { label: 'Y軸で離脱（数値指定）', value: 'leave-y-custom' },
  { label: 'X軸で離脱（数値指定）', value: 'leave-x-custom' },
  { label: '水平に離脱', value: 'leave-horizontal' },
  { label: '垂直に離脱（上方向）', value: 'leave-vertical' },
  { label: '垂直に離脱（下方向）', value: 'leave-vertical-down' },
];

const boxMoveOptions = [
  ...commonMoveOptions,
  {
    label: 'Y軸にボックスサイズ分移動（倍率指定）',
    value: 'box-move-y-custom',
  },
  {
    label: 'X軸にボックスサイズ分移動（倍率指定）',
    value: 'box-move-x-custom',
  },
  {
    label: 'Y軸でボックスサイズ分離脱（倍率指定）',
    value: 'leave-box-y-custom',
  },
  {
    label: 'X軸でボックスサイズ分離脱（倍率指定）',
    value: 'leave-box-x-custom',
  },
];

// moveOptionsを動的に取得する関数
export const getMoveOptions = animationType => {
  if (animationType === 'box-animation') {
    return boxMoveOptions;
  }
  return commonMoveOptions;
};

export const rotateOptions = [
  { label: 'なし', value: 'none' },
  { label: '回転', value: 'rotate' },
  { label: 'X軸で回転', value: 'rotateX' },
  { label: 'Y軸で回転', value: 'rotateY' },
];

export const startPointOptions = [
  { label: 'なし（文頭から）', value: 'none' },
  { label: 'ランダム', value: 'shuffle' },
  { label: '末尾から', value: 'end' },
  { label: '真ん中から', value: 'center' },
  { label: '両端から', value: 'edge' },
];

export const textAnimationOptions = [
  { label: 'なし', value: 'none' },
  { label: 'Standup', value: 'standup' },
  { label: 'タイプライター', value: 'typewriter' },
  { label: 'Whirlwind', value: 'whirl-wind' },
  { label: 'Whirlwind2', value: 'whirl-wind2' },
  { label: 'スクラブ', value: 'scrub' },
  { label: 'ピン留め', value: 'pin' },
];

export const wipeOptions = [
  { label: 'default', value: 'none' },
  { label: 'ストライプ', value: 'stripe' },
  { label: 'ウインドミル', value: 'windmill' },
];

// ワイプエフェクトの設定範囲を修正
export const wipeSettings = {
  stripe: {
    min: 1,
    max: 100,
    label: 'ストライプの数',
  },
  windmill: {
    min: 1,
    max: 360,
    label: 'ウインドミルの数',
  },
};

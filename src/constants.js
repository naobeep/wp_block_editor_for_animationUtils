// constants.js
export const getDefaultSettings = () => ({
  animationClass: 'none',
  typeEffect: '',
  useRootMargin: false,
  rootMarginValue: 80,
  useDuration: false,
  durationValue: 1,
  useDelay: false,
  delayValue: 0,
  useOpacity: false,
  initialOpacity: 0,
  easingType: 'none',
  moveType: 'none',
  moveDistance: 100,
  rotateType: 'none',
  rotateValue: 360,
  rotateRadius: 0,
  useScale: false,
  scaleValue: 1,
  boxSizeMultiplier: 1,
  startPoint: 'none',
  useAmount: false,
  useAngle: false,
  angleValue: 0,
  stripeCount: 5,
  windmillCount: 1,
});

// constants.js
export const animationOptions = [
  { label: 'なし', value: 'none' },
  { label: '文字単位のアニメーション', value: 'text-animation' },
  { label: 'ブロック単位のアニメーション', value: 'box-animation' },
  { label: 'ワイプエフェクト', value: 'wipe' },
];

export const easingOptions = [
  { label: 'なし（ゆっくりと減速）', value: 'none' },
  { label: '一定速度', value: 'linear' },
  { label: '跳ね返り効果', value: 'back' },
  { label: 'バウンド効果', value: 'bounce' },
  { label: '弾性効果', value: 'elastic' },
  { label: 'コマ送り効果', value: 'stepped' },
  { label: 'スローモーション', value: 'slowMo' },
];

const commonMoveOptions = [
  { label: 'なし', value: 'none' },
  { label: '左から右へスライド', value: 'horizontal' },
  { label: '上から下へ移動', value: 'vertical' },
  { label: '下から上へ移動', value: 'vertical-up' },
  { label: '上下に移動（カスタム）', value: 'move-y-custom' },
  { label: '左右に移動（カスタム）', value: 'move-x-custom' },
  { label: '上下に退場（カスタム）', value: 'leave-y-custom' },
  { label: '左右に退場（カスタム）', value: 'leave-x-custom' },
  { label: '左右に退場', value: 'leave-horizontal' },
  { label: '上方向に退場', value: 'leave-vertical' },
  { label: '下方向に退場', value: 'leave-vertical-down' },
];

const boxMoveOptions = [
  ...commonMoveOptions,
  { label: '上下にボックスサイズ基準で移動', value: 'box-move-y-custom' },
  { label: '左右にボックスサイズ基準で移動', value: 'box-move-x-custom' },
  { label: '上下にボックスサイズ基準で退場', value: 'leave-box-y-custom' },
  { label: '左右にボックスサイズ基準で退場', value: 'leave-box-x-custom' },
];

export const rotateOptions = [
  { label: 'なし', value: 'none' },
  { label: '2D回転', value: 'rotate' },
  { label: 'X軸回転', value: 'rotateX' },
  { label: 'Y軸回転', value: 'rotateY' },
];

export const startPointOptions = [
  { label: '左から右へ順番に', value: 'none' },
  { label: 'ランダム順', value: 'shuffle' },
  { label: '右から左へ順番に', value: 'end' },
  { label: '中央から外側へ', value: 'center' },
  { label: '両端から中央へ', value: 'edge' },
];

export const textAnimationOptions = [
  { label: 'なし', value: 'none' },
  { label: '文字起き上がり', value: 'standup' },
  { label: '文字吊り下がり', value: 'hang-down' },
  { label: 'タイプライター', value: 'typewriter' },
  { label: 'つむじ風（1回転）', value: 'whirl-wind' },
  { label: 'つむじ風（2回転）', value: 'whirl-wind2' },
  { label: 'スクラブ', value: 'scrub' },
  { label: 'ピン留め', value: 'pin' },
];

export const wipeOptions = [
  { label: '通常のスライド', value: 'none' },
  { label: 'ストライプ効果', value: 'stripe' },
  { label: '扇形効果', value: 'windmill' },
];

// moveOptionsを動的に取得する関数
export const getMoveOptions = animationType => {
  if (animationType === 'box-animation') {
    return boxMoveOptions;
  }
  return commonMoveOptions;
};

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
    label: '羽の数',
  },
};

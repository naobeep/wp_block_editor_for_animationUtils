/*!
 * block-classes.js 1.1.0
 * https://github.com/naobeep/wp_block_editor_for_animationUtils
 *
 * @author: naobeep
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/blockEditor';
import {
  PanelBody,
  RadioControl,
  CheckboxControl,
} from '@wordpress/components';
import { createElement } from '@wordpress/element';

import { getDefaultSettings, animationOptions } from './constants';
import {
  parseClassNames,
  isAnimationClass,
  generateAnimationClasses,
} from './utils';
import {
  renderRootMarginInput,
  renderDurationInput,
  renderDelayInput,
  renderEasingOption,
  renderOpacityInput,
  renderMoveOption,
  renderMoveDistanceInput,
  renderStartPointOption,
  renderTypeSpecificOptions,
  renderScaleInput,
  renderRotateOptions,
  renderAmountOption,
} from './components';

const withAnimationClasses = createHigherOrderComponent(BlockEdit => {
  return props => {
    const { attributes, setAttributes } = props;

    // コンポーネントのマウント時に既存のクラスを解析
    wp.element.useEffect(() => {
      if (props.attributes.className) {
        const parsedSettings = parseClassNames(props.attributes.className);
        setAttributes(parsedSettings);
      }
    }, []);

    // 設定を更新する関数
    const updateSettings = newSettings => {
      const currentClasses = attributes.className
        ? attributes.className.split(' ')
        : [];
      const filteredClasses = currentClasses.filter(
        cls => !isAnimationClass(cls)
      );
      const newAnimationClasses = generateAnimationClasses(newSettings);
      const updatedClassName = [...filteredClasses, ...newAnimationClasses]
        .filter(Boolean)
        .join(' ');

      setAttributes({
        ...newSettings,
        className: updatedClassName || undefined,
      });
    };

    const renderCommonOptions = () => {
      return [
        createElement(CheckboxControl, {
          label: 'Root Margin のカスタマイズ',
          checked: attributes.useRootMargin || false,
          onChange: value =>
            updateSettings({ ...attributes, useRootMargin: value }),
        }),
        renderRootMarginInput(attributes, updateSettings),
        createElement(CheckboxControl, {
          label: 'Duration のカスタマイズ',
          checked: attributes.useDuration || false,
          onChange: value =>
            updateSettings({ ...attributes, useDuration: value }),
        }),
        renderDurationInput(attributes, updateSettings),
        createElement(CheckboxControl, {
          label: 'Delay のカスタマイズ',
          checked: attributes.useDelay || false,
          onChange: value => updateSettings({ ...attributes, useDelay: value }),
        }),
        renderDelayInput(attributes, updateSettings),
        ['box-animation', 'text-animation'].includes(
          attributes.animationClass
        ) &&
          createElement(CheckboxControl, {
            label: '初期透過度のカスタマイズ',
            checked: attributes.useOpacity || false,
            onChange: value =>
              updateSettings({ ...attributes, useOpacity: value }),
          }),
        renderOpacityInput(attributes, updateSettings),
        renderEasingOption(attributes, updateSettings),
        renderMoveOption(attributes, updateSettings),
        renderMoveDistanceInput(attributes, updateSettings),
        renderRotateOptions(attributes, updateSettings),
        ['box-animation', 'text-animation'].includes(
          attributes.animationClass
        ) &&
          createElement(CheckboxControl, {
            label: 'スケールのカスタマイズ',
            checked: attributes.useScale || false,
            onChange: value =>
              updateSettings({ ...attributes, useScale: value }),
          }),
        renderScaleInput(attributes, updateSettings),
        renderStartPointOption(attributes, updateSettings),
        renderAmountOption(attributes, updateSettings),
      ];
    };

    const renderOptions = () => {
      if (!attributes.animationClass || attributes.animationClass === 'none') {
        return null;
      }
      return [
        renderCommonOptions(),
        renderTypeSpecificOptions(attributes, updateSettings),
      ];
    };

    return createElement(Fragment, null, [
      createElement(BlockEdit, props),
      createElement(
        InspectorControls,
        null,
        createElement(
          PanelBody,
          {
            title: 'アニメーション設定',
            initialOpen: false,
          },
          [
            createElement(RadioControl, {
              label: 'アニメーションタイプ',
              selected: attributes.animationClass || 'none',
              options: animationOptions,
              onChange: value =>
                updateSettings({
                  ...getDefaultSettings(),
                  animationClass: value,
                }),
            }),
            renderOptions(),
          ]
        )
      ),
    ]);
  };
}, 'withAnimationClasses');

// フィルターの登録
wp.hooks.addFilter(
  'editor.BlockEdit',
  'block-animation-classes/with-animation',
  withAnimationClasses
);

// ブロックの保存時にクラスを適用
wp.hooks.addFilter(
  'blocks.getSaveContent.extraProps',
  'block-animation-classes/apply-classes',
  function (extraProps, blockType, attributes) {
    if (attributes.animationClass && attributes.animationClass !== 'none') {
      let className = attributes.animationClass;

      if (attributes.typeEffect) {
        className += ` ${attributes.typeEffect}`;
      }

      if (attributes.useRootMargin && attributes.rootMarginValue) {
        className += ` root-margin${attributes.rootMarginValue}`;
      }

      if (
        attributes.useDuration &&
        attributes.durationValue &&
        attributes.durationValue !== 1
      ) {
        className += ` duration${attributes.durationValue}`;
      }

      if (
        attributes.useDelay &&
        attributes.delayValue &&
        attributes.delayValue !== 0
      ) {
        className += ` delay${attributes.delayValue}`;
      }

      if (attributes.easingType && attributes.easingType !== 'none') {
        className += ` ${attributes.easingType}`;
      }

      if (attributes.moveType && attributes.moveType !== 'none') {
        className += ` ${attributes.moveType}`;
      }

      if (attributes.moveType && attributes.moveType !== 'none') {
        const customMoveTypes = [
          'move-y-custom',
          'move-x-custom',
          'leave-y-custom',
          'leave-x-custom',
        ];

        if (customMoveTypes.includes(attributes.moveType)) {
          const baseType = attributes.moveType.replace('-custom', '');
          className += ` ${baseType}${attributes.moveDistance}`;
        } else {
          className += ` ${attributes.moveType}`;
        }
      }

      if (attributes.startPoint && attributes.startPoint !== 'none') {
        className += ` ${attributes.startPoint}`;
      }
    }
    return extraProps;
  }
);

// テストや再利用のためにエクスポート
export default withAnimationClasses;

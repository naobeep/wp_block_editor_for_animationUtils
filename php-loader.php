<?php
// block-animation-loader.php

function enqueue_block_animation_assets() {
    $asset_file = include(plugin_dir_path(__FILE__) . 'build/block-animation.asset.php');
    
    wp_enqueue_script(
        'block-animation-classes',
        plugins_url('build/block-animation.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version']
    );
}
add_action('enqueue_block_editor_assets', 'enqueue_block_animation_assets');

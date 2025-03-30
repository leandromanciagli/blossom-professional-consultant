<?php

function cargar_estilos_y_scripts() {
    wp_enqueue_style('my-styles', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'cargar_estilos_y_scripts');

?>

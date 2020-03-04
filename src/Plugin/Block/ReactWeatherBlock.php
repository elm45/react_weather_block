<?php

namespace Drupal\react_weather_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'ReactWeatherBlock' block.
 *
 * @Block(
 *  id = "react_weather_block",
 *  admin_label = @Translation("React weather block"),
 * )
 */
class ReactWeatherBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['react_weather_block'] = [
      '#markup' => '<div id="weather-app"></div>',
      '#attached' => [
        'library' => 'react_weather_block/react-weather-block'
      ],
    ];
    return $build;
  }
}
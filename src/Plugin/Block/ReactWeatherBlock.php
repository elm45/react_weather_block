<?php

namespace Drupal\react_weather_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

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
    $config = $this->getConfiguration();

    $build = [];
    $build['react_weather_block'] = [
      '#markup' => '<div id="weather-app">Loading...</div>',
      '#attached' => [
        'library' => ['react_weather_block/react', 'react_weather_block/react-weather-block'],
      ],
    ];

    $build['#attached']['drupalSettings']['ReactWeatherBlock'] = [
      'apiKey' => $config['react_weather_block_api'],
      'zipCode' => $config['react_weather_block_zip'],
    ];

    return $build;
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);

    $default_config = \Drupal::config('react_weather_block.settings');
    $config = $this->getConfiguration();

    $form['react_weather_block_api'] = array (
      '#type' => 'textfield',
      '#title' => $this->t('Open Weather API Key'),
      '#description' => $this->t('If you need an Open Weather API key, you can get a free one by <a target="_blank" href="https://home.openweathermap.org/users/sign_up" title="Visit the Open Weather \'create account\' page in a new tab.">creating an Open Weather account</a>.'),
      '#required' => TRUE,
      '#default_value' => isset($config['react_weather_block_api']) ? $config['react_weather_block_api'] : $default_config->get('hello.name'),
    );

    $form['react_weather_block_zip'] = array (
      '#type' => 'textfield',
      '#title' => $this->t('Default Zip'),
      '#description' => $this->t('The zip code of the city for which you would like to display current weather.'),
      '#default_value' => isset($config['react_weather_block_zip']) ? $config['react_weather_block_zip'] : $default_config->get('hello.name'),
    );

    return $form;
  }

    /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->setConfigurationValue('react_weather_block_api', $form_state->getValue('react_weather_block_api'));
    $this->setConfigurationValue('react_weather_block_zip', $form_state->getValue('react_weather_block_zip'));

  }

}

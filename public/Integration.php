<?php

namespace EasyMiner\MiningUI2;

/**
 * Class Integration
 * @package EasyMiner\MiningUI2
 * @license http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
 */
class Integration
{
  /**
   * @var $javascriptFiles - this array contains list of javascript files for inclusion into page
   */
  public static $javascriptFiles = [
    'config',
  ];

  /**i
   * @var $cssFiles - this array contains list of CSS files for inclusion into page
   */
  public static $cssFiles = [
  ];

  static function parseAbsolutePath($absolutePath)
  {
    $parts = explode("/", $absolutePath);
    $relativeParts = array_slice($parts, count($parts) - 2);
    return join("/", $relativeParts);
  }

  static function init()
  {
    $indexJsAbsolutePath = glob(__DIR__ . "/assets/index-*.js")[0];
    $indexCssAbsolutePath = glob(__DIR__ . "/assets/index-*.css")[0];

    self::$javascriptFiles[] = self::parseAbsolutePath($indexJsAbsolutePath);
    self::$cssFiles[] = self::parseAbsolutePath($indexCssAbsolutePath);
  }
}

Integration::init();
<?php

namespace EasyMiner\MiningUI2;

/**
 * Class Integration
 * @package EasyMiner\MiningUI2
 * @license http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
 */
class Integration {

  private static $initialized = false;

  /**
   * @var $javascriptFiles - this array contains list of javascript files for inclusion into page
   */
  private static $javascriptFiles = [
    'config',
  ];

  /**
   * @var $cssFiles - this array contains list of CSS files for inclusion into page
   */
  private static $cssFiles = [
  ];

  public static function getJavascriptFiles(){
    if (!self::$initialized){
      self::init();
    }
    return self::$javascriptFiles;
  }

  public static function getCssFiles(){
    if (!self::$initialized){
      self::init();
    }
    return self::$cssFiles;
  }

  private static function parseAbsolutePath($absolutePath){
    $parts = explode("/", $absolutePath);
    $relativeParts = array_slice($parts, count($parts) - 2);
    return join("/", $relativeParts);
  }

  private static function init(){
    $indexJsAbsolutePath = glob(__DIR__ . "/assets/index-*.js")[0];
    $indexCssAbsolutePath = glob(__DIR__ . "/assets/index-*.css")[0];

    self::$javascriptFiles[] = [
      'src' => self::parseAbsolutePath($indexJsAbsolutePath),
      'type' => 'module',
    ];
    self::$cssFiles[] = [
      'href' => self::parseAbsolutePath($indexCssAbsolutePath),
      'type' => 'text/css'
    ];
  }
}

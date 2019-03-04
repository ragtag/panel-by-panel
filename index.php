<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="apple-touch-icon" sizes="57x57" href="/pbp/favicons/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/pbp/favicons/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/pbp/favicons/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/pbp/favicons/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/pbp/favicons/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/pbp/favicons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/pbp/favicons/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/pbp/favicons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/pbp/favicons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/pbp/favicons/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/pbp/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/pbp/favicons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/pbp/favicons/favicon-16x16.png">
    <link rel="manifest" href="/pbp/favicons/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/pbp/favicons/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <?php require "pbp/panelbypanel.php" ?>
    <title><?= $pbp->get_title() ?> - <?= $pbp->get_page_of() ?></title>
    <link rel="stylesheet" href="/pbp/style.css">
    <noscript><link rel="stylesheet" href="/pbp/noscript.css"></noscript>
    <script type="text/javascript" src="/external/anime.min.js"></script>
    <script type="text/javascript" src="/pbp/panelbypanel.js"></script>
  </head>
  <body bgcolor="<?= $pbp->get_bgcolor() ?>">
    <div id="menuzone">
      <div id="menu">
	<div id="menu-left">
	  <a href="/<?= $pbp->get_home() ?>" id="homebtn">
	    <img src="/pbp/images/back.svg" />
	  </a>
	</div>
	<div id="menu-center">
	  <a href="" id="aboutbtn" class="button">
	    <img src="/pbp/images/about.svg" alt="About this comic" />
	  </a>
	  <a href="#" id="pbpbtn" class="button">
	    <img src="/pbp/images/panel-by-panel.svg" alt="Toggle Panel by Panel navigation" />
	  </a>
	  <a href="" id="helpbtn" class="button">
	    <img src="/pbp/images/help.svg" alt="Help" />
	  </a>
	</div>
	<div id="menu-right">
	  <a href="/<?= $pbp->get_thumbs() ?>" id="thumbsbtn" alt="Show page overview">
	    <img src="/pbp/images/pages.svg" />
	  </a>
	</div>
      </div>
    </div>
    <div id="bubble-container">
    <div id="help" class="bubble">
      <div id="help-inner">
	<h3>Flip Through the Comic</h3>
	<ul>
	  <li>Click the left or right third of your screen</li>
	  <li>Swipe left or right</li>
	  <li>Use the left or right arrow keys</li>
	  <li>Use Page Up or Down (always flips through pages)</li>
	</ul>
	<h3>Pages or Panels</h3>
	<ul>
	  <li>Toggle panel by panel mode in the top menu</li>
	</ul>
      </div>
    </div>
    <div id="about" class="bubble">
      <div id="about-inner">
      <h3><?= $pbp->get_title() ?></h3>
      <?= $pbp->get_summary() ?>
      <?= $pbp->get_authors() ?>
    </div>
    </div>
    </div>
    <div id="navcontainer">
      <a href="/<?= $pbp->get_prev() ?>" class="navbtn" id="prevbtn"></a>
      <a href="#" class="navbtn" id="menubtn"></a>
      <a href="/<?= $pbp->get_next() ?>" class="navbtn" id="nextbtn"></a>
    </div>
    <div id="pagecontainer">
      <img src="/<?= $pbp->get_image() ?>"
	   id="page"
	   style="transform: translate(-50%, -50%);" />
    </div>
  </body>
</html>

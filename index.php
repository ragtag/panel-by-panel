<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <?php require "panel-by-panel.php" ?>
    <title><?= get_title($page, $acbf) ?></title>
    <link rel="stylesheet" href="style.css">
    <noscript><link rel="stylesheet" href="noscript.css"></noscript>
    <script type="text/javascript" src="js/anime.min.js"></script>
    <script type="text/javascript" src="js/panelbypanel.js"></script>
  </head>
  <body bgcolor="<?= get_bgcolor($page, $acbf) ?>">
    <div id="container">
      <nav>
	<a href="<?= get_prev($comic, $page, $acbf) ?>" class="navbtn" id="prevbtn"></a>
	<a href="#" class="navbtn" id="menubtn"></a>
	<a href="<?= get_next($comic, $page, $acbf) ?>" class="navbtn" id="nextbtn"></a>
	<div id="menu">
	  <div id="menu-left">
	    <a href="<?php echo $home ?>">
	      <img src="images/back.svg" />
	    </a>
	  </div>
	  <div id="menu-center">
	    <a href="#" id="pbpbtn">
	      <img src="images/panel-by-panel.svg" alt="Toggle Panel by Panel navigation" />
	    </a>
	  </div>
	  <div id="menu-right">
	    <a href="https://github.com/ragtag/panel-by-panel">
	      <img src="images/pages.svg" />
	    </a>
	  </div>
	</div>
      </nav>
    </div>
    <div id="pagecontainer">
      <img src="<?= get_image($comic, $page, $acbf) ?>"
	   id="page"
	   style="transform: translate(-50%, -50%);" />
    </div>
  </body>
</html>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <?php require "panel-by-panel.php" ?>
    <title><?= $pbp->get_title() ?></title>
    <link rel="stylesheet" href="style.css">
    <noscript><link rel="stylesheet" href="noscript.css"></noscript>
    <script type="text/javascript" src="js/anime.min.js"></script>
    <script type="text/javascript" src="js/panelbypanel.js"></script>
  </head>
  <body bgcolor="<?= $pbp->get_bgcolor() ?>">
    <div id="menuzone">
      <div id="menu">
	<div id="menu-left">
	  <a href="<?= $pbp->get_home() ?>" id="homebtn">
	    <img src="images/back.svg" />
	  </a>
	</div>
	<div id="menu-center">
	  <a href="#" id="pbpbtn">
	    <img src="images/panel-by-panel.svg" alt="Toggle Panel by Panel navigation" />
	  </a>
	</div>
	<div id="menu-right">
	  <a href="<?= $pbp->get_thumbs() ?>" id="thumbsbtn" alt="Show page overview">
	    <img src="images/pages.svg" />
	  </a>
	</div>
      </div>
    </div>
    <div id="navcontainer">
      <a href="<?= $pbp->get_prev() ?>" class="navbtn" id="prevbtn"></a>
      <a href="#" class="navbtn" id="menubtn"></a>
      <a href="<?= $pbp->get_next() ?>" class="navbtn" id="nextbtn"></a>
    </div>
    <div id="pagecontainer">
      <img src="<?= $pbp->get_image() ?>"
	   id="page"
	   style="transform: translate(-50%, -50%);" />
    </div>
  </body>
</html>

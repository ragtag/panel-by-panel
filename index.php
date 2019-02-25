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
	  <a href="#" id="aboutbtn" class="button">
	    <img src="images/about.svg" alt="About this comic" />
	  </a>
	  <a href="#" id="pbpbtn" class="button">
	    <img src="images/panel-by-panel.svg" alt="Toggle Panel by Panel navigation" />
	  </a>
	  <a href="#" id="helpbtn" class="button">
	    <img src="images/help.svg" alt="Help" />
	  </a>
	</div>
	<div id="menu-right">
	  <a href="<?= $pbp->get_thumbs() ?>" id="thumbsbtn" alt="Show page overview">
	    <img src="images/pages.svg" />
	  </a>
	</div>
      </div>
    </div>
    <div id="bubble-container">
    <div id="help" class="bubble">
      <h3>Flipping Between Panels</h3>
      <ul>
	<li>Click the sides of the screen</li>
	<li>Swipe left or right</li>
	<li>Use the arrow keys</li>
	</ul>
      <h3>Flipping Between Pages</h3>
      <ul>
	<li>Use Page Up/Down</li>
	<li>Disable the Panel by Panel mode in the top menu</li>
      </ul>
    </div>
    <div id="about" class="bubble">
      <h3>Title of Comic</h3>
      <p>Summary of the comic</p>
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

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <?php require "pbp/panelbypanel.php" ?>
    <link rel="apple-touch-icon" sizes="57x57" href="<?= $pbp->get_root() ?>/pbp/favicons/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="<?= $pbp->get_root() ?>/pbp/favicons/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="<?= $pbp->get_root() ?>/pbp/favicons/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="<?= $pbp->get_root() ?>/pbp/favicons/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="<?= $pbp->get_root() ?>/pbp/favicons/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="<?= $pbp->get_root() ?>/pbp/favicons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="<?= $pbp->get_root() ?>/pbp/favicons/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="<?= $pbp->get_root() ?>/pbp/favicons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="<?= $pbp->get_root() ?>/pbp/favicons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="<?= $pbp->get_root() ?>/pbp/favicons/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= $pbp->get_root() ?>/pbp/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="<?= $pbp->get_root() ?>/pbp/favicons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= $pbp->get_root() ?>/pbp/favicons/favicon-16x16.png">
    <link rel="manifest" href="<?= $pbp->get_root() ?>/pbp/favicons/manifest.json">

    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="<?= $pbp->get_root() ?>/pbp/favicons/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <title><?= $pbp->get_title() ?> - <?= $pbp->get_page_of() ?></title>
    <link rel="stylesheet" href="<?= $pbp->get_root() ?>/pbp/style.css">
    <noscript><link rel="stylesheet" href="<?= $pbp->get_root() ?>/pbp/noscript.css"></noscript>
    <script type="text/javascript" src="<?= $pbp->get_root() ?>/animejs/anime.min.js"></script>
    <script type="text/javascript" src="<?= $pbp->get_root() ?>/pbp/panelbypanel.js"></script>
  </head>
  <body bgcolor="<?= $pbp->get_bgcolor() ?>">

    <div id="menuzone">
      <div id="menu">
	<div id="menu-left">
	  <a href="<?= $pbp->get_home() ?>" id="homebtn">
	    <img src="<?= $pbp->get_root() ?>/pbp/images/back.svg" />
	  </a>
	  <a href="<?= $pbp->get_exit() ?>" id="exitbtn" style="display:none"></a>
	</div>
	<div id="menu-center">
	  <a href="" id="aboutbtn" class="button">
	    <img src="<?= $pbp->get_root() ?>/pbp/images/about.svg" alt="About this comic" />
	  </a>
	  <div id="about" class="bubble">
	    <div id="about-inner" class="bubble-inner">
	      <div id="summary">
	      <h3 id="title"><?= $pbp->get_title() ?></h3>
	      <?= $pbp->get_summary() ?>
	      </div>
	      <div id="authors">
		<?= $pbp->get_authors() ?>
	      </div>
	      <div id="publisher">
		<strong>Genre</strong>: <?= $pbp->get_genres() ?><br />
		<strong>Rating</strong>: <?= $pbp->get_rating() ?>
		<strong>Publisher</strong>: <?= $pbp->get_publisher() ?> - <?= $pbp->get_publish_date() ?><br />
		<strong>License</strong>: <?= $pbp->get_license() ?><br />
	      </div>
	    </div>
	  </div>
	  <a href="#" id="pbpbtn" class="button">
	    <img src="<?= $pbp->get_root() ?>/pbp/images/panel-by-panel.svg" alt="Toggle Panel by Panel navigation" />
	  </a>
	  <a href="" id="helpbtn" class="button">
	    <img src="<?= $pbp->get_root() ?>/pbp/images/help.svg" alt="Help" />
	  </a>
	  <div id="help" class="bubble">
	    <div id="help-inner" class="bubble-inner">
	      <noscript>
		<h3 style="color:red">JavaScrip Disabled!</h3>
		<p>To get to full set of features from this reader, please enable JavaScript.</p>
		<p>You can still navigate the comic by pressing the left or right third of your screen, but will miss out on features, such as panel by panel reading.</p>
	      </noscript>
	      <h3>Navigate the Comic</h3>
	      <ul>
		<li>Click the left or right third of your screen</li>
		<li>Swipe left or right on a touch screen device</li>
		<li>Use the space bar, or the left and right arrow keys</li>
		<li>Use Page Up or Down keys (flips through pages)</li>
	      </ul>
	      <h3>Pages or Panels</h3>
	      <ul>
		<li>Toggle panel by panel mode in the top menu</li>
	      </ul>
	    </div>
	  </div>
	</div>
	<div id="menu-right">
	  <a href="<?= $pbp->get_thumbs() ?>" id="thumbsbtn" alt="Show page overview">
	    <img src="<?= $pbp->get_root() ?>/pbp/images/pages.svg" />
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
      <img src="<?= $pbp->get_root() ?>/<?= $pbp->get_image() ?>"
	   id="page"
	   style="transform: translate(-50%, -50%);" />
    </div>

  </body>
</html>

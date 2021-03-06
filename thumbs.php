<!DOCTYPE html>
<?php require "pbp/panelbypanel.php" ?>
<html lang="<?= $pbp->get_lang() ?>">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
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
    <title><?= $pbp->get_title() ?></title>
    <link rel="stylesheet" href="<?= $pbp->get_root() ?>/pbp/style.css">
    <noscript><link rel="stylesheet" href="<?= $pbp->get_root() ?>/pbp/noscript.css"></noscript>
  </head>
  <body id="thumbnailpage" bgcolor="<?= $pbp->get_thumbs_bgcolor() ?>">
    <div id="pbpdata"
	 data-root="<?= $pbp->get_root() ?>"
	 data-name="<?= $pbp->get_name() ?>"
	 data-page="<?= $pbp->get_page() ?>">
    </div>
    <div id="thumbs">
      <?= $pbp->draw_thumbs() ?>
    </div>
</body>
</html>

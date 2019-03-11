<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <?php require "pbp/panelbypanel.php" ?>
    <link rel="apple-touch-icon" sizes="57x57" href="pbp/favicons/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="pbp/favicons/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="pbp/favicons/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="pbp/favicons/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="pbp/favicons/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="pbp/favicons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="pbp/favicons/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="pbp/favicons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="pbp/favicons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="pbp/favicons/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="pbp/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="pbp/favicons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="pbp/favicons/favicon-16x16.png">
    <link rel="manifest" href="pbp/favicons/manifest.json">
    <title><?= $pbp->get_title($page, $acbf) ?></title>
    <link rel="stylesheet" href="pbp/style.css">
    <noscript><link rel="stylesheet" href="pbp/noscript.css"></noscript>
  </head>
  <body bgcolor="<?= $pbp->get_thumbs_bgcolor($page, $acbf) ?>">
  <div id="thumbs">
    <?= $pbp->draw_thumbs() ?>
  </div>
</body>
</html>

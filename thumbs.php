<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <?php require "panel-by-panel.php" ?>
    <title><?= $pbp->get_title($page, $acbf) ?></title>
    <link rel="stylesheet" href="/style.css">
    <noscript><link rel="stylesheet" href="/noscript.css"></noscript>
  </head>
  <body bgcolor="<?= $pbp->get_thumbs_bgcolor($page, $acbf) ?>">
  <div id="thumbs">
    <?= $pbp->draw_thumbs() ?>
  </div>
</body>
</html>

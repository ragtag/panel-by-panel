<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$json = file_get_contents('./comic/pages.json');
$comic = json_decode($json);

if (!isset($_GET['page'])) {
   $page = 1;
} else if (!ctype_digit($_GET['page'])) {
  $page = 1;
} else {
  $page = (int)$_GET['page'];
}

$image = $comic->pages[$page - 1]->image;
if ($page >= sizeof($comic->pages)) {
  $next_page = $comic->exit;
} else {
  $next_page = "index.php?page=" . ($page + 1);
}

if ($page <= 1) {
  $prev_page = $comic->home;
} else {
  $prev_page = "index.php?page=" . ($page - 1);
}

$home = $comic->home;
?>

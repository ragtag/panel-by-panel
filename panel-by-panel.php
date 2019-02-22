<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

// Get title
$comic = 'comic';
if (isset($_GET['comic'])) {
    $comic = $_GET['comic'];
}

// Get page
if (!isset($_GET['page'])) {
   $page = 0;
} else if (!ctype_digit($_GET['page'])) {
  $page = 0;
} else {
  $page = (int)$_GET['page'];
}

// TODO!
$home = "TODO! Home";

// Read Advanced Comic Book Format
$acbf_string = file_get_contents('./'.$comic.'/'.$comic.'.acbf');
$acbf = new SimpleXMLElement($acbf_string);

// Choose correct image to render
function get_image($comic, $page ,$acbf) {
    if ($page == 0) {
        $image = $comic."/".$acbf->{'meta-data'}->{'book-info'}->coverpage->image['href'];
    } else {
        $image = $comic."/".$acbf->body->page[$page-1]->image['href'];
    }
    return $image;
}

// Title
function get_title($page, $acbf) {
    $title = $acbf->{'meta-data'}->{'book-info'}->{'book-title'}[0];
    $title = $title." - ".$page." of ".sizeof($acbf->body->page);
    return $title;
}

// Background color
function get_bgcolor($page, $acbf) {
    if ($page == 0) {
        if (isset($acbf->{'meta-data'}->{'book-info'}->coverpage['bgcolor'])) {
            $bgcolor = $acbf->{'meta-data'}->{'book-info'}->coverpage['bgcolor'];
        } else if (isset($acbf->body['bgcolor'])) {
            $bgcolor = $acbf->body['bgcolor'];
        }
    } else {
        if (isset($acbf->body->page[$page-1]['bgcolor'])) {
            $bgcolor = $acbf->body->page[$page-1]['bgcolor'];
        } else if (isset($acbf->body['bgcolor'])) {
            $bgcolor = $acbf->body['bgcolor'];
        }        
    }
    return $bgcolor;
}

// Next page link
function get_next($comic, $page, $acbf) {
    if ($page >= sizeof($acbf->body->page)) {
        $next_page = "TODO! Exit";
    } else {
        $next_page = "index.php?comic=".$comic."&page=" . ($page + 1);
    }
    return $next_page;
}

// Previous page link
function get_prev($comic, $page, $acbf) {
    if ($page <= 0) {
        $prev_page = "TODO! Home";
    } else {
        $prev_page = "index.php?comic=".$comic."&page=" . ($page - 1);
    }
    return $prev_page;
}
?>

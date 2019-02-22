<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

class PanelByPanel
{
    private $page = 0;
    private $name = 'comic';
    private $acbf = '';

    function __construct() {
        // Get comic and page
        $this->name = 'comic';
        if (isset($_GET['comic'])) {
            $this->name = $_GET['comic'];
        }
        if (!isset($_GET['page'])) {
            $this->page = 0;
        } else if (!ctype_digit($_GET['page'])) {
            $this->page = 0;
        } else {
            $this->page = (int)$_GET['page'];
        }
        
        // Read Advanced Comic Book Format
        $acbf_string = file_get_contents('./'.$this->name.'/'.$this->name.'.acbf');
        $this->acbf = new SimpleXMLElement($acbf_string);
    }

    function get_home() {
        // Where to return to
        $home = "TODO! Home";
        return $home;
    }

    function get_image() {
        if ($this->page == 0) {
            $image = $this->name."/".$this->acbf->{'meta-data'}->{'book-info'}->coverpage->image['href'];
        } else {
            $image = $this->name."/".$this->acbf->body->page[$this->page-1]->image['href'];
        }
        return $image;
    }

    function get_title() {
        $title = $this->acbf->{'meta-data'}->{'book-info'}->{'book-title'}[0];
        $title = $title." - ".$this->page." of ".sizeof($this->acbf->body->page);
        return $title;
    }

    function get_bgcolor() {
        if ($this->page == 0) {
            if (isset($this->acbf->{'meta-data'}->{'book-info'}->coverpage['bgcolor'])) {
                $bgcolor = $this->acbf->{'meta-data'}->{'book-info'}->coverpage['bgcolor'];
            } else if (isset($this->acbf->body['bgcolor'])) {
                $bgcolor = $this->acbf->body['bgcolor'];
            }
        } else {
            if (isset($this->acbf->body->page[$this->page-1]['bgcolor'])) {
                $bgcolor = $this->acbf->body->page[$this->page-1]['bgcolor'];
            } else if (isset($this->acbf->body['bgcolor'])) {
                $bgcolor = $this->acbf->body['bgcolor'];
            }        
        }
        return $bgcolor;
    }

    function get_next() {
        if ($this->page >= sizeof($this->acbf->body->page)) {
            $next_page = "TODO! Exit";
        } else {
            $next_page = "index.php?comic=".$this->name."&page=" . ($this->page + 1);
        }
        return $next_page;
    }
    
    function get_prev() {
        if ($this->page <= 0) {
            $prev_page = "TODO! Home";
        } else {
            $prev_page = "index.php?comic=".$this->name."&page=" . ($this->page - 1);
        }
        return $prev_page;
    }
}

$pbp = new PanelByPanel();

?>

<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

class PanelByPanel
{
    private $page = 0;
    private $name = 'comic';
    private $acbf = '';

    public function __construct() {
        // Read config
        require_once('pbp/panelbypanel.conf');
        $this->homepage = $homepage;
        $this->exitpage = $exitpage;
        $this->thumbMaxWidth = $thumbMaxWidth;
        $this->thumbMaxHeight = $thumbMaxHeight;
        $this->htaccess = $htaccess;
        
        // Get comic and page
        $this->name = 'comic';
        if (isset($_GET['comic'])) {
            $this->name = strtolower($_GET['comic']);
        }
        $this->lang = 'en';
        if (isset($_GET['lang'])) {
            $this->lang = $_GET['lang'];
        }
        if (!isset($_GET['page'])) {
            $this->page = 0;
        } else {
            $this->page = (int)preg_replace("/[^0-9]/", '', $_GET['page']);
        }

        // Find the base URL up to the parameters
        // TODO! Support non mod_rewrites
        $this->set_root();
        
        // Read Advanced Comic Book Format
        $acbf_string = file_get_contents('./comics/'.$this->name.'/'.$this->name.'.acbf');
        $this->acbf = new SimpleXMLElement($acbf_string);
    }

    private function set_root() {
        $url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $urlparts = explode('/', $url);
        for ($i = 0; $i < sizeof($urlparts);$i++) {
            switch ($i) {
            case 0:
                $this->root = $urlparts[$i];
                break;
            case 1:
                $this->root .="//".$urlparts[$i];
                break;
            default:
                if ($urlparts[$i] == $this->name) {
                    break 2;
                } else {
                    $this->root .= "/".$urlparts[$i];
                }
                break;
            }
        }
    }

    public function get_root() {
        return $this->root;
    }

    public function get_home() {
        return $this->homepage;
    }

    public function get_exit() {
        return $this->exitpage;
    }

    public function get_image() {
        if ($this->page == 0) {
            $image = "comics/".$this->name."/".$this->acbf->{'meta-data'}->{'book-info'}->coverpage->image['href'];
        } else {
            $image = "comics/".$this->name."/".$this->acbf->body->page[$this->page-1]->image['href'];
        }
        return $image;
    }

    public function get_title() {
        return $this->in_lang($this->acbf->{'meta-data'}->{'book-info'}->{'book-title'});
    }

    public function get_page_of() {
        return $this->page." of ".sizeof($this->acbf->body->page);
    }

    public function get_authors() {
        $retstring = '<ul class="credits">';
        foreach ($this->acbf->{'meta-data'}->{'book-info'}->{'author'} as $author) {
            $retstring .= '<li>';
            $attr = $author->attributes();
            if (isset($attr['activity'])) {
                $retstring .= $attr['activity'] .' - ';
            }
            $retstring .= $author->{'first-name'};
            if (isset($author->{'middle-name'})) {
                $retstring .= ' '.$author->{'middle-name'};
            }
            $retstring .= ' '.$author->{'last-name'};
            if (isset($author->{'nickname'})) {
                $retstring .= ' ('.$author->{'nickname'}.')';
            }
            $retstring .= '<br/>';
            $retstring .= '</li>';
        }
        return $retstring.'</ul>';
    }

    public function get_summary() {
        $summary = $this->in_lang($this->acbf->{'meta-data'}->{'book-info'}->{'annotation'});
        $retstring = '';
        foreach ($summary->p as $paragraph) {
            $retstring .= '<p class="summary">'.$paragraph.'</p>';
        }
        return $retstring;
    }

    public function get_publisher() {
        return $this->acbf->{'meta-data'}->{'publish-info'}->{'publisher'};
    }

    public function get_publish_date() {
        return $this->acbf->{'meta-data'}->{'publish-info'}->{'publish-date'};
    }

    public function get_license()  {
        if (isset($this->acbf->{'meta-data'}->{'publish-info'}->{'license'})) {
            return $this->acbf->{'meta-data'}->{'publish-info'}->{'license'};
        } else {
            return "Copyright &copy; ".$this->get_publish_date()." ".$this->get_publisher();
        }
    }

    public function get_rating() {
        $rating = $this->acbf->{'meta-data'}->{'book-info'}->{'content-rating'};
        if (sizeof($rating) == 0) {
            return "Not rated<br />";
        } else {
            $rating_html = '<span id="rating">';
            foreach ($rating as $r) {
                $attr = $r->attributes();
                if (isset($attr['type'])) {
                    $rating_html .= $attr['type']." - ".$r."<br />";
                } else {
                    $rating_html .= "Rated ".$r."<br />";
                }
            }
            $rating_html .= "</span>";
            return $rating_html;
        }
    }

    public function get_genres() {
        $genres = $this->acbf->{'meta-data'}->{'book-info'}->{'genre'};
        $gary = array();
        if (sizeof($genres) == 0) {
            return false;
        } else {
            $genre_html = '<span id="genre">';
            foreach ($genres as $g) {
                array_push($gary, $g);
            }
            $genre_html .= implode($gary, ' &middot; ');
            $genre_html .= "</span>";
            return $genre_html;
        }
    }

    public function get_bgcolor() {
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

    public function get_next() {
        if ($this->page >= sizeof($this->acbf->body->page)) {
            $next_page = "TODO! Exit";
        } else {
            if ($this->htaccess) {
                $next_page = $this->root."/".$this->name."/page-" . ($this->page + 1);
            } else {
                $next_page = "pbp.php?comic=".$this->name."&page=" . ($this->page + 1);
            }
        }
        return $next_page;
    }
    
    public function get_prev() {
        if ($this->page <= 0) {
            $prev_page = "TODO! Home";
        } else { 
            if ($this->htaccess) {
                $prev_page = $this->root."/".$this->name."/page-" . ($this->page - 1);
            } else {
                $prev_page = "pbp.php?comic=".$this->name."&page=" . ($this->page - 1);
            }
        }
        return $prev_page;
    }

    public function get_thumbs() {
        if ($this->htaccess) {
            return $this->root."/".$this->name."/thumbs/".$this->page;
        } else {
            return $this->root."/thumbs.php?comic=".$this->name."&page=".$this->page;
        }
    }

    public function get_thumbs_bgcolor() {
        return $this->acbf->body['bgcolor'];
    }


    public function draw_thumbs() {
        // Create thumbs folder, if not there
        $cwd = getcwd();
        $thumbsdir = $cwd."/comics/".$this->name."/thumbs";
        if (!file_exists($thumbsdir)) {
            mkdir($thumbsdir, 0777, true);
        }

        // Generate HTML
        $html = "";
        for ($i = 0; $i < sizeof($this->acbf->body->page)+1;$i++) {
            if ($i == 0) {
                $image = "comics/".$this->name."/".$this->acbf->{'meta-data'}->{'book-info'}->coverpage->image['href'];
                $thumb = "comics/".$this->name."/thumbs/".$this->acbf->{'meta-data'}->{'book-info'}->coverpage->image['href'];
            } else {
                $image = "comics/".$this->name."/".$this->acbf->body->page[$i-1]->image['href'];
                $thumb = "comics/".$this->name."/thumbs/".$this->acbf->body->page[$i-1]->image['href'];
            }
            if ($i == $this->page && $this->page > 0) {
                $id = "active-thumb";
            } else {
                $id = "page-".$i;
            }
            $this->check_thumb($cwd."/".$image, $cwd."/".$thumb);
            if ($this->htaccess) {
                $html .= "\t<a class='thumblink' href='/".$this->name."/page-".$i."'>\n";
            } else {
                $html .= "\t<a class='thumblink' href='".$this->root."/pbp.php?comic=".$this->name."&page=".$i."'>\n";
            }
            $html .= "\t\t<img class='thumb' id='".$id."' src='".$thumb."' />\n";
            $html .= "\t</a>\n";
        }
        return $html;
    }

    private function in_lang($data) {
        if (sizeof($data) == 1) {
            return $data[0];
        }
        foreach ($data as $d) {
            $attr = $d->attributes();
            if (isset($attr['lang'])) {
                if ($attr['lang'] == $this->lang) {
                    return $d;
                }
            }
        }
        return $data[0];
    }

    private function check_thumb($image, $thumb) {
        if (!file_exists($thumb)) {
            $this->make_thumb($image, $thumb);
        } elseif (filemtime($thumb) < filemtime($image)) {
            $this->make_thumb($image, $thumb);
        }
    }

    private function make_thumb($image, $thumb) {
        $im = new Imagick();
        $im->readImage($image);
        $im->thumbnailImage($this->thumbMaxWidth, $this->thumbMaxHeight, true);
        $im->writeImage($thumb);
        $im->destroy();
    }
}

$pbp = new PanelByPanel();

?>

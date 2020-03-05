# Panel by Panel
Panel by panel online comics reader for artists wanting to make their webcomics more mobile friendly.

You can see what it looks like with [these excellent comics](http://dev.ragtag.net/index.php) from the [ACBF Comic Book Library](http://acbf.info/).

## Features
* Mobile friendly panel by panel reading
* Pre-loading of pages making flipping page instant
* Thumbnail overview of the entire comic
* Touch screen swiping support

*Status* - The code is mostly feature complete, but still needs a bit more tweaking, plus testing on various devices. So far I've tested it in Chrome, Firefox, Edge, Safari, Chrome on Android and Safari on iPhone. If you find any bugs in the code, please [report them](https://github.com/ragtag/panel-by-panel/issues).

## Getting Started
* Requriements: a web server that supports php, imagemagick and optionally .htaccess files (see below).
* Upload the code to a your web server.
* Create a "comics" folder on your web server, and upload a folder containing your comic there.
* The comic needs to be in the [ACBF format](https://acbf.fandom.com/wiki/Advanced_Comic_Book_Format_Wiki). Panel by Panel only supports [ACBF files referencing external files](https://acbf.fandom.com/wiki/ACBF_Specifications), and not single ACBF files or .cbz ACBF files (see below for details).
* Make sure your .acbf file has the same name as your folder (e.g. comics/adventure-stories/adventure-stories.acbf). The name of the folder and the .acbf file MUST be lower case.
* You can either use the official [ACBF Editor](https://acbf.fandom.com/wiki/ACBF_Editor), or [Krita's](https://krita.org) Comics Manaager to build ACBF files ([Krita Comics Manager docs](https://github.com/KDE/krita/tree/master/plugins/python/comics_project_management_tools)). The development version of [Peruse](https://peruse.kde.org) also has support for creating ACBF files, so we will likely see this feature in future official releases.
* Go to http://your-site.com/adventure-stories

Note that the URL is case insensitive, so Adventure-Stories, adventure-stories or AdVentuRe-StorIes all work. 

## Reading Your Comic
panel-by-panel is designed to make it easier to read comics on mobile devices. If you set up frames (panels) in your ACBF file, you can navigate the comic panel by panel. It also supports navigating page by page, and will try to guess which mode is most practical based on your screen size and resolution. You can manually toggle between the two modes by clicking the Panel by Panel icon in the top menu. You can bring up the top menu by either click the middle of the page or by moving your mouse pointer to the top of the page.

To navigate between panels/pages you can:
* Click the left or right 1/3 of the screen
* Swipe left or right on a touch screen device
* Use the left and right arrow keys
* Use the Page Up/Page Down keys (note that these will always go page by page, no matter which mode you're in)

If reading on your phone, you can rotate your phone to better fit wide or tall panels.

In the top menu to the right is a link to a thumbnail overview of all your pages. The thumbnails are generated automatically on the server the first time you visit the page, so take a few seconds to load the first time you visit that page, but should load quickly after that.

## ACBF Support
The ACBF format is quite feature rich, and panel-by-panel currently only supports a small subset of it's features. The supported tags are:
* body (including bgcolor attribute)
* coverpage (including bgcolor attribute)
* page (including bgcolor attribute)
* image
* frame
* book-title
* authors
* annotation
* genre
* content-rating (includ type attribute)
* publisher
* publish-date
* license

You can use the bgcolor attribute of the body, coverpage and page tags to set the background color for the entire comic or individual pages.

Note that the "frame" tag is supported on coverpages, but the official ACBF Editor cannot create these. For now, you can use Krita to make these, or edit the ACBF file by hand. The official ACBF Viewer does display these comics correctly.

There is no support for "text-areas" nor much of the additional "meta-data" found in ACBF files.

## Customizing Panel by Panel
There are a few simple customizations you can do to Panel by Panel. In pbp/panelbypanel.conf, you'll find a few settings you can change.

* $homepage - full URL to which page to go to when you hit the back button, or flip back a page from the cover page
* $exitpage - full URL to which page to go to after finishing reading a comic
* $thumbMaxWidth/Height - set the maximum size of the thumbnails generated. Note that you will need to delete them on the server, and then visit the thumbs page to regenerate them, if you change this
* $htaccess - see below

At the top of the pbp/panelbypanel.js there are a few settings you can easily change. These are:

* speed - the animation speed in milliseconds when moving from panel to panel.
* menuDelay - how long to keep the top menu on the screen, after the page initally loads in milliseconds
* pbpMaxWidth/Height - switch to panel by panel mode by default when on a dislpay less than this width or height. Note that these numbers are not exact pixels, as high dpi devices add a scaling factor to complicate things a bit. Setting these to a value that fits your comics may require some experimenting.
* perPageColor - use the background color for each page defined in the ACBF file. If set to false, it uses the background defined in the style sheet.
* htaccess - see below
* debug - print out extra debug information to the console

Changing what meta data to show in the about comic dialog should be relatviely straight forward if you're familiar with HTML, by simply editing the pbp.php.

Note that the panel by panel reader is designed to be full screen, so currently does not support adding headers, footers, sidebars etc. Adding these to the thumbnails page would be pretty straight forward, but adding it to the reader itself would be a bit more involved.

## .htaccess, mod_rewrite and Pretty URLs

By default Panel by Panel, uses mod_rewrite to make pretty URLs (i.e. www.example.com/adventure-story/page-1 instead of www.example.com/index.php?comic=adventure-story&page=1). Not all hosting companies support using .htaccess files, so if this doesn't work for you, you can set the htaccess variable in panelbypanel.conf and panelbypanel.js to false. With these settings the longer URLs will be used, but everything should still work the same.

Note that if you're using .htaccess and mod_rewrite in a subfolder, you need to put the .htaccess file in the subfolder, alongside the pbp.php file.

## noscript and Search Engines

Panel by Panel uses JavaScript to navigate the pages and panels of your comic, but has a fallback PHP version for browsers and search engine crawlers that don't support, or have disabled, JavaScript. The noscript version does not support many of the nice features of Panel by Panel, but draws up pretty much the same page, and uses the same URLs as the JavaScript version. This will hopefully make your comics more search engine friendly, as the search engine bots, who generally don't run JavaScript, will still be able to crawl your site. Though I'm honestly a bit unsure of how well pages consisting mostly images do in search engines, hopefully Google and co are using their AI bots to analyze the content of images and optical character recogntion to read any text it finds in the image.

## External Dependencies
I've tried to keep external dependencies as few as possible, to make it easy to just upload Panel by Panel to your server, and start using it. The only one currently used is [anime.js v3.0.1](https://animejs.com/). This is included in the animejs folder, for ease of deployment.

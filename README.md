# Panel by Panel
Panel by panel online comics reader for artists wanting to make their webcomics more mobile friendly.

*Status* - The code is mostly feature complete, but still needs a bit more tweaking, plus testing on various devices. So far I've tested it in Chrome, Firefox, Edge, Safari, Chrome on Android and Safari on iPhone. If you find any bugs in the code, please [report them](https://github.com/ragtag/panel-by-panel/issues).

## Getting Started
* Requriements: a web server that supports php, imagemagick and optionally .htaccess (see below).
* Upload the code to a your web server.
* Create a "comics" folder on your web server, and upload a folder containing your comic there.
* The comic needs to be in the [ACBF format](https://acbf.fandom.com/wiki/Advanced_Comic_Book_Format_Wiki). Panel by Panel only support [ACBF files referencing external files](https://acbf.fandom.com/wiki/ACBF_Specifications), and not single ACBF files or .cbz ACBF files (see below for details).
* Make sure your .acbf file has the same name as your folder (e.g. comics/AdventureStories/AdventureStories.acbf).
* You can either use the official [ACBF Editor](https://acbf.fandom.com/wiki/ACBF_Editor), or [Krita's](https://krita.org) Comics Manaager to build ACBF files ([Krita Comics Manager docs](https://github.com/KDE/krita/tree/master/plugins/python/comics_project_management_tools)).
* Go to http://your-site.com/NameOfYourComic  (e.g. example.com/AdventureStories)

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

You can use the bgcolor attribute of the body, coverpage and page tags to which backround color to use for the comic or for each page.

Note that the "frame" tag is supported on coverpages, but the official ACBF Editor cannot create these. For now, you can use Krita to make these, or edit the ACBF file by hand. The official ACBF Viewer does display these comics correctly.

There is no support for "text-areas" nor most of the "meta-data" found in ACBF files.

## Customizing Panel by Panel
There are a few simple customizations you can do to Panel by Panel. In pbp/panelbypanel.conf, you'll find a few settings you can change.

* $home - sets where you go when you press the home button (back arrow in top menu)
* $thumbMaxWidth/Height - set the maximum size of the thumbnails generated. Note that you will need to delete them on the server, and then visit the thumbs page to regenerate them, if you change this
* $htaccess - see below

At the top of the pbp/panelbypanel.js there are a few settings you can easily change. These are:

* speed - the animation speed in milliseconds when moving from panel to panel.
* menuDelay - how long to keep the top menu on the screen, after the page initally loads in milliseconds
* pbpMaxWidth/Height - Switch to panel by panel mode by default when on a dislpay less than this width or height
* htacess - see below

Controlling what meta data to show in the about comic dialog should be relatviely straight forward if you're familiar with HTML, by simply editing the pbp.php.

Note that the panel by panel reader is designed to be full screen, so currently doesn't support adding headers, footers, sidebars etc. Adding these to the thumbnails page would be pretty straight forward, but adding it to the reader itself would be a bit more involved.

## .htaccess and Pretty URLs
By default, Panel by Panel uses pretty URLs (e.g. example.com/MyComic/page-4), and this is implemented using the .htaccess file. Unfortunately not all web hosts allow users to set up their own .htaccess file. If you're one of those unlucky users, you can still use Panel by Panel, but with a few changes.

* In pbp/panelbypanel.php, set $htaccess from TRUE to FALSE
* In pbp/panelbypanel.js set htaccess from true to false
* Don't upload the .htaccess file to your server

You should now be able to access your comic using and URL like, example.com/pbp.php?comic=MyComic&page=4

## noscript and Search Engines

Panel by Panel uses JavaScript to navigate the pages and panels of your comic, but has a fallback PHP version for browsers and search engines that don't support, or have disabled, JavaScript. The noscript version does not support many of the nice features of Panel by Panel, but draws up pretty much the same page, and uses the same URLs as the JavaScript version. This will hopefully make your comics more search engine friendly, as the search engine bots, who generally don't run JavaScript, will still be able to crawl your site. Though I'm honestly a bit unsure of how well pages consisting mostly of just images do in search engines.

## External Dependencies
I've tried to keep external dependencies as few as possible, to make it easy to just upload Panel by Panel to your server, and start using it. The only one currently used is [anime.js v3.0.1](https://animejs.com/). This is included in the animejs folder, for ease of deployment.

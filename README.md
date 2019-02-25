# Panel by Panel
Panel by panel online comics reader for artists wanting to make their webcomics more mobile friendly.

**NOTE!**  Panel by Panel is still very much work in progress, so is not fully functional yet.

## Getting Started
* Upload the code to a web server that support php and imagemagick. Most shared hosting solution should support this.
* Upload a folder containing your comic in the [ACBF format](https://acbf.fandom.com/wiki/Advanced_Comic_Book_Format_Wiki) to the same folder. panel-by-panel ony support [ACBF files referencing external files](https://acbf.fandom.com/wiki/ACBF_Specifications), and not single ACBF files or .cbz ACBF files (see below for details).
* Make sure your .acbf file has the same name as your folder (e.g. my-comic/my-comic.acbf).
* You can either use the official [ACBF Editor](https://acbf.fandom.com/wiki/ACBF_Editor), or [Krita's](https://krita.org) Comics Manaager to build ACBF files ([Krita Comics Manager docs](https://github.com/KDE/krita/tree/master/plugins/python/comics_project_management_tools)).
* Go to http://your-site.com/index.php?comic=my-comic&page=0

I'll set up a sample comic for reference soon (the one included with the code is currently broken).

## Reading Your Comic
panel-by-panel is designed to make it easier to read comics on mobile devices. If you set up frames (panels) in your ACBF file, you can navigate the comic panel by panel. It also supports navigating page by page, and will try to guess which mode is most practical based on your screen size and resolution. You can manually toggle between the two modes by clicking the panel-by-panel icon in the middle of the top menu. To bring up the top menu either click the middle of the page or move your mouse pointer to the top of the page.

To navigate between panels/pages (depending on mode) you can:
* Click the left or right 1/3 of the screen
* Swipe left or right on a touch screen device
* Left and right arrow keys
* Page Up/Down (note that this will always go page by page, no matter which mode you're in)

In the top menu to the right is a link to a thumbnail overview of all your pages. The thumbnails are generated automatically on the server the first time you visit the page, so will be a bit slow on your first visit, but will be fast on your or any other users consequent visits.

## ACBF Support
The ACBF format is quite feature rich, and panel-by-panel currently only supports a small subset of it's features. The supported tags are:
* coverpage
* page
* image
* frame
* book-title (it will pick the first language it can find)

It also supports the "bgcolor" attribute for "body", "coverpage" and "page" tags. This lets you choose which backround color to use for the whole comic, or per-page if you want to.

Note that the "frame" tag is supported on coverpages, but the official ACBF Editor cannot create these. For now, you can either use Krita to make these, or edit the ACBF file by hand, if you need panels on your cover page.

There is no support for "text-areas" and most of the "meta-data" found in ACBF files. Nor is there any support for multiple languages.

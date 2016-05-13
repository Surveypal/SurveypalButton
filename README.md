# SurveypalButton

A JS library to embed Surveypal to your website. See the button in action: http://surveypal.github.io/SurveypalButton/

## Installation and usage

The easiest way to use the library is to fetch it directly from Surveypal cdn:
```javascript
<script>
// Build an options object for the library
var options = {
	sid: "425114003",
	key: "U6rX1UmYu8PEfgVFygqHPZxoiFz2FNV-aiAB8WegqDkcvhlSJ2o1zPLh895ExAYE",
	cssname: "surveypal-button-1.0.0.css"
};

// Fetch the library which will automatically initialize itself
(function(w, t, o) {
  var s='script',ns='sb',e,n,h="http://35696292e3548b7626e8-7139975ebb420828147d923433383bf8.r48.cf3.rackcdn.com/";
  e=t.createElement(s);e.async=1; e.src=h+'surveypal-button-1.0.0.js'; w[ns]=w[ns]||{};w[ns].o=o;w[ns].h=h;n=t.getElementsByTagName(s)[0];n.parentNode.insertBefore(e,n);
})(window,document, options);
</script>
```

You can specify where the library is fetched from. In the example below, the the script is in file called `sb.js` and it's loaded from relative folder `../lib/` .

```javascript
<script>
var options = {
  sid: "425114003",
  key: "U6rX1UmYu8PEfgVFygqHPZxoiFz2FNV-aiAB8WegqDkcvhlSJ2o1zPLh895ExAYE"
};

(function(w, t, o) {
  var s='script',ns='sb',e,n,h="../lib/"; e=t.createElement(s);e.async=1; e.src=h+'sb.js'; w[ns]=w[ns]||{};w[ns].o=o;w[ns].h=h;n=t.getElementsByTagName(s)[0];n.parentNode.insertBefore(e,n);
})(window,document, options);
</script>
```

## Configuration options

* init = will define if the button is shown automatically. If `false` you must use `window.sb.init()` to show the button.
* sid = Id of the survey [REQUIRED]
* key = Key hash of the survey [REQUIRED]
* cssname = Name of the the css related to the library. Defaults to "sb.css".
* type = Defines the style of animation used to display the survey. Options are "slide", "flip" or "window". Defaults to "window".
* remember = If true, this survey (and the button) won't be shown to the this user anymore
* location = The location of the button, "left/right high/middle/low", defaults to "right low"
* keep = If true the button is available after the survey is closed and re-answering is possible
* source = Surveypal compatible display string
* name = If the source is display, then the display name can be given
* metas = A json array of json objects like { key: "firstname", value: "John" }. Will send additional meta information to Surveypal.
* zindex = Specify css z-index for the "flip" and "slide" style overlays. Defaults to 99.
* texts = Contains labels for the button. A json object with the following keys:
  * ENTER = defaults to "Open survey"
  * LOADING = defaults to "Loading"
  * EXIT = defaults to "Exit survey"

## API

Api methods can be used globally through the `window.sb` object. E.g. `window.sb.init()`.

* init() = will show the button, if possible
* trigger() = will open the survey, if possible
* option(key, value) = override or change values later
* meta(key, value) = change meta values

## Autoclose survey

By placing this script to your survey form the survey will be closed 1 sec after the survey is completed.

```javascript
<script type="text/javascript">
	if(location.href.indexOf("&_submit") != -1) {
		setTimeout(function() {
			window.parent.postMessage("exit", '*');
		}, 1000);
	}
</script>
```

## Styling

You can style the button by adding your own css -stylesheet to the webpage. Notice the stylesheet should be located after the one injected by the script.
# Survey-Button

A JS library to embed Surveypal to your website.

## Installation and usage

```javascript
<script>
var options = {
  sid: "403820467",
  key: "ocxNB0pSsJFDgcmXEFGpoa9fE5bpcvetfSO9gBH7iFNXXVZqIiTlycm9uUSiwVTo"
};

(function(w, t, o) {
  var s='script',ns='sb',e,n,h="../lib/"; e=t.createElement(s);e.async=1; e.src=h+'survey-button.js'; w[ns]=w[ns]||{};w[ns].o=o;w[ns].h=h;n=t.getElementsByTagName(s)[0];n.parentNode.insertBefore(e,n);
})(window,document, options);
</script>
```

## Configuration options

* init = will define if the button is shown automatically
* sid = id of the survey [REQUIRED]
* key = key hash of the survey [REQUIRED]
* type = "slide", "flip" or "window", default to "slide"
* remember = if true, this survey (and the button) won't be shown to the this user anymore
* location = the location of the button, "left/right high/middle/low", defaults to "right low"
* keep = if true the button is available after the survey is closed and reanswering is possible
* source = Surveypal compatible display string
* name = if the source is display, then the display name can be given
* metas = a json array of json objects like { key: "firstname", value: "John" }. Will send additional meta information to Surveypal.
* texts = a json object with the following contents:
** ENTER = defaults to "Open survey"
** LOADING = defaults to "Loading"
** EXIT = defaults to "Exit survey"

## API

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
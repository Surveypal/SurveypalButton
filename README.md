# SurveypalButton

A JS library to embed Surveypal to your website. [See the button in action.](http://surveypal.github.io/SurveypalButton/)

Other examples: 

[Customize the size and position of the survey.](http://surveypal.github.io/SurveypalButton/size_and_top_example.html)

[Scale the content of the survey.](http://surveypal.github.io/SurveypalButton/scale_example.html)

[Show a Full screen survey.](http://surveypal.github.io/SurveypalButton/full_screen_example.html)


## Installation and usage

The easiest way to use the library is to fetch it directly from Surveypal cdn:
```javascript
<script>
// Build an options object for the library
var options = {
	url = "https://q.surveypal.com/Feedback-survey-v2-eq_Kcj8PWIySQMJf",
	cssname: "surveypal-button-1.0.2.css"
};

// Fetch the library which will automatically initialize itself
(function(w, t, o) {
  var s='script',ns='sb',e,n,h="https://srvpleu1data1.blob.core.windows.net/code/";
  e=t.createElement(s);
  e.async=1; 
  e.src=h+'surveypal-button-1.0.4.js'; 
  w[ns]=w[ns]||{};
  w[ns].o=o;
  w[ns].h=h;
  n=t.getElementsByTagName(s)[0];
  n.parentNode.insertBefore(e,n);
})(window,document, options);
</script>
```

You can specify where the library is fetched from. In the example below, the the script is in file called `sb.js` and it's loaded from relative folder `../lib/` .

```javascript
<script>
var options = {
  url = "https://q.surveypal.com/Feedback-survey-v2-eq_Kcj8PWIySQMJf",
};

(function(w, t, o) {
  var s='script',ns='sb',e,n,h="../lib/"; 
  e=t.createElement(s);
  e.async=1; e.src=h+'sb.js'; 
  w[ns]=w[ns]||{};
  w[ns].o=o;
  w[ns].h=h;
  n=t.getElementsByTagName(s)[0];
  n.parentNode.insertBefore(e,n);
})(window,document, options);
</script>
```

## Configuration options

### Survey identifiers [REQUIRED]

| Name | Description | Value | Example |
| --- | --- | --- | --- |
| url | URL of the survey that's shown | string | `"https://q.surveypal.com/Feedback-survey-v2-eq_Kcj8PWIySQMJf"`. This is recommended way. |
|  | Or you can add survey ID and survey key |  | This is old way to do it. |
| sid | [Id](http://surveypal.github.io/SurveypalButton/key_and_id_instructions.html) of the survey that's shown | string | `"425114003"` |
| key | [Key hash](http://surveypal.github.io/SurveypalButton/key_and_id_instructions.html) of the survey that's shown | string | `"U6rX1UmYu8PEfgVFygqHPZxoiFz2FNVbaiAB8WegqDkcvhlSJ2o1zPLh895ExAYE"` |

### Answer options

| Name | Description | Value | Example |
| --- | --- | --- | --- |
| answerData | [Predefined answer data](http://surveypal.github.io/SurveypalButton/answerData-instructions.html) for the first page of the survey | object | <code>{p0e0:&nbsp;0, p0e1:&nbsp;"Need more cookies."}</code> |
| meta | Metadata added to each response | object | <code>{source_page:&nbsp;"front_page"}</code> |
| language | Response language | string | `English%20(US)` |
| source | Surveypal compatible source string | string | `display` |
| name | If source is `display`, name can be given to further specify the source | string | `myDisplay1` |

### Customizing the button

| Name | Description | Value | Example |
| --- | --- | --- | --- |
| init | Defines if the button is shown automatically | boolean | `true` (default) |
| keep | Defines if the button remains visible after answering the survey | boolean | `true` (default) |
| location | Location of the button | `left high`, `left middle`, `left low`, `right high`, `right middle`, `right low` | `right low` (default) |
| remember | Is the button hidden when survey has been opened once, and user refreshes the page | boolean | `false` (default) |
| texts | Text labels for the button | object | `{ENTER: "Open survey", LOADING: "Loading", EXIT: "Exit survey"}`(default) |
  
### Customizing the survey overlay

| Name | Description | Value | Example |
| --- | --- | --- | --- |
| height | Relative height of the survey overlay | number (between 0 and 1) | `0.5` = half of the viewport |
| top | Relative vertical position of the survey in the viewport | number (between 0 and 1) | `0.5` = position the top border of the overlay in the middle of the screen |
| type | The style of animation used to display the survey | `slide`, `flip`, `window` | `window` (default) |
| width | Relative width of the survey overlay | number (between 0 and 1) | `0.75` = 75% of the viewport width |

### Miscellaneous options

| Name | Description | Value | Example |
| --- | --- | --- | --- |
| cssname | Name of the the css related to the library | string | `sb.css` (default) |

## API

Api methods can be used globally through the `window.sb` object. E.g. `window.sb.init()`.

* init() = will show the button, if possible
* trigger() = will open the survey, if possible
* option(key, value) = override or change values later
* meta(key, value) = change meta values

## Autoclose survey

If you want to close survey after it's completed then you can add first code to your survey and second code to your webpage. After this survey popup will be closed after 1 second.

Add this to survey (Settings > Snippets)
```javascript
<script type="text/javascript">
var page = SurveypalAPI.getPageType();
if(page == "thank-you") {

  try {
	var postObject = JSON.stringify({
		event: 'formSubmit'
	});
	window.parent.postMessage(postObject, '*');
  } catch(e) {
	window.console && window.console.log(e);
  }

}
</script>
```

Add this to your webpage
```javascript
<script type="text/javascript">
window.addEventListener('message', function (e) {
  // Get the sent data
  
  if (e.origin === "https://q.surveypal.com") {
    var data = JSON.parse(e.data);	
	console.log('event: ' + data.event);
	if (data.event === 'formSubmit') {
		setTimeout(function() {
			window.sb.trigger();
		}, 1000);
	}
  }

});
</script>
```

## Styling

You can style the button by adding your own css-stylesheet to the webpage. Notice the stylesheet should be located after the one injected by the script.

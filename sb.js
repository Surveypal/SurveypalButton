(function() {
	// get object to the local scope
	var sb = window["sb"];
	sb.button = null;
	
	// get options to a local scope
	var options = sb.o;
	options.init = typeof options.init == "boolean" ? options.init : true;
	options.location = options.location || "right low";
	options.type = options.type || "window";
	options.remember = typeof options.remember == "boolean" ? options.remember : false;
	options.keep = typeof options.keep == "boolean" ? options.keep : true;
	options.texts = options.texts || {
		ENTER: "Open survey",
		LOADING: "Loading",
		EXIT: "Exit survey"
	};
	options.answerData = options.answerData || {};
	options.cssname = typeof options.cssname == "string" && options.cssname.length > 0 ? options.cssname : "sb.css";

	// meta array
	var metas = options.meta || {};
	
	// get host
	var host = sb.h;

	// load css
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = host + options.cssname;
	document.head.insertBefore(link, document.head.childNodes[0]); // to the top of head to maximize the changes the user can override defaults

	// initializes the button
	function init() {
		// if existing button exists, remove from dom
		if(sb.button) {
			sb.button.parentNode.removeChild(sb.button);
		}

		// create the button dom
		sb.button = document.createElement("div");
		sb.button.className = ["sb", options.location].join(" ");
		sb.button.innerHTML = options.texts.ENTER;
		document.body.appendChild(sb.button);

		// add click listener
		sb.button.addEventListener("click", function() {
    		trigger();
		});
	};
	
	function openFlip(url) {
		// direction class
		var className = "left";
		if(sb.button.className.indexOf("right") != -1) {
			className = "right";
		}

		// create container
		var slide = document.createElement("div");
		slide.className = "sb-flip " + className;

		var iframe = document.createElement("iframe");
		iframe.className = "fx";
		iframe.onload = function() {
			// hide the button
			sb.button.className = sb.button.className + " exit";
			sb.button.innerHTML = options.texts.EXIT;
			sb.button.disabled = false;

			// cancel the onload so the page transitions won't trigger the animation
			iframe.onload = null;

			// animate
			slide.className = slide.className + " ready";
		};
		iframe.src = url;
		slide.appendChild(iframe);
		document.body.appendChild(slide);
		sb.handle = slide;
	};

	// slides the survey open
	function openSlide(url) {
		// direction class
		var className = "left fx";
		if(sb.button.className.indexOf("right") != -1) {
			className = "right fx";
		}

		// create container
		var slide = document.createElement("div");
		slide.className = "sb-slide " + className;
		var iframe = document.createElement("iframe");
		iframe.onload = function() {
			// hide the button
			sb.button.className = sb.button.className + " exit";
			sb.button.innerHTML = options.texts.EXIT;
			sb.button.disabled = false;

			// cancel the onload so the page transitions won't trigger the animation
			iframe.onload = null;

			// animate
			slide.className = slide.className + " ready";
		};
		iframe.src = url;
		slide.appendChild(iframe);
		document.body.appendChild(slide);
		sb.handle = slide;
	};

	function openWindow(url) {
		// hide the button
		sb.button.parentNode.removeChild(sb.button);
		sb.button = null;
		sb.handle = window.open(url);
	};

	// opens the survey
	function trigger() {
		if(sb.button && !sb.button.disabled) {
			if(sb.button.className.indexOf("exit") != -1) {	
				exitSurvey();
			} else {
				enterSurvey();
			}
		}
	};

	function exitSurvey() {
		switch(options.type) {
			case "flip":
			case "slide":
				// change the button
				sb.button.className = sb.button.className.replace(" exit", "");
				sb.button.innerHTML = options.texts.ENTER;
				sb.button.disabled = false;

				// hide the button if it is not needed anymore
				if(!options.keep) {
					sb.button.parentNode.removeChild(sb.button);
					sb.button = null;
				}

				// hide the slide
				sb.handle.className = sb.handle.className.replace(" ready", "");
				setTimeout(function(reference) {
					reference.parentNode.removeChild(reference);
				}.bind(this, sb.handle), 5000);
				sb.handle = null;
				break;
			case "window":
				break;
		}		
		sb.handle = null;
	};

	function buildAnswerDataUrlStr(answerDataMap)
	{
		var str = Object.keys(answerDataMap).reduce(function(accumulator, key){
			return accumulator + "&" + key + "=" + String(answerDataMap[key]);
		}, "");
		return encodeURIComponent(str);
	}

	function enterSurvey() {
		// change button
		sb.button.innerHTML = options.texts.LOADING;
		sb.button.disabled = true;

		// compose url
		var dataStr = buildAnswerDataUrlStr(options.answerData);
		var url = dataStr.length > 0 ?
		          "https://my.surveypal.com/app/form/save?_d=0&_sid=%1&_k=%2".replace("%1", options.sid).replace("%2", options.key) + dataStr :
		          "https://my.surveypal.com/app/form?_d=0&_sid=%1&_k=%2".replace("%1", options.sid).replace("%2", options.key);
		var keys = Object.keys(metas);
		if(keys.length > 0) {
			url = url.replace("/form", "/form/ext");
			var arr = [];
			for(var i = 0; i < keys.length; i++ ) {
				var key = keys[i];
				var o = {};
				o.key = key;
				o.value = metas[key];
				arr.push(o);
			}
			url = url + "&meta=" + JSON.stringify(arr);
		}

		// add source, if defined
		if(options.source) {
			url = url + "&source=" + options.source;
			if(options.source == "display" && options.name) {
				url = url + "&name=" + options.name;
			}
		}

		// show widget
		console.info(url);
		switch(options.type) {
			case "flip":
				openFlip(url);
				break;
			case "slide":
				openSlide(url);
				break;
			case "window":
			default:
				openWindow(url);
				break;
		}

		// mark the survey opened
		if(options.remember) {
			var d = new Date();
			d.setFullYear(d.getFullYear()+1); // 1 year from now on
			var cookieString = "sb%1=1; expires=%2".replace("%1", options.sid).replace("%2", d.toUTCString());
			document.cookie = cookieString;
		}
	};

	// rewrite settings
	function option(key, value) {
		options[key] = value;
	};

	// add meta
	function meta(key, value) {
		metas[key] = value;
	};

	// expose the init for global scope
	sb.init = init;
	if(options.init && document.cookie.indexOf("sb" + options.sid) == -1) {
		init();
	}

	// expore trigger to the global scope
	sb.trigger = trigger;

	// expose option to the global scopoe
	sb.option = option;

	// expose meta method to the global scope
	sb.meta = meta;

	// start listening for postmessages
	window.addEventListener("message", function(event) {
		var origin = event.origin || event.originalEvent.origin;

		// security check, only accept from surveypal.com
		if(origin.indexOf("my.surveypal.com") == -1) {
			return;
		}

		// if exit, invoke exit
		if(event.data == "exit") {
			exitSurvey();
		}
	}, false);
}());

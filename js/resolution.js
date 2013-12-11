
checkBrowserWidth();
schedule("window", checkBrowserWidth);

attachEventListener(window, "resize", checkBrowserWidth, false);




function checkBrowserWidth()
{
	var theWidth = getBrowserWidth();
	
	if (theWidth == 0)
	{
		var resolutionCookie = document.cookie.match(/(^|;)res_layout[^;]*(;|$)/);

		if (resolutionCookie != null)
		{
			setStylesheet(unescape(resolutionCookie[0].split("=")[1]));
		}
		
		addLoadListener(checkBrowserWidth);
		
		return false;
	}

	if (theWidth >= 960)
	{
		setStylesheet("Wide");
		document.cookie = "res_layout=" + escape("Wide");
	}
	else
	{
		setStylesheet("");
		document.cookie = "res_layout=";
	}
	
	return true;
};




function getBrowserWidth()
{
	if (window.innerWidth)
	{
		return window.innerWidth;
	}
	else if (document.documentElement && document.documentElement.clientWidth != 0)
	{
		return document.documentElement.clientWidth;
	}
	else if (document.body)
	{
		return document.body.clientWidth;
	}
	
	return 0;
};




function setStylesheet(styleTitle)
{
	var links = document.getElementsByTagName("link");

	for (var i = 0; i < links.length; i++)
	{
		if (links[i].getAttribute("rel") == "alternate stylesheet")
		{
			links[i].disabled = true;

			if(links[i].getAttribute("title") == styleTitle)
			{
				links[i].disabled = false;
			}
		}
	}
	
	return true;
};


schedule("wrapper", dropdownMenuInit); 




function dropdownMenuInit()
{
	var nav = document.getElementById("nav");
	
	if (nav != null)
	{
		var listItems = getChildrenByTagName(nav, "li");
	
		for (var j = 0; j < listItems.length; j++)
		{
			var subMenu = listItems[j].getElementsByTagName("ul");
	
			if (subMenu.length > 0)
			{
				attachEventListener(listItems[j], "mouseover", mouseoverDropdownMenu, false);
				attachEventListener(listItems[j], "mouseout", mouseoutMenu, false);
				attachEventListener(listItems[j].getElementsByTagName("a")[0], "focus", focusDropdownMenu, false);
				attachEventListener(listItems[j].getElementsByTagName("a")[0], "blur", blurMenu, false);
				
				var subListItems = subMenu[0].getElementsByTagName("li");
				
				for (var k = 0; k < subListItems.length; k++)
				{
					attachEventListener(subListItems[k].getElementsByTagName("a")[0], "focus", focusDropdownMenu, false);
					attachEventListener(subListItems[k].getElementsByTagName("a")[0], "blur", blurMenu, false);
					
					if (k == subListItems.length - 1)
					{
						addClass(subListItems[k], "last");
					}

					var subSubMenu = subListItems[k].getElementsByTagName("ul");

					if (subSubMenu.length > 0)
					{
						attachEventListener(subListItems[k], "mouseover", mouseoverDropdownMenu, false);
						attachEventListener(subListItems[k], "mouseout", mouseoutMenu, false);
						
						addClass(subListItems[k], "subMenu");
					}
				}
			}
		}
	}

	return true;
};




function mouseoverDropdownMenu()
{
	showDropdownMenu(this);
	
	return true;
};




function showDropdownMenu(target)
{
	var ul = target.getElementsByTagName("ul")[0];
	
	if (target.parentNode.parentNode.nodeName.toLowerCase() != "li")
	{
		ul.style.marginTop = target.clientHeight + "px";
		
		var position = getPosition(target);
		var browserWidth = getBrowserWidth();

		if (position[0] + ul.clientWidth > browserWidth)
		{
			ul.style.marginLeft = browserWidth - ul.clientWidth - position[0] - 25 + "px";
		}
		else
		{
			ul.style.marginLeft = "";
		}
	}
	
	addClass(target, "hover");
	
	return true;
};




function mouseoutMenu(event)
{
	if (typeof event == "undefined")
	{
		event = window.event;
	}
	
	if (typeof event.relatedTarget != "undefined")
	{
		var related = event.relatedTarget;
	}
	else
	{
		var related = event.toElement;
	}
	
	if (isDescendantNode(related, this))
	{
		return true;
	}
	else
	{
		hideMenu(this);
	}
	
	return true;
};




function focusDropdownMenu(event)
{
	resetMenu(this);
	
	var parentListItem = this.parentNode;

	while (parentListItem.nodeName.toLowerCase() == "li")
	{
console.log("iterating");
		showDropdownMenu(parentListItem);
		
		parentListItem = parentListItem.parentNode.parentNode;
	}
	
	return true;
};




function blurMenu(event)
{
	resetMenu(this);
	
	return true;
};




function focusDropdownSubMenu(event)
{
	resetMenu(this);
	
	var parentListItem = this.parentNode.parentNode.parentNode;
	
	return true;
};




function hideMenu(menuItem)
{
	removeClass(menuItem, "hover");
	
	var iframes = menuItem.getElementsByTagName("iframe");
	
	if (iframes.length > 0)
	{
		for (var i = 0; i < iframes.length; )
		{
			menuItem.removeChild(iframes[i]);
		}
	}
	
	return true;
};




function resetMenu(menuItem)
{
	var menu = menuItem;
	
	while (!(menu.nodeName.toLowerCase() == "ul" && menu.parentNode.nodeName.toLowerCase() == "div"))
	{
		menu = menu.parentNode;
	}
	
	var listItems = menu.getElementsByTagName("li");
	
	for (var i = 0; i < listItems.length; i++)
	{
		removeClass(listItems[i], "hover");
	}
	
	return true;
};




function getPosition(theElement)
{
	var positionX = 0;
	var positionY = 0;

	while (theElement != null)
	{
		positionX += theElement.offsetLeft;
		positionY += theElement.offsetTop;
		theElement = theElement.offsetParent;
	}

	return [positionX, positionY];
};
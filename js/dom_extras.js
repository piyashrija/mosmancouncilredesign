
function getChildrenByTagName(target, tagName)
{
	var children = target.childNodes;
	var matching = new Array();
	
	if (children != null)
	{
		for (var i = 0; i < children.length; i++)
		{
			if (children[i].nodeName.toLowerCase() == tagName)
			{
				matching[matching.length] = children[i];
			}
		}
	}
	
	return matching;
};




function isDescendantNode(descendant, ancestor)
{
	while (descendant.parentNode != null && descendant.parentNode.nodeName.toLowerCase() != "#document")
	{
		if (descendant.parentNode == ancestor)
		{
			return true;
		}
		else
		{
			descendant = descendant.parentNode;
		}
	}
	
	return false;
};




function attachEventListener(target, eventType, functionRef, capture)
{
	if (typeof target.addEventListener != "undefined")
	{
		target.addEventListener(eventType, functionRef, capture);
	}
	else if (typeof target.attachEvent != "undefined")
	{
		var functionString = eventType + functionRef;
		target["e" + functionString] = functionRef;
        
		target[functionString] = function(event)
		{
			if(typeof event == "undefined")
			{
				event = window.event
			};

			target["e" + functionString](event);
        };
        
		target.attachEvent("on" + eventType, target[functionString]);
	}
	else
	{
		eventType = "on" + eventType;

		if (typeof target[eventType] == "function")
		{
			var oldListener = target[eventType];

			target[eventType] = function()
			{
				oldListener();

				return functionRef();
			}
		}
		else
		{
			target[eventType] = functionRef;
		}
	}

	return true;
};
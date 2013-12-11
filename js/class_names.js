
/* Add a class to a string */
function addClass(target, theClass)
{
	if (target.className != "")
	{
		if (!classExists(target, theClass))
		{
			target.className += " " + theClass;
		}
	}
	else
	{
		target.className = theClass;
	}
	
	return true;
};




/* Check if a class exists in a string */
function classExists(target, theClass)
{
	var regString = "(^| )" + theClass + "( |$)";
	var regExpression = new RegExp(regString);
	
	if (target.className.match(regExpression))
	{
		return true;
	}
	
	return false;
};




/* Remove a class from a string */
function removeClass(target, theClass)
{
	var regString = "(^| )" + theClass + "( |$)";
	var regExpression = new RegExp(regString);
	
	target.className = target.className.replace(regExpression, "$1");
	target.className = target.className.replace(/ $/, "");
	
	return true;
};
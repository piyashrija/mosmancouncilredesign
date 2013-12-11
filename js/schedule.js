function schedule(objectID, functionCall, iteration)
{
	var ITERATION_LIMIT = 300;
	
	if (iteration == null)
	{
		iteration = 0;
	}
	
	if (objectID == "window" || iteration > ITERATION_LIMIT)
	{
		var oldonload = window.onload;
		
		if (typeof window.onload != "function")
		{
			window.onload = functionCall;
		}
		else
		{
			window.onload = function()
			{
				oldonload();
				functionCall();
			}
		}
	}
	else if (document.getElementById(objectID))
	{
		functionCall();
	}
	else
	{
		setTimeout(function(){schedule(objectID, functionCall, iteration + 1)}, 25);
	}
	
	return true;
}
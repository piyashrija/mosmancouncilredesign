
var SortableTables =
{
	init: function()
	{
		var ths = document.getElementsByTagName("th");

		for (var i = 0; i < ths.length; i++)
		{
			if (classExists(ths[i], "sortable"))
			{
				addClass(ths[i], "sortableJS");
				
				var newA = document.createElement("a");
				newA.setAttribute("href", "#");
				newA.setAttribute("title", "Sort by this column in descending order");

				for (var k = 0; k < ths[i].childNodes.length; k++)
				{
					newA.appendChild(ths[i].childNodes[k]);
				}

				ths[i].appendChild(newA);
				
				newA.onclick = SortableTables.sortColumn;
			}
		}

	  return true;
	},
	sortColumn: function(event)
	{
		var targetTh = this;

		while (targetTh.nodeName.toLowerCase() != "th")
		{
			targetTh = targetTh.parentNode;
		}

		var targetA = targetTh.getElementsByTagName("a")[0];
		var targetTr = targetTh.parentNode;
		var targetTrChildren = targetTr.getElementsByTagName("th");
		var targetTable = targetTr.parentNode.parentNode;
		var targetTbody = targetTable.getElementsByTagName("tbody")[0];
		var targetTrs = targetTbody.getElementsByTagName("tr");
		var targetColumn = 0;

		for (var i = 0; i < targetTrChildren.length; i++)
		{
			targetTrChildren[i].className = targetTrChildren[i].className.replace(/(^| )sortedDescending( |$)/, "$1");
			targetTrChildren[i].className = targetTrChildren[i].className.replace(/(^| )sortedAscending( |$)/, "$1");

			if (targetTrChildren[i] == targetTh)
			{
				targetColumn = i;

				if (targetTrChildren[i].sortOrder == "descending" && targetTrChildren[i].clicked)
				{
					targetTrChildren[i].sortOrder = "ascending";
					targetTrChildren[i].className += " sortedAscending";
					targetA.setAttribute("title", "Sort by this column in descending order");
				}
				else
				{
					if (targetTrChildren[i].sortOrder == "ascending" && !targetTrChildren[i].clicked)
					{
						targetTrChildren[i].className += " sortedAscending";
					}
					else
					{
						targetTrChildren[i].sortOrder = "descending";
						targetTrChildren[i].className += " sortedDescending";
						targetA.setAttribute("title", "Sort by this column in ascending order");
					}
				}

				targetTrChildren[i].clicked = true;
			}
			else if (classExists(targetTrChildren[i], "sortable"))
			{
				targetTrChildren[i].clicked = false;

				if (targetTrChildren[i].sortOrder == "ascending")
				{
					targetTrChildren[i].firstChild.setAttribute("title", "Sort by this column in ascending order");
				}
				else
				{
					targetTrChildren[i].firstChild.setAttribute("title", "Sort by this column in descending order");
				}
			}
		}

		var newTbody = targetTbody.cloneNode(false);

		for (var i = 0; i < targetTrs.length; i++)
		{
			var newTrs = newTbody.childNodes;

			for (var j = 0; j < newTrs.length; j++)
			{
				var targetValue = getInternalText(targetTrs[i].getElementsByTagName("td")[targetColumn]);
				var newValue = getInternalText(newTrs[j].getElementsByTagName("td")[targetColumn]);

				if (targetValue == parseInt(targetValue, 10) && newValue == parseInt(newValue, 10))
				{
					targetValue = parseInt(targetValue, 10);
					newValue = parseInt(newValue, 10);
				}
				else if (targetValue == parseFloat(targetValue) && newValue == parseFloat(newValue))
				{
					targetValue = parseFloat(targetValue, 10);
					newValue = parseFloat(newValue, 10);
				}
				else
				{
					var datePattern = /^(\d+) (\w+) (\d+)$/;
					
					if (datePattern.test(targetValue) && datePattern.test(newValue))
					{
						var targetDay = targetValue.replace(datePattern, "$1");
						
						if (targetDay.toString().length <= 1)
						{
							targetDay = "0" + targetDay;
						}
						
						var targetMonth = SortableTables.monthToNumber(targetValue.replace(datePattern, "$2"));
						var targetYear = targetValue.replace(datePattern, "$3");
						
						targetValue = parseInt(targetYear + targetMonth + targetDay);
						
						var newDay = newValue.replace(datePattern, "$1");

						if (newDay.toString().length <= 1)
						{
							newDay = "0" + newDay;
						}
						
						var newMonth = SortableTables.monthToNumber(newValue.replace(datePattern, "$2"));
						var newYear = newValue.replace(datePattern, "$3");
						
						newValue = parseInt(newYear + newMonth + newDay);
					}
				}

				if (targetTrChildren[targetColumn].sortOrder == "descending")
				{
					if (targetValue >= newValue)
					{
						break;
					}
				}
				else
				{
					if (targetValue <= newValue)
					{
						break;
					}
				}
			}

			if (j >= newTrs.length)
			{
				newTbody.appendChild(targetTrs[i].cloneNode(true));
			}
			else
			{
				newTbody.insertBefore(targetTrs[i].cloneNode(true), newTrs[j]);
			}
		}

		targetTable.replaceChild(newTbody, targetTbody);
		
		StripedTables.init();

		return false;
	},
	monthToNumber: function(month)
	{
		month = month.toLowerCase();
		
		switch (month)
		{
			case "jan":

				month = "01";

				break;

			case "feb":

				month = "02";

				break;

			case "mar":

				month = "03";

				break;

			case "apr":

				month = "04";

				break;

			case "may":

				month = "05";

				break;

			case "jun":

				month = "06";

				break;

			case "jul":

				month = "07";

				break;

			case "aug":

				month = "08";

				break;

			case "sep":

				month = "09";

				break;

			case "oct":

				month = "10";

				break;

			case "nov":

				month = "11";

				break;

			default:

				month = "12";
		}
		
		return month;
	}
};





function getInternalText(target)
{
	var elementChildren = target.childNodes;
	var internalText = "";

	for (var i = 0; i < elementChildren.length; i++)
	{
		if (elementChildren[i].nodeType == 3)
		{
			if (!/^\s*$/.test(elementChildren[i].nodeValue))
			{
				internalText += elementChildren[i].nodeValue;
			}
		}
		else
		{
			internalText += getInternalText(elementChildren[i]);
		}
	}

	return internalText;
}




schedule("window", SortableTables.init);
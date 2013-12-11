
var StripedTables =
{
	init: function()
	{
		var tables = document.getElementsByTagName("table");
		
		for (var i = 0; i < tables.length; i++)
		{
			if (classExists(tables[i], "data"))
			{
				var tbody = tables[i].getElementsByTagName("tbody")[0];
				var trs = tbody.getElementsByTagName("tr");
				
				for (var j = 0; j < trs.length; j++)
				{
					removeClass(trs[j], "stripe");
					
					if (j % 2 != 0)
					{
						addClass(trs[j], "stripe");
					}
				}
			}
		}
	}
};




schedule("window", StripedTables.init);
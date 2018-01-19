function printTest()
{
	var yearRange = (currStartYear + 1) + "-" + (currEndYear - 1);
	document.title = "Schema " + yearRange + " Grupp 0";
	changeActive(0);
	window.print();
	
	document.title = "Schema " + yearRange + " Grupp 1";
	changeActive(1);
	window.print();
	
	document.title = "Schema " + yearRange + " Grupp 2";
	changeActive(2);
	window.print();
	
	document.title = "Schema " + yearRange + " Grupp 3";
	changeActive(3);
	window.print();
	
	document.title = "Schema " + yearRange + " Grupp 4";
	changeActive(4);
	window.print();
	
	document.title = "Schema " + yearRange + "";
	changeActive(0);
}

function icsTest()
{
	fillCal(group0, 1);
	fillCal(group0, 2);
	fillCal(group0, 3);
	fillCal(group0, 4);
	group0.download('0');
	
	fillCal(group1, 1);
	group1.download('1');
	
	fillCal(group2, 2);
	group2.download('2');
	
	fillCal(group3, 3);
	group3.download('3');
	
	fillCal(group4, 4);
	group4.download('4');
}

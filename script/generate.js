var weekDays = ["M", "T", "O", "T", "F", "L", "S"];

var months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

var groupOrderDay = [
						[3, 4, 2, 1, 3, 3, 1], 
						[2, 3, 1, 4, 2, 2, 4],
						[1, 2, 4, 3, 1, 1, 3],
						[4, 1, 3, 2, 4, 4, 2]
					];
					
var groupOrderNight = 	[
							[1, 3, 4, 2, 1, 3, 1],
							[4, 2, 3, 1, 4, 2, 4],
							[3, 1, 2, 4, 3, 1, 3],
							[2, 4, 1, 3, 2, 4, 2]
						];
						
var groupOrderSummer =	[
							[1, 3, 2, 4, 3, 1, 3],
							[4, 2, 1, 3, 2, 4, 2],
							[3, 1, 4, 2, 1, 3, 1],
							[2, 4, 3, 1, 4, 2, 4]
						];
var years = new Array();
var currGroup = 0;
var currYearIndex = 0;

Date.prototype.getWeek = function()
{
	var date = new Date(this.getTime());
	date.setHours(0, 0, 0, 0);
	date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
	var week1 = new Date(date.getFullYear(), 0, 4);
	return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

function weeksInYear(year)
{
	var month = 11, day = 31, week;
	do
	{
		var d = new Date(year, month, day--);
		week = d.getWeek();
	}
	while (week == 1);
	
	return week;
}


function easterForYear(year)
{
	var a = year % 19;
	var b = Math.floor(year / 100);
	var c = year % 100;
	var d = Math.floor(b / 4); 
	var e = b % 4;
	var f = Math.floor((b + 8) / 25);
	var g = Math.floor((b - f + 1) / 3); 
	var h = (19 * a + b - d - g + 15) % 30;
	var i = Math.floor(c / 4);
	var k = c % 4;
	var l = (32 + 2 * e + 2 * i - h - k) % 7;
	var m = Math.floor((a + 11 * h + 22 * l) / 451);
	var n0 = (h + l + 7 * m + 114)
	var n = Math.floor(n0 / 31) - 1;
	var p = n0 % 31 + 1;
	var date = new Date(year,n,p);
	return date; 
}

function generateRedDays(year)
{
	var redDays = new Array();
	redDays.push(new Date(year, 0, 1));
	redDays.push(new Date(year, 0, 6));
	
	var longFriday = easterForYear(year);
	longFriday.setDate(longFriday.getDate()-2);
	redDays.push(longFriday);
	
	var otherdayEaster = easterForYear(year);
	otherdayEaster.setDate(otherdayEaster.getDate()+1);
	redDays.push(otherdayEaster);
	
	redDays.push(new Date(year, 4, 1));
	
	var kristi = easterForYear(year);
	kristi.setDate(kristi.getDate()+39);
	redDays.push(kristi);
	
	redDays.push(new Date(year, 5, 6));
	
	for(var i = 19; i < 26; i++)
	{
		var tmpDate = new Date(year, 5, i);
		if(tmpDate.getDay() == 6)
			redDays.push(tmpDate);
	}
	
	var tmpDate = new Date(year, 9, 31);
	if(tmpDate.getDay() == 6)
		redDays.push(tmpDate);
	
	for(var i = 1; i < 6; i++)
	{
		var tmpDate = new Date(year, 10, i);
		if(tmpDate.getDay() == 6)
			redDays.push(tmpDate);
	}
	
	redDays.push(new Date(year, 11, 25));
	redDays.push(new Date(year, 11, 26));
	
	return redDays;
}

function changeActive(newGroup)
{
	currGroup = newGroup;
	
	var inners = $("div").find("#content")[0].children[0].children;
	
	for(var i = 0; i < inners.length; i++)
	{
		var months = inners[i].children;
		for(var j = 0; j < months.length; j++)
		{
			var weeks = months[j].children;
			for(var k = 0; k < weeks.length; k++)
			{
				if(weeks[k].className == "week")// || weeks[k].className == "weekLast")
				{
					var days = weeks[k].children;
					for(var l = 0; l < days.length; l++)
					{
						if(currGroup.toString() == days[l].children[2].firstChild.data)
						{
							if(days[l].children[2].className.indexOf("black") >= 0)
								days[l].children[2].className = "green2 test";
							else
								days[l].children[2].className = "green test";
						}
						else
						{
							if(days[l].children[2].className.indexOf("green2") >= 0 || days[l].children[2].className.indexOf("black") >= 0)
								days[l].children[2].className = "black test";
							else
								days[l].children[2].className = "test";
						}
						
						if(currGroup.toString() == days[l].children[3].firstChild.data)
						{
							if(days[l].children[3].className.indexOf("black") >= 0)
								days[l].children[3].className = "green2 test";
							else
								days[l].children[3].className = "green test";
						}
						else
						{
							if(days[l].children[3].className.indexOf("green2") >= 0 || days[l].children[3].className.indexOf("black") >= 0)
								days[l].children[3].className = "black test";
							else
								days[l].children[3].className = "test";
						}
					}
				}
			}
		}
	}
}

function generate()
{
	document.title = "Schema 2015-2018";
	
	var module = document.createElement('div');
	module.className = 'module';
	
	for(var i = 2014; i <= 2019; i++)
	{
		var tmpYear = {};
		
		tmpYear.currDate = new Date(i, 0, 1);
		tmpYear.currWeekDayStart = 0;
		tmpYear.currWeekDayStart = 0;
		tmpYear.currWeekDayEnd = tmpYear.currDate.getDay() == 0 ? 5 : tmpYear.currDate.getDay()-2;
		tmpYear.isSummer = false;
		tmpYear.summerCnt = 0;
		tmpYear.redDays = generateRedDays(i);
		
		years.push(tmpYear);
		
		var yearHeader = document.createElement('p');
		yearHeader.className = 'yearHeader';
		yearHeader.innerText = i;
		
		module.appendChild(yearHeader);
		
		var yearHalf1 = document.createElement('div');
		yearHalf1.className = 'year';
		
		for(var j = 0; j < 6; j++)
		{
			yearHalf1.appendChild(month());
		}
		
		var yearHalf2 = document.createElement('div');
		yearHalf2.className = 'year';
		
		for(var j = 0; j < 6; j++)
		{
			yearHalf2.appendChild(month());
		}
	
		module.appendChild(yearHalf1);
		module.appendChild(yearHalf2);
		currYearIndex++;
	}
	
	if(document.getElementById('content').childNodes.length == 0)
		document.getElementById('content').appendChild(module);
	else
		document.getElementById('content').replaceChild(module, document.getElementById('content').childNodes[0]);
	
	changeActive(0);
}

function month()
{
	var month = document.createElement('div');
	month.className = 'month';
	
	var monthHeader = document.createElement('table');
	monthHeader.className = 'monthHeader';
	var monthName = document.createElement('div');
	monthName.innerText = months[years[currYearIndex].currDate.getMonth()];
	monthName.className = 'test2';
	
	var filler = document.createElement('div');
	filler.className = 'test2';
	
	var day = document.createElement('div');
	day.className = 'test2';
	day.innerText = 'D';
	
	var night = document.createElement('div');
	night.className = 'test2';
	night.innerText = 'N';
	
	monthHeader.appendChild(monthName);
	monthHeader.appendChild(filler);
	monthHeader.appendChild(day);
	monthHeader.appendChild(night);
	
	month.appendChild(monthHeader);
	
	var tmpDate = new Date();
	tmpDate.setFullYear(years[currYearIndex].currDate.getYear(), years[currYearIndex].currDate.getMonth() + 1, 0);
	var maxDays = tmpDate.getDate();
	
	var tmpCnt = 0;
	for(var i = 0; i <= maxDays/7; i++)
	{
		if(i == Math.floor(maxDays/7))
		{
			years[currYearIndex].currWeekDayStart = 0;
			if(maxDays - tmpCnt > 7)
			{
				month.appendChild(week(0, 6));
				tmpCnt += 7;
				
				years[currYearIndex].currWeekDayEnd = maxDays - tmpCnt -1;
				tmpCnt += years[currYearIndex].currWeekDayEnd+1;
			}
			else
			{
				years[currYearIndex].currWeekDayEnd = maxDays - tmpCnt;
				years[currYearIndex].currWeekDayEnd--;
				tmpCnt += years[currYearIndex].currWeekDayEnd - years[currYearIndex].currWeekDayStart;
			}
			
			
		}
		else if(i == 0 && years[currYearIndex].currWeekDayEnd != 6)
		{
			years[currYearIndex].currWeekDayStart = years[currYearIndex].currWeekDayEnd+1;
			years[currYearIndex].currWeekDayEnd = 6;
			tmpCnt += years[currYearIndex].currWeekDayEnd - years[currYearIndex].currWeekDayStart + 1;
		}
		else
		{
			years[currYearIndex].currWeekDayStart = 0;
			years[currYearIndex].currWeekDayEnd = 6;
			tmpCnt += years[currYearIndex].currWeekDayEnd - years[currYearIndex].currWeekDayStart + 1;
		}
		
		month.appendChild(week(years[currYearIndex].currWeekDayStart, years[currYearIndex].currWeekDayEnd));
	}
	return month;
}

function getWeek(dateIn)
{
	var tmpVal = -1;
	
	for(var year = 2014; year < years[currYearIndex].currDate.getFullYear(); year++)
	{
		tmpVal += weeksInYear(year);
	}
	if(dateIn.getWeek() == 53)
	{
		return dateIn.getWeek() - 1;
	}
	else
		return (tmpVal%52) + dateIn.getWeek();
}

function getGroup(weekDay, yearObjIn, day)
{
	var weekNr = getWeek(yearObjIn.currDate);
	
	if(!yearObjIn.isSummer)
	{
		if(yearObjIn.currDate.getMonth() == 5 && weekDay == 0)
		{
			for(var i = 2; i <= 8; i++)
			{
				if(yearObjIn.currDate.getDate() == i)
					yearObjIn.isSummer = true;
			}
		}
	}
	
	if(yearObjIn.isSummer)
	{
		yearObjIn.summerCnt++;
		if(yearObjIn.summerCnt > 84*2)
		{
			yearObjIn.summerCnt = 0;
			yearObjIn.isSummer = false;
		}
		return groupOrderSummer[(weekNr+2) % 4][weekDay];
	}
	else
	{
		if(day)
			return groupOrderDay[weekNr % 4][weekDay];
		else
			return groupOrderNight[weekNr % 4][weekDay];
	}
}

function week(start, stop)
{
	
	var week = document.createElement('table');

	var tmpDate = new Date(years[currYearIndex].currDate.getYear(), years[currYearIndex].currDate.getMonth() + 1, 0);
	var maxDays = tmpDate.getDate();
	
	/*if(years[currYearIndex].currDate.getDate() + stop == maxDays)
		week.className = 'weekLast';
	else*/
	week.className = 'week';
	
	for(var i = start; i <= stop; i++)
	{
		var dayGroup = getGroup(i, years[currYearIndex], true);
		var nightGroup = getGroup(i, years[currYearIndex], false);
		
		if(i == start)
			week.appendChild(day(weekDays[i], dayGroup, nightGroup, true));
		else
			week.appendChild(day(weekDays[i], dayGroup, nightGroup, false));
			
		years[currYearIndex].currDate.setDate(years[currYearIndex].currDate.getDate()+1);
	}
	return week;
}

function day(weekDayIn, groupDayIn, groupNightIn, showWeekNr)
{
	var day = document.createElement('div');
	day.className = 'day';
	
	var date = document.createElement('div');
	date.innerText = years[currYearIndex].currDate.getDate().toString();
	date.className = 'test';
	
	var weekDay = document.createElement('div');
	weekDay.innerText = weekDayIn;
	weekDay.className = 'test';
	
	var groupDay = document.createElement('div');
	groupDay.innerText = groupDayIn;
	groupDay.className = 'test';
	groupDay.orig = groupDayIn;
	groupDay.ondragstart = function()
	{
		var id = 'drag-' + (new Date()).getTime();
		this.id = id;
		$('#' + id).data("extraData", {originalGroup: groupDayIn});
		event.dataTransfer.setData("source", id);
	}
	groupDay.ondragover = function()
	{
		event.preventDefault();
	}
	groupDay.ondrop = function()
	{
		var origGroup = $('#' + event.dataTransfer.getData("source")).data("extraData").originalGroup;
		event.preventDefault();
		if($('#' + event.dataTransfer.getData("source")).html() == this.innerText)
			return;
		var tmp = this.innerText;
		this.innerText = $('#' + event.dataTransfer.getData("source")).html();
		$('#' + event.dataTransfer.getData("source")).html(tmp);
		
		if(tmp == currGroup.toString())
			$('#' + event.dataTransfer.getData("source")).attr('class', 'test green2');
		else
			$('#' + event.dataTransfer.getData("source")).attr('class', 'test black');
		
		if(currGroup.toString() == this.innerText)
			this.className = 'test green2';
		else
			this.className = 'test black';
			
		if(origGroup == tmp)
			$('#' + event.dataTransfer.getData("source")).attr('class', 'test');
		if(this.innerText == groupDay.orig)
			this.className = 'test';
	}
	groupDay.draggable = true;
	
	var groupNight = document.createElement('div');
	groupNight.innerText = groupNightIn;
	groupNight.className = 'test';
	groupNight.orig = groupNightIn;
	groupNight.ondragstart = function()
	{
		var id = 'drag-' + (new Date()).getTime();
		this.id = id;
		$('#' + id).data("extraData", {originalGroup: groupNightIn});
		event.dataTransfer.setData("source", id);
	}
	groupNight.ondragover = function()
	{
		event.preventDefault();
	}
	groupNight.ondrop = function()
	{
		var origGroup = $('#' + event.dataTransfer.getData("source")).data("extraData").originalGroup;
		event.preventDefault();
		if($('#' + event.dataTransfer.getData("source")).html() == this.innerText)
			return;
		var tmp = this.innerText;
		this.innerText = $('#' + event.dataTransfer.getData("source")).html();
		$('#' + event.dataTransfer.getData("source")).html(tmp);
		
		if(tmp == currGroup.toString())
			$('#' + event.dataTransfer.getData("source")).attr('class', 'test green2');
		else
			$('#' + event.dataTransfer.getData("source")).attr('class', 'test black');
		
		if(currGroup.toString() == this.innerText)
			this.className = 'test green2';
		else
			this.className = 'test black';
			
		if(origGroup == tmp)
			$('#' + event.dataTransfer.getData("source")).attr('class', 'test');
		if(this.innerText == groupNight.orig)
			this.className = 'test';
	}
	groupNight.draggable = true;
	
	var weekNr = document.createElement('div');
	weekNr.className = 'weekNumber test';
	
	if(showWeekNr)
		weekNr.innerText = years[currYearIndex].currDate.getWeek().toString();
	else
		weekNr.innerText = ' ';
		
	if(weekDayIn == 'S')
		weekDay.className = 'red test';
	
	for(var i = 0; i < years[currYearIndex].redDays.length; i++)
	{
		if(dates.compare(years[currYearIndex].redDays[i], years[currYearIndex].currDate) == 0)
			weekDay.className = 'red test';
	}
	
	if(years[currYearIndex].isSummer)
	{
		if(years[currYearIndex].summerCnt > 0 && years[currYearIndex].summerCnt <= 28*2)
			weekNr.className = 'weekNumber test pink';
		else if(years[currYearIndex].summerCnt > 28*2 && years[currYearIndex].summerCnt <= 56*2)
			weekNr.className = 'weekNumber test yellow';
		else
			weekNr.className = 'weekNumber test beige';
	}
		
	
	day.appendChild(date);
	day.appendChild(weekDay);
	day.appendChild(groupDay);
	day.appendChild(groupNight);
	day.appendChild(weekNr);
	
	return day;
}

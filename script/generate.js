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

var currDate = new Date();

var currWeekDayStart = 0;

var currWeekDayEnd = 0;

var currGroup = 1;

var isSummer = false;
var summerCnt = 0;

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

window.onload = function()
{
	var min = new Date().getFullYear(),
	max = min + 9;
    
    for(var i = min; i <= max; i++)
	{
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = i;
		document.getElementById('selectYear').appendChild(opt);
	}
	
	for(var i = 1; i <= 4; i++)
	{
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = i;
		document.getElementById('group').appendChild(opt);
	}
}

function generateTest()
{
	var e = document.getElementById('selectYear');
	currDate.setFullYear(e.options[e.selectedIndex].value, 0, 1);
	
	e = document.getElementById('group');
	currGroup = e.options[e.selectedIndex].value;
	
	currWeekDayEnd = currDate.getDay() == 0 ? 5 : currDate.getDay()-2;
	
	var module = document.createElement('div');
	module.className = 'module';
	
	var firstHalfyear = document.createElement('div');
	firstHalfyear.className = 'inner';
	
	for(var i = 0; i < 6; i++)
	{
		firstHalfyear.appendChild(month());
	}
	
	var secondHalfyear = document.createElement('div');
	secondHalfyear.className = 'inner';
	
	for(var i = 0; i < 6; i++)
	{
		secondHalfyear.appendChild(month());
	}
	
	module.appendChild(firstHalfyear);
	module.appendChild(secondHalfyear);
	
	if(document.getElementById('content').childNodes.length == 0)
		document.getElementById('content').appendChild(module);
	else
		document.getElementById('content').replaceChild(module, document.getElementById('content').childNodes[0]);
}

function month()
{
	var month = document.createElement('div');
	month.className = 'month';
	
	var monthHeader = document.createElement('table');
	monthHeader.className = 'monthHeader';
	var monthName = document.createElement('div');
	monthName.innerText = months[currDate.getMonth()];
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
	tmpDate.setFullYear(currDate.getYear(), currDate.getMonth() + 1, 0);
	var maxDays = tmpDate.getDate();
	
	var tmpCnt = 0;
	for(var i = 0; i <= maxDays/7; i++)
	{
		if(i == Math.floor(maxDays/7))
		{
			currWeekDayStart = 0;
			if(maxDays - tmpCnt > 7)
			{
				month.appendChild(week(0, 6));
				tmpCnt += 7;
				
				currWeekDayEnd = maxDays - tmpCnt -1;
				tmpCnt += currWeekDayEnd+1;
			}
			else
			{
				currWeekDayEnd = maxDays - tmpCnt;
				currWeekDayEnd--;
				tmpCnt += currWeekDayEnd - currWeekDayStart;
			}
			
			
		}
		else if(i == 0 && currWeekDayEnd != 6)
		{
			currWeekDayStart = currWeekDayEnd+1;
			currWeekDayEnd = 6;
			tmpCnt += currWeekDayEnd - currWeekDayStart + 1;
		}
		else
		{
			currWeekDayStart = 0;
			currWeekDayEnd = 6;
			tmpCnt += currWeekDayEnd - currWeekDayStart + 1;
		}
		
		month.appendChild(week(currWeekDayStart, currWeekDayEnd));
	}
	return month;
}

function getGroup(weekDay, day)
{
	var tmpVal = 53;
	
	for(var year = 2014; year < currDate.getFullYear(); year++)
	{
		tmpVal += weeksInYear(year);
	}
	
	var odd = tmpVal % 2;
	
	var weekNr = currDate.getWeek() - odd;
	
	if(!isSummer)
	{
		if(currDate.getMonth() == 5 && weekDay == 0)
		{
			for(var i = 2; i <= 8; i++)
			{
				if(currDate.getDate() == i)
					isSummer = true;
			}
		}
	}
	
	if(isSummer)
	{
		summerCnt++;
		if(summerCnt > 84*2)
		{
			summerCnt = 0;
			isSummer = false;
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

	var tmpDate = new Date();
	tmpDate.setFullYear(currDate.getYear(), currDate.getMonth() + 1, 0);
	var maxDays = tmpDate.getDate();
	
	if(currDate.getDate() + stop == maxDays)
		week.className = 'weekLast';
	else
		week.className = 'week';
	
	for(var i = start; i <= stop; i++)
	{
		var dayGroup = getGroup(i, true);
		var nightGroup = getGroup(i, false);
		
		if(i == start)
			week.appendChild(day(weekDays[i], dayGroup, nightGroup, true));
		else
			week.appendChild(day(weekDays[i], dayGroup, nightGroup, false));
			
		currDate.setDate(currDate.getDate()+1);
	}
	return week;
}

function day(weekDayIn, groupDayIn, groupNightIn, showWeekNr)
{
	var day = document.createElement('div');
	day.className = 'day';
	
	var date = document.createElement('div');
	date.innerText = currDate.getDate().toString();
	date.className = 'test';
	
	var weekDay = document.createElement('div');
	weekDay.innerText = weekDayIn;
	weekDay.className = 'test';
	
	var groupDay = document.createElement('div');
	groupDay.innerText = groupDayIn;
	groupDay.className = 'test';
	
	var groupNight = document.createElement('div');
	groupNight.innerText = groupNightIn;
	groupNight.className = 'test';
	
	var weekNr = document.createElement('div');
	weekNr.className = 'weekNumber test';
	
	if(showWeekNr)
	{
		weekNr.innerText = currDate.getWeek().toString();
		
	}
	else
	{
		weekNr.innerText = ' ';
	}
	
	if(groupDayIn == currGroup)
		groupDay.className = 'green test';
	
	if(groupNightIn == currGroup)
		groupNight.className = 'green test';
		
	if(weekDayIn == 'S')
		weekDay.className = 'red test';
		
	if(isSummer)
		weekNr.className = 'weekNumber test pink'
	
	day.appendChild(date);
	day.appendChild(weekDay);
	day.appendChild(groupDay);
	day.appendChild(groupNight);
	day.appendChild(weekNr);
	
	return day;
}

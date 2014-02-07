var weekDays = ["M", "T", "O", "T", "F", "L", "S"];

var months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

var currDate = new Date();

var currWeekDayStart = 0;

var currWeekDayEnd = 0;

var currGroup = 1;

Date.prototype.getWeek = function()
{
	var date = new Date(this.getTime());
	date.setHours(0, 0, 0, 0);
	date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
	var week1 = new Date(date.getFullYear(), 0, 4);
	return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

window.onload = function()
{
	console.log(currDate.getDay());
	
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
	
	var monthHeader = document.createElement('h1');
	monthHeader.innerText = months[currDate.getMonth()];
	
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

function week(start, stop)
{
	
	var week = document.createElement('table');
	
	if(stop == 6)
		week.className = 'week';
	else
		week.className = 'weekLast';
	
	for(var i = start; i <= stop; i++)
	{
		var tmpGroup = Math.floor(Math.random() * (4 - 1 + 1) + 1);
		if(i == start)
			week.appendChild(dayWithWeekNr(weekDays[i], tmpGroup, tmpGroup, currDate.getWeek()));
		else
			week.appendChild(day(weekDays[i], tmpGroup, tmpGroup));
			
		currDate.setDate(currDate.getDate()+1);
	}
	return week;
}

function day(weekDayIn, groupDayIn, groupNightIn)
{
	var day = document.createElement('tr');
	day.className = 'day';
	
	var date = document.createElement('td');
	date.innerText = currDate.getDate().toString();
	
	var weekDay = document.createElement('td');
	weekDay.innerText = weekDayIn;
	
	var groupDay = document.createElement('td');
	groupDay.innerText = groupDayIn;
	
	if(groupDayIn == currGroup)
		groupDay.className = 'green';
	
	var groupNight = document.createElement('td');
	groupNight.innerText = groupNightIn;
	
	if(groupNightIn == currGroup)
		groupNight.className = 'green';
	
	day.appendChild(date);
	day.appendChild(weekDay);
	day.appendChild(groupDay);
	day.appendChild(groupNight);
	return day;
}

function dayWithWeekNr(weekDayIn, groupDayIn, groupNightIn, weekNrIn)
{
	var day = document.createElement('tr');
	day.className = 'day';
	
	var date = document.createElement('td');
	date.innerText = currDate.getDate().toString();
	
	var weekDay = document.createElement('td');
	weekDay.innerText = weekDayIn;
	
	var groupDay = document.createElement('td');
	groupDay.innerText = groupDayIn;
	
	if(groupDayIn == currGroup)
		groupDay.className = 'green';
	
	var groupNight = document.createElement('td');
	groupNight.innerText = groupNightIn;
	
	if(groupNightIn == currGroup)
		groupNight.className = 'green';
	
	var weekNr = document.createElement('td');
	weekNr.className = 'weekNumber';
	weekNr.innerText = weekNrIn.toString();
	
	day.appendChild(date);
	day.appendChild(weekDay);
	day.appendChild(groupDay);
	day.appendChild(groupNight);
	day.appendChild(weekNr);
	return day;
}

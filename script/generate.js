var weekDays = ["M", "T", "O", "T", "F", "L", "S"];

var months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

var monthsDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var year = 2014;

var currMonth = 0;

var currWeek = 0;

var currWeekDayStart = 0;
var currWeekDayEnd = 1;

var currDay = 1;
var dayInMonth = 0;

window.onload = function()
{
	generateTest();
}

function generateTest()
{
	var module = document.createElement('div');
	module.className = 'module';
	currWeek++;
	for(var i = 0; i < 12; i++)
		module.appendChild(month(currMonth++));
	document.getElementById('content').appendChild(module);
}

function month(monthNr)
{
	var month = document.createElement('div');
	month.className = 'month';
	
	var monthHeader = document.createElement('h1');
	monthHeader.innerText = months[monthNr];
	
	month.appendChild(monthHeader);
	
	var tmpCnt = 0;
	for(var i = 0; i <= monthsDay[monthNr]/7; i++)
	{
		console.log("Month: " + months[monthNr] + " i: " + i + " monthsDay[monthNr]/7: " + Math.floor(monthsDay[monthNr]/7) + " monthsDay[monthNr]%7: " + monthsDay[monthNr]%7 + " monthsDay[monthNr]: " + monthsDay[monthNr] + " tmpCnt: " + tmpCnt);
		if(i == Math.floor(monthsDay[monthNr]/7))
		{
			console.log("end");
			currWeekDayStart = 0;
			if(monthsDay[monthNr] - tmpCnt > 6)
			{
				console.log("end2");
				var tmpWeek = week(currWeek++, currWeekDayStart, 6);
				month.appendChild(tmpWeek);
				currWeekDayEnd = 7 - (monthsDay[monthNr] - tmpCnt);
			}
			else
			{
				currWeekDayEnd = monthsDay[monthNr] - tmpCnt;
				currWeek++;
			}
			
			tmpCnt += currWeekDayEnd - currWeekDayStart;
			currWeekDayEnd--;
		}
		else if(i == 0 && currWeekDayEnd != 6)
		{
			console.log("start");
			currWeekDayStart = currWeekDayEnd+1;
			currWeekDayEnd = 6;
			currDay = 1;
			tmpCnt += currWeekDayEnd - currWeekDayStart + 1;
		}
		else
		{
			console.log("normal");
			currWeekDayStart = 0;
			currWeekDayEnd = 6;
			tmpCnt += currWeekDayEnd - currWeekDayStart + 1;
			currWeek++;
		}
		//tmpCnt += currWeekDayEnd - currWeekDayStart;
		
		var tmpWeek = week(currWeek, currWeekDayStart, currWeekDayEnd);
		month.appendChild(tmpWeek);
	}
	
	/*month.appendChild(week(1, 0, 6));
	month.appendChild(week(2, 0, 6));
	month.appendChild(week(3, 0, 6));
	month.appendChild(week(4, 0, 6));
	month.appendChild(week(5, 0, 2));*/
	
	return month;
}

function week(weekNumber, start, stop)
{
	
	var week = document.createElement('table');
	week.className = 'week';
	
	if(currDay >= monthsDay[currMonth-1])
		currDay = 1;
	
	for(var i = start; i <= stop; i++)
	{
		if(i == start)
			week.appendChild(dayWithWeekNr(currDay++, weekDays[i], '1', weekNumber));
		else
			week.appendChild(day(currDay++, weekDays[i], '1'));
	}
		
	
	return week;
}

function day(dateIn, weekDayIn, groupDayIn)
{
	var day = document.createElement('tr');
	
	var date = document.createElement('td');
	date.className = 'date';
	date.innerText = dateIn.toString();
	
	var weekDay = document.createElement('td');
	weekDay.innerText = weekDayIn;
	
	var groupDay = document.createElement('td');
	groupDay.innerText = groupDayIn;
	groupDay.className = 'green';
	
	day.appendChild(date);
	day.appendChild(weekDay);
	day.appendChild(groupDay);
	return day;
}

function dayWithWeekNr(dateIn, weekDayIn, groupDayIn, weekNrIn)
{
	var day = document.createElement('tr');
	
	var date = document.createElement('td');
	date.innerText = dateIn.toString();
	
	var weekDay = document.createElement('td');
	weekDay.innerText = weekDayIn;
	
	var groupDay = document.createElement('td');
	groupDay.innerText = groupDayIn;
	groupDay.className = 'green';
	
	var weekNr = document.createElement('td');
	weekNr.innerText = weekNrIn.toString();
	
	day.appendChild(date);
	day.appendChild(weekDay);
	day.appendChild(groupDay);
	day.appendChild(weekNr);
	return day;
}

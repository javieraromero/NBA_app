export class DateCalculator
{
    daysOfWeek: String[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    DAYS_IN_MONTH: number[] = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    buildCalendar(date: MyDate)
    {
        var month = date.getMonth();
        var day = date.getDay();
        var year = date.getYear();
        var first = this.firstDayOfMonth(new MyDate(month, day, year));
        
        var spanningWeeks = 4; //can go up to 6
        var daysInAWeek = 7;

        var calendar = new Array(spanningWeeks);
        for(var i = 0; i < spanningWeeks; i++)
            calendar[i] = new Array(daysInAWeek);
        
        var dayIndex = 1;
        for(var x = 0; x < spanningWeeks ; x++)
        {
            var month_days = this.DAYS_IN_MONTH[month];
            for(var y = 0; y < daysInAWeek && dayIndex <= (this.isLeapYear(year) && month == 2 ? 29 : month_days); y++)
            {
                if(x == 0 && y < first)
                    calendar[x][y] = null;
                else
                {
                    calendar[x][y] = dayIndex;
                    dayIndex++;
                }
            }
            if(x == spanningWeeks - 1 && dayIndex <= month_days)
            {
                calendar[x + 1] = new Array(daysInAWeek);
                spanningWeeks += 1;
            }
        }

        return calendar;
    }

    firstDayOfMonth(a: MyDate)
    {
        var temp = new MyDate(a.getMonth(), 1, a.getYear());
        return temp.getDayOfWeek();
    }

    nextDay(date: MyDate)
    {
        date.nextDay();
        return date;
    }
    
    previousDay(date: MyDate)
    {
        date.previousDay();
        return date;
    }
    
    /*addDays(n: number)
    {
        this.current.addDays(n);
    }
    
    reverseDays(n: number)
    {
        this.current.reverseDays(n);
    }*/
    
    previousMonth(date: MyDate)
    {
        var month = date.getMonth();
        var day = date.getDay();
        var year = date.getYear();
        if(month == 3 && this.isLeapYear(year) && (day == 29 || day == 30 || day == 31))
        {
            month = 2;
            day = 29;
        }
        else if(month == 3 && (day == 29 || day == 30 || day == 31))
        {
            month = 2;
            day = 28;
        }
        else if((month == 5 || month == 7 || month == 10 || month == 12) && day == 31)
        {
            month--;
            day = 30;
        }
        else if(month == 1)
        {
            month = 12;
            year--;
        }
        else
            month--;
        return new MyDate(month, day, year);
    }
    
    nextMonth(date: MyDate)
    {
        var month = date.getMonth();
        var day = date.getDay();
        var year = date.getYear();
        if(month == 1 && this.isLeapYear(year) && (day == 29 || day == 30 || day == 31))
        {
            month = 2;
            day = 29;
        }
        else if(month == 1 && (day == 29 || day == 30 || day == 31))
        {
            month = 2;
            day = 28;
        }
        else if((month == 3 || month == 5 || month == 8 || month == 10) && day == 31)
        {
            month++;
            day = 30;
        }
        else if(month == 12)
        {
            month = 1;
            year++;
        }
        else
            month++;
        return new MyDate(month, day, year);
    }

    isLeapYear(year: number)
    {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }
}

export class MyDate
{
    month: number;
    day: number;
    year: number;

    MONTH_NAMES: String[] = ["", "January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
    DAYS_IN_WEEK: String[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    DAYS_IN_MONTH: number[] = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    constructor(month: number, day: number, year: number)
    {
        this.month = month;
        this.day = day;
        this.year = year;
    }

    nextDay()
    {
        if(this.month == 2 && this.day == 29)
        {
            this.day = 1;
            this.month = 3;
        }
        else if(this.isLeapYear(this.year) && this.month == 2 && this.day == 28)
        {
            this.day = 29;
        }
        else if(this.day == this.DAYS_IN_MONTH[this.month])
        {
            this.day = 1;
            if(this.month == 12)
            {
                this.year++;
                this.month = 1;
            }
            else
                this.month++;
        }
        else
            this.day++;
    }
    
    previousDay()
    {
        if(this.isLeapYear(this.year) && this.month == 3 && this.day == 1)
        {
            this.day = 29;
            this.month = 2;
        }
        else if(this.day == 1)
        {
            if(this.month == 1)
            {
                this.month = 12;
                this.year--;
            }
            else
                this.month--;
            this.day = this.DAYS_IN_MONTH[this.month];
        }
        else
            this.day--;
    }

    addDays(n: number)
    {
        for(var x = 0; x < n; x++)
            this.nextDay();
    }

    reverseDays(n: number)
    {
        for(var x = 0; x < n; x++)
            this.previousDay();
    }

    isLeapYear(year: number)
    {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }

    getMonthName()
    {
        return this.MONTH_NAMES[this.month];
    }

    getMonth()
    {
        return this.month;
    }
    
    getDay()
    {
        return this.day;
    }
    
    getYear()
    {
        return this.year;
    }

    getDayOfWeek()
    {
        var temp = new MyDate(10, 15, 1582);
        var tempDayOfWeek = 5;
        while(!this.compareDates(temp))
        {
            if(tempDayOfWeek == 6)
                tempDayOfWeek = 0;
            else
                tempDayOfWeek++;
            
            temp.nextDay();
        }
        
        return tempDayOfWeek;
    }

    getDayOfWeekName()
    {
        return this.DAYS_IN_WEEK[this.getDayOfWeek()];
    }

    compareDates(a: MyDate)
    {
        return a.getMonth() == this.getMonth() && a.getDay() == this.getDay() && a.getYear() == this.getYear();
    }
}
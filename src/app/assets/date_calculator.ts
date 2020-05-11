export class DateCalculator
{
    currentDate: String;
    month: number;
    day: number;
    year: number;
    DAYS_IN_MONTH: number[] = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    setDate(date: String)
    {
        this.currentDate = date;
        this.year = Number(this.currentDate.slice(0, 4));
        this.month = Number(this.currentDate.slice(4, 6));
        this.day = Number(this.currentDate.slice(6, ));
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

    isLeapYear(year: number)
    {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }

    getDate()
    {
        var monthFormatted = this.month <= 9? "0" + String(this.month) : String(this.month);
        var dayFormatted = this.day <= 9? "0" + String(this.day) : String(this.day);
        return this.year + monthFormatted + dayFormatted;
    }
}
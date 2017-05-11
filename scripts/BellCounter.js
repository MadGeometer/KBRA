/**
 * BellCounter
 *
 * @author Mike Klepper
 * @date 10 May 2017
 * @description Solves the KBRA code screen problem
 * @note Client-side JS has no dependency management!
 * Ordinarily, we would use AMD or requirejs to include this with the webpage
 * To keep things focused, I'm just adding an extra script tag in the HTML (which is what requirejs does anyway?)
 * If this were a Node.js application, BellCounter would be included using a require() statement.
 */

function BellCounter()
{
    /**
     * isValidTime - a private method used for input validation
     *
     * @param hours
     * @param minutes
     * @returns {boolean}
     */
    function isValidTime(hours, minutes)
    {
        return 0 <= hours && hours <= 23 && 0 <= minutes && minutes <= 59;
    }


    /**
     * countBells - a public method that solves the KBRA code screen problem
     *
     * @param startTime
     * @param endTime
     * @returns {*}
     */
    this.countBells = function (startTime, endTime)
    {
        var startTimeArr = startTime.split(":");
        var startHour = parseInt(startTimeArr[0]);
        var startMinute = parseInt(startTimeArr[1]);

        var endTimeArr = endTime.split(":");
        var endHour = parseInt(endTimeArr[0]);
        var endMinute = parseInt(endTimeArr[1]);

        if(isValidTime(startHour, startMinute) && isValidTime(endHour, endMinute))
        {
            if(endHour <= startHour)
            {
                endHour = endHour + 24;
            }

            if(startMinute !== 0)
            {
                startHour = startHour + 1;
            }

            var totalNumberOfBellRings = 0;

            for(var i = startHour; i <= endHour; i++)
            {
                if(i % 12 === 0)
                {
                    totalNumberOfBellRings += 12;
                }
                else
                {
                    totalNumberOfBellRings += i % 12;
                }
            }

            return totalNumberOfBellRings;
        }
        else
        {
            return null;
        }
    }
}
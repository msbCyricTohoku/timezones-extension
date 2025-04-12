function updateTimes() {
    const now = new Date();

    //options for formatting the time
    const timeOptions = {
        hour: 'numeric',
        minute: '2-digit',
        //second: '2-digit', //Optional: Remove seconds for a cleaner look
        hour12: true //Use false for 24-hour format
    };

     //helper function to format and update DOM element
     function setTime(elementId, timeZone, label) {
        try {
            const options = {...timeOptions, timeZone: timeZone, timeZoneName: 'short'};
            const timeString = now.toLocaleTimeString('en-US', options);
            //extract the time zone abbreviation generated (like PST, CET, JST)
            //const tzAbbreviation = timeString.split(' ')[2] || '';
            document.getElementById(elementId).textContent = `${label}: ${timeString}`;
        } catch (error) {
            console.error(`Error formatting time for ${timeZone}:`, error);
            document.getElementById(elementId).textContent = `${label}: Error`;
        }
    }


    //--- Local Time ---
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localLabel = `Local (${localTimeZone.split('/').pop().replace('_', ' ')})`;
    setTime('localTime', localTimeZone, localLabel);


    //--- Other Time Zones ---
    setTime('utcTime', 'UTC', 'UTC');
    setTime('jstTime', 'Asia/Tokyo', 'Tokyo (JST)');
    setTime('nycTime', 'America/New_York', 'New York (ET)');
    setTime('londonTime', 'Europe/London', 'London (UK)');
    setTime('milanTime', 'Europe/Rome', 'Milan (CET)'); //Italy uses Rome's zone
    setTime('moscowTime', 'Europe/Moscow', 'Moscow (MSK)');
    setTime('tehranTime', 'Asia/Tehran', 'Tehran (IRST)');
    setTime('delhiTime', 'Asia/Kolkata', 'New Delhi (IST)'); //India uses Kolkata's zone
    setTime('beijingTime', 'Asia/Shanghai', 'Beijing (CST)'); //China uses Shanghai's zone base
    setTime('sydneyTime', 'Australia/Sydney', 'Sydney (AEST)');
    setTime('mexicoCityTime', 'America/Mexico_City', 'Mexico City (CST)');
    setTime('cairoTime', 'Africa/Cairo', 'Cairo (EET)');
    setTime('saoPauloTime', 'America/Sao_Paulo', 'São Paulo (BRT)'); //Major Brazil Hub Time

}

//update the times immediately when the popup opens
updateTimes();

//update the times every second while the popup is open
//consider increasing interval if seconds aren't displayed or performance is a concern
setInterval(updateTimes, 1000); //Updates every 1 second
//setInterval(updateTimes, 5000); //Or update every 5 seconds
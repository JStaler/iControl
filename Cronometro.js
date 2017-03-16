
var ChronoTimer = {}; // Main Class


ChronoTimer.Time = new function () { // ChronoTimer Class

    this.current_time = 0;
    this.current_minute = 0;
    this.current_second = 0;
    this.current_millisecond = 0;
    this.stop_initial = false;

    this.chronoStart = function () { // This method start and control the timer
        if (ChronoTimer.Time.stop_initial) {
            ChronoTimer.Time.current_millisecond += 1;
            if (ChronoTimer.Time.current_millisecond == 10) {
                ChronoTimer.Time.current_millisecond = 0;
                ChronoTimer.Time.current_second += 1;
            }
            if (ChronoTimer.Time.current_second == 60) {
                ChronoTimer.Time.current_second = 0;
                ChronoTimer.Time.current_minute += 1;
            }
            if (ChronoTimer.Time.current_minute == 60) {
                ChronoTimer.Time.current_minute = 0;
                ChronoTimer.Time.current_time += 1;
            }

            string_hour = "" + ChronoTimer.Time.current_time;
            string_minute = "" + ChronoTimer.Time.current_minute;
            string_second = "" + ChronoTimer.Time.current_second;
            string_millisecond = "" + ChronoTimer.Time.current_millisecond;

            if (string_hour.length != 2) {
                string_hour = "0" + ChronoTimer.Time.current_time;
            }

            if (string_minute.length != 2) {
                string_minute = "0" + ChronoTimer.Time.current_minute;
            }

            if (string_second.length != 2) {
                string_second = "0" + ChronoTimer.Time.current_second;
            }

            var time_obj = {// Set strings to current time
                hour: string_hour,
                minute: string_minute,
                second: string_second,
                millisecond: string_millisecond
            };

            ChronoTimer.Time.setChronometerTime(time_obj);
            setTimeout("ChronoTimer.Time.chronoStart()", 100);
        }
    }

    this.setChronometerTime = function (time_obj) {// Set current time
        var setText = time_obj.hour + ":" + time_obj.minute + ":" + time_obj.second

        //bhoModule.Teste(setText);

        document.getElementById('loadingText').innerHTML = '<P> Carregando </P>';
        document.getElementById('loadingText').appendChild(document.createTextNode(setText));

    }

    this.chronoRestart = function () {
        ChronoTimer.Time.stop_initial = false;
        ChronoTimer.Time.current_time = 0;
        ChronoTimer.Time.current_minute = 0;
        ChronoTimer.Time.current_second = 0;
        ChronoTimer.Time.current_millisecond = 0;
        string_hour = "00";
        string_minute = "00";
        string_second = "00";
        string_millisecond = "00";
    }

}
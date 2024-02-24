export type Shift = {
    start: "00:00" | "00:15" | "00:30" | "00:45" | "01:00" | "01:15" | "01:30" | "01:45" | "02:00" | "02:15" | "02:30" | "02:45" | "03:00" | "03:15" | "03:30" | "03:45" |
        "04:00" | "04:15" | "04:30" | "04:45" | "05:00" | "05:15" | "05:30" | "05:45" | "06:00" | "06:15" | "06:30" | "06:45" | "07:00" | "07:15" | "07:30" | "07:45" |
        "08:00" | "08:15" | "08:30" | "08:45" | "09:00" | "09:15" | "09:30" | "09:45" | "10:00" | "10:15" | "10:30" | "10:45" | "11:00" | "11:15" | "11:30" | "11:45" |
        "12:00" | "12:15" | "12:30" | "12:45" | "13:00" | "13:15" | "13:30" | "13:45" | "14:00" | "14:15" | "14:30" | "14:45" | "15:00" | "15:15" | "15:30" | "15:45" |
        "16:00" | "16:15" | "16:30" | "16:45" | "17:00" | "17:15" | "17:30" | "17:45" | "18:00" | "18:15" | "18:30" | "18:45" | "19:00" | "19:15" | "19:30" | "19:45" |
        "20:00" | "20:15" | "20:30" | "20:45" | "21:00" | "21:15" | "21:30" | "21:45" | "22:00" | "22:15" | "22:30" | "22:45" | "23:00" | "23:15" | "23:30" | "23:45";
    end: "00:00" | "00:15" | "00:30" | "00:45" | "01:00" | "01:15" | "01:30" | "01:45" | "02:00" | "02:15" | "02:30" | "02:45" | "03:00" | "03:15" | "03:30" | "03:45" |
        "04:00" | "04:15" | "04:30" | "04:45" | "05:00" | "05:15" | "05:30" | "05:45" | "06:00" | "06:15" | "06:30" | "06:45" | "07:00" | "07:15" | "07:30" | "07:45" |
        "08:00" | "08:15" | "08:30" | "08:45" | "09:00" | "09:15" | "09:30" | "09:45" | "10:00" | "10:15" | "10:30" | "10:45" | "11:00" | "11:15" | "11:30" | "11:45" |
        "12:00" | "12:15" | "12:30" | "12:45" | "13:00" | "13:15" | "13:30" | "13:45" | "14:00" | "14:15" | "14:30" | "14:45" | "15:00" | "15:15" | "15:30" | "15:45" |
        "16:00" | "16:15" | "16:30" | "16:45" | "17:00" | "17:15" | "17:30" | "17:45" | "18:00" | "18:15" | "18:30" | "18:45" | "19:00" | "19:15" | "19:30" | "19:45" |
        "20:00" | "20:15" | "20:30" | "20:45" | "21:00" | "21:15" | "21:30" | "21:45" | "22:00" | "22:15" | "22:30" | "22:45" | "23:00" | "23:15" | "23:30" | "23:45";        
};

export type DayPlan = Shift[];

export type WeekPlan = {
    lundi: DayPlan,
    mardi: DayPlan,
    mercredi: DayPlan,
    jeudi: DayPlan,
    vendredi: DayPlan,
    samedi: DayPlan,
    dimanche: DayPlan,
}

// fonction qui retourne la valeur de l'amplitude du shift (en HH:MM)
const getShiftAmplitube = (shift: Shift) => {
    const start = shift.start.split(':');
    const end = shift.end.split(':');
    const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
    const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);
    const amplitude = endMinutes - startMinutes;
    const hours = Math.floor(amplitude / 60);
    const minutes = amplitude % 60;
    return `${hours}:${minutes}`;  
};

// fonction qui retourne la valeur de l'amplitude de la journée (en HH:MM)
const getDayAmplitude = (day: DayPlan) => {
    let amplitude = 0;
    day.forEach(shift => {
        const shiftAmplitude = getShiftAmplitube(shift);
        const shiftAmplitudeMinutes = parseInt(shiftAmplitude.split(':')[0]) * 60 + parseInt(shiftAmplitude.split(':')[1]);
        amplitude += shiftAmplitudeMinutes;
    });
    const hours = Math.floor(amplitude / 60);
    const minutes = amplitude % 60;
    return `${hours}:${minutes}`;
};

// fonction qui retourne la valeur de l'amplitude de la semaine (en HH:MM)
const getWeekAmplitude = (week: WeekPlan) => {
    const lundiAmplitude = getDayAmplitude(week.lundi);
    const lundiAmplitudeInMinutes = parseInt(lundiAmplitude.split(':')[0]) * 60 + parseInt(lundiAmplitude.split(':')[1]);
    const mardiAmplitude = getDayAmplitude(week.mardi);
    const mardiAmplitudeInMinutes = parseInt(mardiAmplitude.split(':')[0]) * 60 + parseInt(mardiAmplitude.split(':')[1]);
    const mercrediAmplitude = getDayAmplitude(week.mercredi);
    const mercrediAmplitudeInMinutes = parseInt(mercrediAmplitude.split(':')[0]) * 60 + parseInt(mercrediAmplitude.split(':')[1]);
    const jeudiAmplitude = getDayAmplitude(week.jeudi);
    const jeudiAmplitudeInMinutes = parseInt(jeudiAmplitude.split(':')[0]) * 60 + parseInt(jeudiAmplitude.split(':')[1]);
    const vendrediAmplitude = getDayAmplitude(week.vendredi);
    const vendrediAmplitudeInMinutes = parseInt(vendrediAmplitude.split(':')[0]) * 60 + parseInt(vendrediAmplitude.split(':')[1]);
    const samediAmplitude = getDayAmplitude(week.samedi);
    const samediAmplitudeInMinutes = parseInt(samediAmplitude.split(':')[0]) * 60 + parseInt(samediAmplitude.split(':')[1]);
    const dimancheAmplitude = getDayAmplitude(week.dimanche);
    const dimancheAmplitudeInMinutes = parseInt(dimancheAmplitude.split(':')[0]) * 60 + parseInt(dimancheAmplitude.split(':')[1]);
    const amplitude = lundiAmplitudeInMinutes + mardiAmplitudeInMinutes + mercrediAmplitudeInMinutes + jeudiAmplitudeInMinutes + vendrediAmplitudeInMinutes + samediAmplitudeInMinutes + dimancheAmplitudeInMinutes;
    const hours = Math.floor(amplitude / 60);
    const minutes = amplitude % 60;
    return `${hours}:${minutes}`;
};


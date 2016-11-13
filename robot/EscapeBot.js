/**
 * Created by TSH96 on 10/11/2016.
 */


function deg2Rad(deg) {
    return deg / 180 * Math.PI;
}

function rad2Deg(rad) {
    return rad * 180 / Math.PI;
}

var robot = {
    sensors: [
        {
            distance: 40, //mm
            angle: deg2Rad(180), //degree
            x: 0, //mm
            y: 20, //mm
            sensed: false
        },
        {
            distance: 40, //mm
            angle: deg2Rad(180 - 45), //degree
            x: 10,
            y: 0, //mm
            sensed: false
        },
        {
            distance: 40, //mm
            angle: deg2Rad(90), //degree
            x: 125 / 2, //mm
            y: 0, //mm
            sensed: false
        },
        {
            distance: 40, //mm
            angle: deg2Rad(45), //degree
            x: 125 - 10,
            y: 0, //mm
            sensed: false
        },
        {
            distance: 40, //mm
            angle: deg2Rad(0), //degree
            x: 125, //mm
            y: 20, //mm
            sensed: false
        }
    ],
    width: 125, //mm
    length: 140, //mm
    cx: 125, //mm
    cy: 140, //mm
    angle: deg2Rad(30), //deg
    collide: false,
    status: 0b00000
};
/**
 * Created by TSH96 on 13/11/2016.
 */

var playbackIndex = 0;
var playbackRobot = [];
var playbackID = 0;
var playbackLength = 10;
var playbackInterval = 100;
var stopOnSenseChange = false;

function playBack() {
    stopRobot();

    playbackID = playbackID ? playbackID : setInterval(function () {

        if (++playbackIndex > playbackLength) {
            playbackIndex = 0;
        }

        var playbackRobot2 = playbackRobot[playbackIndex];
        robot.cx = playbackRobot2.cx;
        robot.cy = playbackRobot2.cy;
        robot.angle = playbackRobot2.angle;
        clearCanvas();
        updateRobot();
    }, playbackInterval);
}


function stopPlayback() {
    stopRobot();
    clearInterval(playbackID);
    playbackID = 0;
}


function MOVE_ROBOT(v1, v2) {
    moveRobot(v1, v2);

    playbackRobot[playbackIndex] = {
        cx: robot.cx, //mm
        cy: robot.cy, //mm
        angle: robot.angle //deg
    };

    if (++playbackIndex > playbackLength) {
        playbackIndex = 0;
    }


    if (robot.status !== prevStatus[0]) {
        console.log(pad(robot.status, 5), v1, v2);
        if (stopOnSenseChange){
            stopRobot();
        }
    }
}
/**
 * Created by TSH96 on 13/11/2016.
 */

var RobotCanvas = document.getElementById('RobotCanvas');
var RobotCanvasCtx = RobotCanvas.getContext('2d');
var scaleFactor = 0.5;
var intervalId;
var stopOnCollide = false;
RobotCanvasCtx.scale(scaleFactor, -scaleFactor);
RobotCanvasCtx.translate(0, -RobotCanvas.height / scaleFactor);
RobotCanvasCtx.lineWidth = 3;

var ObstacleCanvas = document.getElementById('ObstacleCanvas');
var ObstacleCanvasCtx = ObstacleCanvas.getContext('2d');

ObstacleCanvasCtx.scale(scaleFactor, -scaleFactor);
ObstacleCanvasCtx.translate(0, -ObstacleCanvas.height / scaleFactor);
ObstacleCanvasCtx.lineWidth = 3;

var halfLength = robot.length / 2;
var halfWidth = robot.width / 2;

var dt = 0.25;

function line2LineCollide(x1, y1, x2, y2, x3, y3, x4, y4) {
    var numerator = (x4 * (y1 - y2) + x3 * (-y1 + y2) + (x1 - x2) * (y3 - y4));
    var t1 = (x4 * (y1 - y3) + x1 * (y3 - y4) + x3 * (-y1 + y4)) / numerator;
    var t2 = (x3 * (-y1 + y2) + x2 * (y1 - y3) + x1 * (-y2 + y3)) / numerator;

    return (0 < t1 && t1 < 1) && (0 < t2 && t2 < 1);
}

function drawObstacle() {
    var ctx = ObstacleCanvasCtx;
    ctx.beginPath();
    obstacles.lines.forEach(function (line) {
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
    });
    ctx.stroke();
}


function updateRobot() {
    var ctx = RobotCanvasCtx;

    var x = RobotCanvas.width / scaleFactor;
    var y = RobotCanvas.height / scaleFactor;

    // draw sensors
    robot.status = 0b00000;
    for (var sensorNo = robot.sensors.length - 1; sensorNo >= 0; --sensorNo) {
        var sensor = robot.sensors[sensorNo];

        var temp_sx1 = sensor.x - halfWidth;
        var temp_sy1 = halfLength - sensor.y;

        var cosAngle = Math.cos(robot.angle);
        var sinAngle = Math.sin(robot.angle);

        var sx1 = temp_sx1 * cosAngle - temp_sy1 * sinAngle + robot.cx;
        var sy1 = temp_sx1 * sinAngle + temp_sy1 * cosAngle + robot.cy;

        var sx2 = sensor.distance * Math.cos(sensor.angle + robot.angle) + sx1;
        var sy2 = sensor.distance * Math.sin(sensor.angle + robot.angle) + sy1;

        sensor.sensed = false;
        for (var lineNo = obstacles.lines.length - 1; lineNo >= 0; --lineNo) {
            var line = obstacles.lines[lineNo];
            if (line2LineCollide(sx1, sy1, sx2, sy2, line.x1, line.y1, line.x2, line.y2)) {
                sensor.sensed = true;
                robot.status += 1 << (4 - sensorNo);
                break;
            }
        }

        ctx.strokeStyle = sensor.sensed ? '#ff0000' : '#000000';
        ctx.beginPath();
        ctx.moveTo(sx1, sy1);
        ctx.lineTo(sx2, sy2);
        ctx.stroke();
    }

    var x1 = -halfWidth * cosAngle + halfLength * sinAngle + robot.cx;
    var y1 = -halfWidth * sinAngle - halfLength * cosAngle + robot.cy;

    var x2 = halfWidth * cosAngle + halfLength * sinAngle + robot.cx;
    var y2 = halfWidth * sinAngle - halfLength * cosAngle + robot.cy;

    var x3 = halfWidth * cosAngle - halfLength * sinAngle + robot.cx;
    var y3 = halfWidth * sinAngle + halfLength * cosAngle + robot.cy;

    var x4 = -halfWidth * cosAngle - halfLength * sinAngle + robot.cx;
    var y4 = -halfWidth * sinAngle + halfLength * cosAngle + robot.cy;

    robot.collide = false;
    for (var lineNo = obstacles.lines.length - 1; lineNo >= 0; --lineNo) {
        var line = obstacles.lines[lineNo];
        if (
            line2LineCollide(x1, y1, x2, y2, line.x1, line.y1, line.x2, line.y2) ||
            line2LineCollide(x2, y2, x3, y3, line.x1, line.y1, line.x2, line.y2) ||
            line2LineCollide(x3, y3, x4, y4, line.x1, line.y1, line.x2, line.y2) ||
            line2LineCollide(x4, y4, x1, y1, line.x1, line.y1, line.x2, line.y2)
        ) {
            robot.collide = true;

            if(stopOnCollide){
                stopRobot();
            }
            break;
        }
    }

    ctx.strokeStyle = robot.collide ? '#ff0000' : '#000000';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.lineTo(x1, y1);
    ctx.stroke();

}

function clearCanvas() {
    RobotCanvasCtx.clearRect(0, 0, RobotCanvas.width / scaleFactor, RobotCanvas.height / scaleFactor);
}

function moveRobot(v1, v2) {
    var av = (v1 + v2) / 2;

    if (v1 == v2) {
        robot.cx += v1 * dt * Math.sin(-robot.angle);
        robot.cy += v1 * dt * Math.cos(-robot.angle);
    } else {
        var d = 120; //distance between two wheels (mm)
        var r = -((d * (v1 + v2)) / (2 * (v1 - v2))); // distance between center of rotation to geometry centroid of the robot

        var s = (v1 + v2) / 2 * dt;

        var angularVelocity = r ? av / r : v2 * 2 / d;
        robot.angle += angularVelocity * dt;

        robot.cx -= s * Math.sin(robot.angle);
        robot.cy += s * Math.cos(robot.angle);
    }
}

function startRobot() {
    intervalId = intervalId ? intervalId : setInterval(function () {
        algorithm(robot);
        clearCanvas();
        updateRobot();
    }, 10);
}

function stopRobot() {
    clearInterval(intervalId);
    intervalId = 0;
}

function mouseMove(e) {
    var dx = e.movementX / scaleFactor;
    var dy = (-e.movementY) / scaleFactor;

    robot.cx += dx;
    robot.cy += dy;

    clearCanvas();
    updateRobot();
}

RobotCanvas.addEventListener('mouseup', function () {
    RobotCanvas.removeEventListener('mousemove', mouseMove);
});

RobotCanvas.addEventListener('mousedown', function (e) {
    var halfW = robot.width / 2;
    var halfH = robot.length / 2;

    var cosAngle = Math.cos(robot.angle);
    var sinAngle = Math.sin(robot.angle);

    var x = e.offsetX / scaleFactor;
    var y = (RobotCanvas.height - e.offsetY) / scaleFactor;

    var x1 = -halfW * cosAngle + halfH * sinAngle + robot.cx;
    var y1 = -halfW * sinAngle - halfH * cosAngle + robot.cy;

    var x2 = halfW * cosAngle + halfH * sinAngle + robot.cx;
    var y2 = halfW * sinAngle - halfH * cosAngle + robot.cy;

    var x3 = halfW * cosAngle - halfH * sinAngle + robot.cx;
    var y3 = halfW * sinAngle + halfH * cosAngle + robot.cy;

    var x4 = -halfW * cosAngle - halfH * sinAngle + robot.cx;
    var y4 = -halfW * sinAngle + halfH * cosAngle + robot.cy;

    if (!(
            line2LineCollide(x, y, robot.cx, robot.cy, x1, y1, x2, y2) ||
            line2LineCollide(x, y, robot.cx, robot.cy, x2, y2, x3, y3) ||
            line2LineCollide(x, y, robot.cx, robot.cy, x3, y3, x4, y4) ||
            line2LineCollide(x, y, robot.cx, robot.cy, x4, y4, x1, y1)
        )) {
        RobotCanvas.addEventListener('mousemove', mouseMove);
        console.log(e);
    }
});


drawObstacle();
startRobot();
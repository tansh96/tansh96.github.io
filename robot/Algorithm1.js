/**
 * Created by TSH96 on 13/11/2016.
 */

var prevStatus =[];

function pad(num, size) {
    var s = num.toString(2);
    while (s.length < size) s = "0" + s;
    return s;
}


var algorithm = function (robot) {
    switch (robot.status) {
        case 0b00000:
            MOVE_ROBOT(15, 15);
            break;
        case 0b00001:
            MOVE_ROBOT(15, 15);
            break;
        case 0b00010:
            MOVE_ROBOT(0, 15);
            break;
        case 0b00011:
            MOVE_ROBOT(-15, 10);
            break;
        case 0b00100:
            if (prevStatus[1] == 0b10000 || prevStatus[2] == 0b10000 && prevStatus[1] == 0b00000) {
                MOVE_ROBOT(-15, 15);
            } else {
                MOVE_ROBOT(15, -15);
            }
            break;
        case 0b00101:
            MOVE_ROBOT(-15, 15);
            break;
        case 0b00110:
            MOVE_ROBOT(-15, 15);
            break;
        case 0b00111:
            MOVE_ROBOT(-15, 15);
            break;
        case 0b01000:
            MOVE_ROBOT(15, -10);
            break;
        case 0b01001:
            break;
        case 0b01010:
            break;
        case 0b01011:
            break;
        case 0b01100:
            MOVE_ROBOT(15, -15);
            break;
        case 0b01101:
            break;
        case 0b01110:
            break;
        case 0b01111:
            MOVE_ROBOT(15, -15);
            break;
        case 0b10000:
            MOVE_ROBOT(15, 15);
            break;
        case 0b10001:
            MOVE_ROBOT(15, 15);
            break;
        case 0b10010:
            break;
        case 0b10011:
            MOVE_ROBOT(5, 15);
            break;
        case 0b10100:
            MOVE_ROBOT(15, -15);
            break;
        case 0b10101:
            break;
        case 0b10110:
            MOVE_ROBOT(15, -15);
            break;
        case 0b10111:
            break;
        case 0b11000:
            MOVE_ROBOT(15, -15);
            break;
        case 0b11001:
            break;
        case 0b11010:
            break;
        case 0b11011:
            break;
        case 0b11100:
            MOVE_ROBOT(-15, -10);
            break;
        case 0b11101:
            break;
        case 0b11110:
            MOVE_ROBOT(15, -15);
            break;
        case 0b11111:
            break;
    }

    if (prevStatus[0] != robot.status) {
        prevStatus[2] = prevStatus[1];
        prevStatus[1] = prevStatus[0];
        prevStatus[0] = robot.status;
    }
};
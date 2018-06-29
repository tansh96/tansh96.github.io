var raw_cards = [
    { count: 1, name: 'img/red.png' },
    { count: 5, name: 'img/yellow.png' },
    { count: 3, name: 'img/chickilicious.png' },
    { count: 3, name: 'img/pizza.png' },
    { count: 3, name: 'img/kfc.png' },
    { count: 3, name: 'img/junction.png' },
    { count: 3, name: 'img/hehehaha.png' },
    { count: 3, name: 'img/fish.png' },
];

var count = (function (cards) {
    var count = 0
    cards.forEach(card => {
        count += card.count;
    });
    return count;
})(raw_cards)

var cards = (function (cards) {
    var cards_elem = [];

    cards.forEach(card => {
        for (let index = 0; index < card.count; index++) {
            cards_elem.push($('<a href="javascript:;" class="weui-grid">')
                .append($('<img class="img" alt="">').attr('src', 'img/cover.png'))
                .append($('<img class="info" alt="">').attr('src', card.name))
            );
        }
    });

    return cards_elem;
})(raw_cards)

// randomize
cards.sort(function (a, b) { return 0.5 - Math.random() });
cards.forEach(card => {
    $('#draw').append(card);
});


var clickstate = 0;
var turn = function (target, time, opts) {
    target.find('a').click(function () {
        if (clickstate == 1) {
            return;
        }

        var result = checkResult();
        if(result){
            $('.result').attr('src', result);
            $('#show_result').show();
            clickstate = 1;
            setTimeout(function () {
                $('#iosDialog1').show();

                $img.parent().siblings('a').find('.info').addClass('shelter');
                $img.parent().siblings('a').find('.img').stop().animate(opts[0], time, function () {
                    $(this).hide().next().show();
                    $(this).next().animate(opts[1], time);
                });

            }, 1000)
            return;
        }

        var $img = $(this).find('.img');
        if ($img.next().attr('src') == 'img/red.png') {
            clickstate = 1;
            setTimeout(function () {
                $('#iosDialog2').show();

                $img.parent().siblings('a').find('.info').addClass('shelter');
                $img.parent().siblings('a').find('.img').stop().animate(opts[0], time, function () {
                    $(this).hide().next().show();
                    $(this).next().animate(opts[1], time);
                });

            }, 1000)
        }

        $img.stop().animate(opts[0], time, function () {
            $(this).hide().next().show();
            $(this).next().animate(opts[1], time);
        });
    });
}

function checkResult() {

    var a = [];
    $('.info:visible').each(function (index, elem) {
        a.push($(elem).attr('src'));
    })

    var counts = {};

    for (var i = 0, il = a.length; i < il; i++) {
        var key = a[i];

        if(key == 'img/yellow.png'){
            continue;
        }

        if (typeof counts[key] === 'undefined') {
            counts[key] = 0;
        }

        counts[key]++;
    }

    var max = -1;

    for (var key in counts) {
        if (counts[key] >= 3) {
            max = counts[key];
            return key;
        }
    }

    return null;
}

var verticalOpts = [{ 'width': 0 }, { 'width': '90%' }];
turn($('#draw'), 400, verticalOpts);

function ClosePage() {
    $('#iosDialog1').hide();
    $('#iosDialog2').hide();
}
function Refresh() {
    $('#iosDialog1').hide();
}
function TurnMyCenter() {
    $('#iosDialog1').hide();
}
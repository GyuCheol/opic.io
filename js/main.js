

$(document).ready(function() {
    var lastAudio = undefined;
    var isPlaying = false;
    var startTime = Date.now();
    var timer;
    var timerLabel = document.getElementById("timer");

    var items = [
        [
            newObj("자기소개", "I", 1, ["자신감!"])
        ],

        [
            newObj("선택주제 - 아파트", "O_APT", 4, ["동네 묘사", "이웃 소개", "동네 경험 설명", "동네 과거 현재 비교"]),
            newObj("선택주제 - 집", "O_H", 4, ["우리 집 묘사", "내 방 묘사", "집에서 가족과 시간 보내기", "최근 변화"]),
            newObj("선택주제 - 조깅", "O_JOG", 4, ["조깅 루틴", "부상 피하기, 조깅용 아이템", "언제부터 걸었니", "특별한 경험"]),
            newObj("선택주제 - 영화", "O_MOV", 4, ["좋아하는 영화", "좋아하는 배우", "영화 루틴", "기억에 남는 영화"]),
            newObj("선택주제 - 카페", "O_CAFE", 4, ["좋아하는 카페 묘사", "카페 뭐하러 누구랑가", "특별한 경험", "처음으로 갔던 카페간 날"]),
            newObj("선택주제 - 음악", "O_MUSIC", 4, ["좋아하는 음악/가수", "언제 음악 듣니", "좋아하는 음악 변천사", "특별한 경험"]),
            newObj("선택주제 - 여행", "O_TRIP", 4, ["좋아하는 국내여행", "여행 시 챙기는 것", "첫 해외여행 경험", "기억에 남는 여행 경험"]),
            newObj("선택주제 - 콘서트", "O_CONT", 4, ["최근 갔던 콘서트 설명", "어떤 공연장 좋니", "어딜 자주 가니, 누구랑", "특별한 경험, 공연자"]),
            newObj("선택주제 - 공원", "O_PARK", 4, ["좋아하는 공원 설명", "공원에서 놀면 뭐하니?", "얼마나 자주 가니, 누구랑?", "특별한 경험"]),
            newObj("선택주제 - 해변", "O_BEACH", 4, ["좋아하는 해변 설명", "해변갈 때 챙기는 아이템", "캠핑?", "캠핑 때 특별한 경험"]),
        ],

        [
            newObj("돌발주제 - 집안일", "P_HOUSEWORK", 3, ["집안일 설명", "가족 구성원의 각 역할", "하지 못한 경험"]),
            newObj("돌발주제 - 식당", "P_REST", 3, ["어떤 음식이 나오니", "네 나라 전통 음식", "최근에 식당간 경험"]),
            newObj("돌발주제 - 인터넷", "P_INTERNET", 3, ["인터넷 쓰는게 왜 좋니", "무슨 SW 쓰니", "첨에 인터넷 쓴 경험"]),
            newObj("돌발주제 - 도서관", "P_LIB", 3, ["도서관에서 문제 있었니", "주로 가는 도서관 묘사", "최근에 간 도서관"]),
            newObj("돌발주제 - 은행", "P_BANK", 3, ["사람들은 왜 은행가", "은행 묘사", "은행 경험 이야기 해줘"]),
            newObj("돌발주제 - 재활용", "P_RECYCLE", 3, ["재활용 시스템 설명해봐라", "어떻게 집에서 재활용하니, 절차 설명", "재활용하면서 특별한 경험"]),
            newObj("돌발주제 - 교통", "P_TRANSIT", 3, ["대중교통 설명", "대중교통 과거/현재 변화", "가끔 대중교통 불편, 문제가 됐던 경험"]),
            newObj("돌발주제 - 가구", "P_FURNITURE", 3, ["좋아하는 가구", "최근에 산 가구", "전기 관련해서 문제가 생겼고, 어떻게 해결했니?"]),
            newObj("돌발주제 - 건강", "P_HEALTH", 3, ["건강을 위해 뭘 해야할까", "치과에 대한 경험", "건강을 위해 그만둔 경험"]),
            newObj("돌발주제 - 휴일", "P_HOLIDAY", 3, ["어렸을 때 특별한 휴일 경험", "큰 휴일(명절?)", "어떤 기념일이 있니, 전통음식은?"]),
            newObj("돌발주제 - 호텔", "P_HOTEL", 3, ["호텔 묘사(편의시설)", "호텔가면 뭐해", "호텔에서 특별한 경험"]),
            newObj("돌발주제 - 옷", "P_CLOTH", 3, ["특별히 무슨 옷 입니 너네 나라", "과거/현재 비교", "최근에 옷쇼핑한거"]),
            newObj("돌발주제 - 약속", "P_APPOINT", 3, ["너는 주로 뭐로 약속잡니, 누구랑", "어디서 주로 만나", "특별한 약속 경험"]),
            newObj("돌발주제 - 날씨", "P_WEATHER", 3, ["계절 묘사", "과거/현재 계절 변화", "계절때메 생긴 특별한 경험"]),
        ],

        [
            newObj("롤플레잉 - 에바에게 묻기", "RA", 7, ["가족에 대해", "하버드 대학교", "이사갔음", "영화", "수영", "밴쿠버", "도서관"]),
            newObj("롤플레잉 - 문의", "RB", 13, ["백화점 옷", "수업 문의", "상사에게 프로젝트 묻기", "친구에게 MP3 묻기", "요리 재료 점원에게 묻기", "카페 메뉴 묻기", "비행기 지연 문의", "해외여행 문의", "등록마감 수업 문의", "회사 동료에게 신제품 문의", "영화관람 문의", "헬스장 문의", "병원 진료 문의"]),
            newObj("롤플레잉 - 해결/대안", "RC", 5, ["시험 못보는 상황", "회의 참석 못함", "영화 표 잘못 끊음", "비행기 취소 상황", "구매 제품 손상"]),
        ]

    ];

    function newObj(title, mp3, length, subtitles) {
        var obj = {
            "title": title,
            "mp3": mp3,
            "length": length,
            "subtitles": subtitles
        };

        return obj;
    }

    function reset() {

        if (lastAudio != undefined) {
            lastAudio.pause();
        }

        clearTimeout(timer);
        timerLabel.innerHTML = "00:00.000";
        startTime = Date.now();
    }

    function createCardBody(obj) {
        var bodyContainer = document.createElement("div");
        var cardBody = document.createElement("div");
        var listGroup = document.createElement("div");

        bodyContainer.className = "collapse";
        cardBody.className = "card-body";
        listGroup.className = "list-group";

        for (let i = 0; i < obj.length; ++i) {
            let btn = document.createElement("button");
            let tmp = i + 1;

            btn.className = "list-group-item list-group-item-action btn";
            btn.innerHTML = "질문" + (i + 1);

            if (obj.subtitles.length > 0) {
                btn.innerHTML += " - " + obj.subtitles[i];
            }

            listGroup.appendChild(btn);
            
            btn.onclick = function() {
                reset();
        
                var audio = new Audio();
            
                $(audio).on("loadedmetadata", function() {
                    let delay = (audio.duration - 3) * 1000;
                    timer = setTimeout(tick, delay);
                    startTime = Date.now() + delay;
                });

                audio.src = "./mp3/" + obj.mp3 + tmp + ".mp3";
                audio.play();
        
                lastAudio = audio;
            };

        }

        cardBody.appendChild(listGroup);
        bodyContainer.appendChild(cardBody);

        return bodyContainer;
    }

    function createCardContainer(obj) {
        var cardContainer = document.createElement("div");
        var cardHeader = document.createElement("div");
        var header = document.createElement("h2");
        var cardBody = createCardBody(obj);
        
        cardContainer.className = "card";
        cardHeader.className = "card-header";
        header.className = "mb-0";

        var btn = document.createElement("div");

        btn.className = "btn btn-link d-flex justify-content-between align-items-center";
        btn.style = "display: block;";
        btn.innerHTML = obj.title + '<span class="badge badge-primary badge-pill">' + obj.length + '</span>';

        header.appendChild(btn);
        cardHeader.appendChild(header);
        cardContainer.appendChild(cardHeader);
        cardContainer.appendChild(cardBody);

        cardHeader.onclick = function() {
            $('.collapse').collapse('hide');
            $(cardContainer).find('.collapse').collapse('toggle');
        };

        return cardContainer;
    }

    function fillZero(n, number) {
        var tostr = '' + number;

        while (tostr.length < n) {
            tostr = '0' + tostr;
        }

        return tostr;
    }

    function tick() {
        var diff = parseInt(Date.now() - startTime)
        var ms = diff % 1000;
        var seconds = parseInt((diff / 1000) % 60);
        var minutes = parseInt((diff / 1000) / 60);

        timerLabel.innerHTML = fillZero(2, minutes) + ':' + fillZero(2, seconds) + '.' + fillZero(3, ms);

        timer = setTimeout(tick, 13);
    }

    (function init() {
        for (let i = 0; i < items.length; ++i) {
            let container = document.createElement("div");

            container.className = "accordion mt-3";

            for (let j = 0; j < items[i].length; ++j) {
                container.appendChild(createCardContainer(items[i][j]));
            }

            document.getElementById("main").appendChild(container);
        }
    })();
    
    document.getElementById("reset").onclick = function() {
        reset();
    };

});



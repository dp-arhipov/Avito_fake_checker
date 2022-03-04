'use strict';
let descriptionId = '.item-description';

if (document.querySelector(descriptionId) != null) {
        //расширение отработает только если на странице обнаружиться блок .item-description с описанием объявления
        let description = document.querySelector(descriptionId).textContent;

        let infBlockId = '.title-info-actions-item';//блок, куда мы будем вставлять свою иконку оригинальности
        let infBlock = document.querySelector(infBlockId);
        let fakeMarkers = [
                "копия",
                "люкс",
                "lux",
                "фабри(к|ка|чное)",
                "(k|к)(a|а)ч(e|е)(c|с)тв(o|о)",
                "(premium|премиум|максимальн(ым|ое)|топ|🔥|(наи)?лучш(ее|ем)|отличн(ое|ого|ым)|высок(ое|ого|им)|хорош(ее|его|им)|заводск(ого|ое|им)|оригиналь(ное|ного|ным)) качеств(о|а|ом|е)",
                "качеств(о|а|ом|е) (premium|премиум|максимальн(ым|ое)|топ|🔥|(наи)?лучш(ее|ем)|отличн(ое|ого|ым)|высок(ое|ого|им)|хорош(ее|его|им)|заводск(ого|ое|им)|оригиналь(ное|ного|ным))"
        ];

        let originalMarkers = [
                "оригинал[^а-я]",
                "состояни(е|и)"
        ];

        let alarmMarkers = [
                "premium",
                "премиум",
                "[a-z][а-я]|[а-я][a-z]",
                "качеств(о|а) материал(а|ов)",
                "качественны(й|е)",
                "оригинальн(ая|ые|ой)|(фирменн(ая|ых|ой)) (коробк(е|а|и)|бирк(е|а|и))",
                "оригинальные"
        ];


        //собираем наши регулярки для анализа текста объявления
        let regFake = new RegExp(fakeMarkers.join("|"), "gi");
        let regOrigin = new RegExp(originalMarkers.join("|"), "gi");
        let regAlarm = new RegExp(alarmMarkers.join("|"), "gi");
        let fakeStatus = null;

        if (regOrigin.test(description)) {fakeStatus=0; console.log(fakeStatus);}
        if (regAlarm.test(description)) {fakeStatus=1; console.log(fakeStatus);}
        if (regFake.test(description)) {fakeStatus=2; console.log(fakeStatus);}

        //добавляем на страницу нашу иконку оригинальности
        let banner = document.createElement('div');
        banner.style.display = "flex";
        banner.style.alignItems = "center";
        banner.style.marginLeft = "auto";



        switch (fakeStatus) {
                case 0:
                        banner.innerHTML = '<b>Оригинал</b>&nbsp✅';
                        break;
                case 1:
                        banner.innerHTML = '<b>Проверить</b>&nbsp⚠️';
                        break;
                case 2:
                        banner.innerHTML = '<b>Подделка</b>&nbsp❌';
                        break;
                default:
                        console.log( "Анализ ничего не дал" );
        }


        infBlock.append(banner);

}
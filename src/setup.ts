import $ from "cheerio";
import fs from "fs";

//watch-history.htmlがあるか確認する
if (!fs.existsSync("../watch-history.html")) {
    console.error("watch-history.htmlが見つかりませんでした。");
    process.exit(1);
}

// ./watch-history.htmlから読み込む
const html = fs.readFileSync("./watch-history.html", "utf-8");

// htmlをパースする
// .mdl-grid内の要素を取得する
const $grid = $(".mdl-typography--body-1", html);

let urls = $grid.map((i, el) => {
    //直下のテキストのみ取得する
    const text = $(el).contents().filter((i, el) => {
        return el.type === "text";
    }).last().text();

    if (!text) {
        return {
            url: undefined,
            date: undefined
        }
    }

    // 2023/09/15 16:32:54 JST この形式をDateに変換する 
    const date = parseJSTDateString(text);

    return {
        url: $(el).find("a").attr("href"),
        date: date.getTime()
    }
}).get();

//urlsから空の物を削除する
urls = urls.filter((url) => {
    return url.url !== undefined;
});

// urls ./urls.csvに書き込む
fs.writeFileSync("../urls.csv", urls.map((url) => {
    return `${url.url},${url.date}`;
}).join("\n"));

function parseJSTDateString(dateString: string) {
    // "2023/09/15 16:32:54 JST" の形式を解析する

    // 日付と時刻を分割
    const [datePart, timePart] = dateString.split(' ');

    // 日付の部分を年、月、日に分割
    const [year, month, day] = datePart.split('/').map(Number);

    // 時刻の部分を時、分、秒に分割
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    // Date オブジェクトを生成 (注意: JavaScriptの月は0から始まるので、1を引く必要がある)
    const date = new Date(Date.UTC(year, month - 1, day, hours - 9, minutes, seconds));  // JSTはUTCより9時間進んでいるので、9時間引く

    return date;
}
import fs from "fs";

// ../urls.csvがあるか確認する
if (!fs.existsSync("./urls.csv")) {
    console.error("urls.csvが見つかりませんでした。");
    process.exit(1);
}

// 引数を取得する
// 第一引数は年、第二引数は月
const [year, month] = process.argv.slice(2).map(Number);

// 引数が不正な場合は終了する
if (isNaN(year) || isNaN(month)) {
    console.error("引数が不正です。");
    process.exit(1);
}

// ../urls.csvから読み込む
const csv = fs.readFileSync("./urls.csv", "utf-8");

// csvをパースする
const urls = csv.split("\n").map((line) => {
    const [url, date] = line.split(",");
    return {
        url,
        date: new Date(Number(date))
    }
});

// urlsから指定された年月のものを抽出する
const filteredUrls = urls.filter((url) => {
    return url.date.getFullYear() === year && url.date.getMonth() + 1 === month;
});

// 重複数をカウントし、objectにする
const counts = filteredUrls.reduce((counts, url) => {
    if (counts[url.url] === undefined) {
        counts[url.url] = 0;
    }
    counts[url.url]++;
    return counts;
}, {} as { [url: string]: number });

// objectを配列に変換する
const sortedUrls = Object.keys(counts).map((url) => {
    return {
        url,
        count: counts[url]
    }
}).sort((a, b) => {
    // 再生回数の降順でソートする
    return b.count - a.count;
});

// top10を取得する
const top10 = sortedUrls.slice(0, 10);

console.log(`${year}年${month}月の再生回数ランキング`)

// top10を出力する
top10.forEach((url, index) => {
    console.log((index + 1) + "位 " + url.url + "  " + url.count + "回");
});
const program = require("commander");
// fsモジュールをfsオブジェクトとしてインポートする
const fs = require("fs");
const md2html = require("./md2html");

program.option("--gfm", "GFMを有効にする");
// コマンドライン引数からファイルパスを取得する
program.parse(process.argv);
const filePath = program.args[0];

//　コマンドライン引数のオプションを取得する
const options = program.opts();

//コマンドライン引数で指定されなかったオプションにデフォルト値を上書きする
const cliOptions = {
    gfm: options.gfm ?? false,
};

// ファイルを非同期で読み込む
fs.readFile(filePath, { encoding: "utf-8" },(err, file) => {
    if (err) {
        console.error(err.message);
        //終了ステータス 1（一般的なエラー）としてプロセスを終了する
        process.exit(1);
        return;
    }
    const html = md2html(file, cliOptions);
    console.log(html);
});

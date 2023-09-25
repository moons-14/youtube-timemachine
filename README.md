# youtube-timemachine

## 初めに

1. [Google](https://takeout.google.com/settings/takeout?pli=1) から YouTube の履歴をダウンロードしてください。

2. ダウンロードしたデータを解答し`watch-history.html`を見つけてください。

3. `watch-history.html`を本プロジェクトのルートディレクトリに配置してください。

4. `yarn`を実行後、`yarn setup`を実行してください。

この動作を完了するとルートディレクトリに`urls.csv`が生成されます。
その後以下のコマンドを実行することで指定のデータを取得できます。

### コマンド

#### `yarn setup`

初期設定のためのコマンドです。`watch-history.html`を解析し、`urls.csv`を生成します。
`watch-history.html`を変更した場合は再度実行してください。

### `yarn mpt <year> <month>`

指定した年月のデータを取得します。
例: `yarn mpt 2019 1` で 2019 年 1 月のデータを取得します。

# リタリコ2dayハッカソン
## チーム：りこりこ
## サービス名：getwill
### 概要
自分の住んでいる街をみんなで良くしていくためのサービス

街が変われば、地域が変わる。

地域が変われば、国が変わる。

国が変われば、世界が変わる。

### サービス付加価値
* 意志の重要度を可視化
* 行政と個人のプラットフォームを統一（2chと行政の合体）

### 言語
* サーバー側
  - Ruby
* フロント側
  - HTML
  - CSS
  - JavaScript

### 開発環境
* Mac or Linux:
  - 2.0.0-p481
* windows:
  - 2.0.0-p594

#### DB関係
##### User tableに関しての注意事項
* sex
  - 1が男性
  - 2が女性
* disability
  - trueが障害有り
  - falseが障害無し
* admin
  - trueがadminユーザー
  - falseが一般ユーザー
* valiable
  - trueが表示
  - falseが非表示（退会ユーザー）
* 緯度経度
  - x_locateは経度
  - y_locateは緯度

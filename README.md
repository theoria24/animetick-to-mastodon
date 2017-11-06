# Animetick to Mastodon
## なにこれ
[Animetick](http://animetick.net/)で管理している視聴したアニメをMastodonに投稿するのが少し楽になります。

## 使い方
前提: Tampermonkeyなど

1. [ここからインストール](https://github.com/theoria24/animetick-to-mastodon/raw/master/animetick-to-mastodon.user.js)
1. Tampermonkeyなどのダッシュボードから```animetick-to-mastodon.user.js```を開き、インスタンス名を編集（デフォルトではmstdn.jpになっているのでjpの方は編集不要）。
1. [Animetick](http://animetick.net/)で視聴したアニメのWatchボタンを押す。
1. （おそらく）Mastodonの投稿画面が立ち上がる。

## 現時点で判明している問題
- 後から読み込まれるチケットにMastodonボタンが表示されない
- ツイッター連携では追加されるハッシュタグが、トップページでWatchすると追加されない（どこから取ってくればよいか不明）

（たすけて）

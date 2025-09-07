<div align="center">
  <a href="https://github.com/dante-is-shipping/devtools.git">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>
  <h2 align="center">DevTools</h2>
  <a href="README.md">
    English
  </a>
  |
  <a href="README.zh-CN.md">
    简体中文
  </a>
  <br>
  <br>
</div>

DevToolsは、サイト管理と自動インクルージョン機能を内蔵し、ユーザーが迅速にウェブサイトディレクトリを作成および管理できるように支援します。国際化、SEO、複数の画像ストレージソリューションを提供し、ユーザーが自分のナビゲーションサイトを迅速にデプロイおよび立ち上げることができます。

> **プロジェクト説明**: このプロジェクトは [aigotools](https://github.com/someu/aigotools) をベースとした二次開発です。

こちらを訪問してください: <a href="https://tools.shipnowkit.com/cn">tools.shipnowkit.com</a>


## 目次

- [目次](#目次)
- [特徴](#特徴)
- [デプロイメント](#デプロイメント)
  - [前提条件](#前提条件)
  - [ローカルデプロイメント](#ローカルデプロイメント)
  - [ホスティングサービスデプロイメント](#ホスティングサービスデプロイメント)
- [開発](#開発)
- [Figmaリソース](#figmaリソース)
- [メンテナー](#メンテナー)
- [貢献方法](#貢献方法)
- [お問い合わせ](#お問い合わせ)
- [🌟 スター履歴](#-スター履歴)
- [ライセンス](#ライセンス)

## 特徴

- **サイト管理**
- **自動サイト情報収集（playwright、jina、openaiを使用）**
- **ユーザー管理（next-authを使用）**
- **国際化**
- **ダーク/ライトテーマの切り替え**
- **SEO最適化**
- **複数の画像ストレージソリューション（ローカルのminio、AWS S3、Tencent Cloud COS）**

## デプロイメント

このプロジェクトは、メインのナビゲーションサイト（`packages/devtools`）とインクルージョンサービス（`packages/crawler`）の2つの部分で構成されており、Zeaburなどのホスティングサービスを介してデプロイするか、`docker-compose`を使用してローカルマシンに直接デプロイできます。

### 前提条件

- 管理バックエンドへの管理者アクセスのためにnext-auth認証プロバイダーを設定します。
- `OpenAI apiKey`と`jina apiKey`を取得します。これらはサイトのインクルージョンに使用されます。
- MongoDBとRedisデータベースをセットアップします。

### ローカルデプロイメント

1. リポジトリをクローンします：

   ```bash
   git clone https://github.com/dante-is-shipping/devtools.git
   cd devtools
   ```

2. 環境変数を設定します：
   `packages/devtools`と`packages/crawler`の`.env`ファイルを`.env.prod`にコピーします。

   ```bash
   cp packages/devtools/.env packages/devtools/.env.prod
   cp packages/crawler/.env packages/crawler/.env.prod
   ```

   設定ファイルを変更します。

3. プロジェクトを開始します：

   ```bash
   docker-compose up -d
   ```

**注：画像ストレージにminioを使用する場合、プロジェクトを開始する際に最初はminioの認証設定を空のままにしておくことができます。プロジェクトを実行した後、minio管理バックエンドにアクセスしてBucket、ACCESS_KEY、SECRET_KEYを作成し、Bucketに公開読み取り権限を有効にし、設定ファイルを更新してプロジェクトを再起動します。**

### ホスティングサービスデプロイメント

[![Zeaburでデプロイ](https://zeabur.com/button.svg)](https://zeabur.com/templates/9PSGFO?referralCode=dante-is-shipping)

ドキュメントを参照してください：[zeabur-deploy.md](./docs/zeabur-deploy.md)

Zeaburデモリンク：https://devtools.zeabur.app/

## 開発

1. リポジトリをクローンします：

   ```bash
   git clone https://github.com/dante-is-shipping/devtools.git
   cd devtools
   ```

2. 依存関係をインストールします：

   ```bash
   pnpm i
   ```

3. 環境変数を設定します：
   `packages/devtools`と`packages/crawler`の`.env`ファイルを`.env.local`にコピーし、設定ファイルを変更します。

   ```bash
   cp packages/devtools/.env packages/devtools/.env.local
   cp packages/crawler/.env packages/crawler/.env.local
   ```

4. プロジェクトを開始します：
   `packages/devtools`と`packages/crawler`にそれぞれ移動します。

   ```bash
   pnpm run dev
   ```


## メンテナー

[@dante-is-shipping](https://github.com/dante-is-shipping)。

## 貢献方法

あなたの参加を心から歓迎します！[Issueを提出する](https://github.com/dante-is-shipping/devtools/issues/new)か、Pull Requestを送信してください。

## お問い合わせ

ご質問や提案がある場合は、以下の方法でお問い合わせください：

- GitHub Issues: [問題を提出する](https://github.com/dante-is-shipping/devtools/issues)
- 電子メール: dantelin.dev@gmail.com

## 🌟 スター履歴

[![スター履歴チャート](https://api.star-history.com/svg?repos=dante-is-shipping/devtools&type=Timeline)](https://star-history.com/#dante-is-shipping/devtools&Timeline)


## ライセンス

DevToolsはApache License 2.0の下でライセンスされています。詳細については、[LICENSE](./LICENSE)ファイルを参照してください。

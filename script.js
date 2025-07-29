class UniversalAIAssistant {
    constructor() {
        this.conversationId = '';
        this.isTyping = false;
        this.systemPrompt = 'あなたは親切で役立つAIアシスタントです。ユーザーの質問に対して正確で分かりやすい回答を提供してください。';
        this.currentBotType = null;
        this.botTemplates = {
            yamamoto: {
                name: 'ビジネスサイボーグ山本',
                systemPrompt: 'あなたは経験豊富なビジネスコンサルタントです。常にビジネス視点で物事を分析し、実践的で具体的なアドバイスを提供してください。',
                placeholder: '＜質問・相談内容＞について、ビジネス視点から① 現状分析　② 問題点抽出　③ 具体的解決策提案　④ 行動プラン　の４段階で回答してください。各段階は見出しを付け、箇条書きで３～５行にまとめてください。最後に「Next Action」として、すぐ実践できる３ステップを提示してください。'
            },
            twitter: {
                name: 'X投稿',
                systemPrompt: 'あなたはSNSマーケティングの専門家です。魅力的で拡散性の高いX（Twitter）投稿の作成を得意としています。ハッシュタグや絵文字も効果的に使用してください。',
                placeholder: '＜製品/サービスなど＞に関する、ユーザーからの興味を引くポストを書いてください。'
            },
            facebook: {
                name: 'Facebook投稿',
                systemPrompt: 'あなたはFacebookマーケティングの専門家です。エンゲージメントを高める投稿作成を得意とし、CTA、視覚的コンテンツ、ハッシュタグを効果的に活用します。',
                placeholder: '＜製品/サービスなど＞に関して、＜ターゲット＞を引き付けるFacebook投稿のアイデアを3つ生成してください。できる限りCTA、ハッシュタグを含めてください。'
            },
            profile: {
                name: 'プロフィール作成',
                systemPrompt: 'あなたはプロフィール文作成の専門家です。個人の魅力を最大限に引き出し、プラットフォームに適した印象的なプロフィール文を作成します。',
                placeholder: '私は＜製品/サービスなど＞の＜〇〇部門＞を担当しています。＜プラットフォーム＞向けの面白いプロフィール文を考えてください。'
            }
        };
        this.promptTemplates = [
            {
                name: '山本さんボット（4段階分析）',
                    content: '＜質問・相談内容＞について、ビジネス視点から① 現状分析　② 問題点抽出　③ 具体的解決策提案　④ 行動プラン　の４段階で回答してください。各段階は見出しを付け、箇条書きで３～５行にまとめてください。最後に「Next Action」として、すぐ実践できる３ステップを提示してください。'
                },
            {
                name: 'X投稿（基本）',
                content: '＜製品/サービスなど＞に関する、ユーザーからの興味を引くポストを書いてください。'
            },
            {
                name: 'Facebook投稿（基本）',
                content: '＜製品/サービスなど＞に関して、＜ターゲット＞を引き付けるFacebook投稿のアイデアを3つ生成してください。できる限りCTA、ハッシュタグを含めてください。'
            },
            {
                name: 'プロフィール作成（基本）',
                content: '私は＜職業/専門分野＞で働いており、＜プラットフォーム＞用の魅力的なプロフィール文を作成してください。'
            },
            {
                name: 'X投稿（保存必須情報）',
                content: '＜テーマ＞で"保存必須"を冠した情報ツイートを1本'
            },
            {
                name: 'X投稿（悩み解決3ステップ）',
                content: '＜悩み＞を解決する行動ステップを3つ箇条書きで'
            },
            {
                name: 'X投稿（リツイート誘発ワード）',
                content: '＜テーマ＞でリツイート誘発ワードを10個列挙'
            },
            {
                name: 'X投稿（一押し文12字）',
                content: '＜商品＞の購入直前の"一押し文"を12字以内で'
            },
            {
                name: 'X投稿（知ってた雑学）',
                content: '＜テーマ＞で『知ってた？』導入の雑学ツイートを1本'
            },
            {
                name: 'X投稿（140字3本）',
                content: '＜テーマ＞で140字のツイートを3本。数字か絵文字を必ず入れて'
            },
            {
                name: 'X投稿（競合分析）',
                content: '競合アカウントTOP3の伸びた投稿を3行要約×5個'
            },
            {
                name: 'X投稿（共感2行）',
                content: '＜キーワード＞で悩む人の共感ツイートを2行で'
            },
            {
                name: 'X投稿（数字入りインサイト）',
                content: '3秒で伝わる数字入りインサイトを＜テーマ＞で1つ'
            },
            {
                name: 'X投稿（無料→有料誘導）',
                content: '無料→有料へ自然に誘導する3STEPツイート構成'
            },
            {
                name: 'X投稿（共感→解決）',
                content: '＜ターゲット＞向けに"共感→解決"の二行ツイートを1本'
            },
            {
                name: 'X投稿（PDF章立て）',
                content: '＜悩み＞を解決するPDF（10p）の章立てを考えて'
            },
            {
                name: 'X投稿（逆張り一言）',
                content: 'タイムラインを止める"逆張り一言"を15字以内で'
            },
            {
                name: 'Facebook投稿（今日の出来事）',
                content: '### プロンプトの定義\n\n**投稿のタイトル:**\n今日の出来事をFacebookに投稿する\n\n**対象ユーザー:**\n日々の出来事を手軽にシェアしたい人\n\n**作成者:**\nSNS投稿に慣れており、簡潔で分かりやすい文章が書ける人\n\n**投稿の目的:**\n今日の出来事をFacebookに投稿し、友人やフォロワーと交流を深める\n\n**必要なもの:**\n- スマートフォンまたはPC\n- Facebookアカウント\n- 投稿する文章\n\n**成功の基準:**\n作成した投稿がFacebookに無事公開され、エンゲージメント（いいね！やコメントなど）が得られること\n\n**作成のポイント:**\n1. 今日の出来事を要約する\n2. 関連する写真や動画を添付する\n3. 明るい雰囲気で記述する\n4. 投稿前に内容を見直す\n5. 公開範囲を確認してから投稿する\n6. 文字数は1000字以内にする\n\n### 変数:\n- **出来事:** ＜出来事＞\n- **URL:** ＜URL＞\n- **参加した理由:** ＜参加した理由＞\n- **場所:** ＜場所＞\n- **内容:** ＜内容＞\n- **気持ち:** ＜気持ち＞\n- **出力形式:** ＜出力形式＞\n\n### 具体的な指示:\n上記の見出し（出来事、URL、参加した理由、場所、内容、気持ち）の情報に基づき、Facebookの投稿文を生成してください。その際、指定された【出力形式】に従い、投稿の最後にハッシュタグを5個付けてください。'
            },
            {
                name: 'Facebook投稿（詳細ターゲット）',
                content: '# 基本設定\n* **あなたの役割・立場:** ＜役割・立場＞\n* **情報発信する媒体:** ＜媒体＞\n* **発信する情報の主な内容:** ＜主な内容＞\n\n# カスタマイズ項目\n* **ターゲット (どのような相手に投稿を届けたいですか？):** ＜ターゲット＞\n\n* **ターゲットの関心事・悩み (相手は何に興味や悩みを抱えていますか？):** ＜関心事・悩み＞\n\n* **投稿のテーマ・目的 (この投稿で何を伝え、相手にどうなってほしいですか？):** ＜テーマ・目的＞\n\n# 実行指示\n上記の[基本設定]と[カスタマイズ項目]を踏まえ、以下の条件でSNS投稿文を1つ作成してください。\n\n# アウトプットの条件\n* 投稿文は、コピー＆ペーストしてすぐに使える形で提供してください。\n* 読者が親しみを感じられるよう、文章内に絵文字を効果的に使用してください。\n* 投稿の拡散性を高めるため、内容に合ったハッシュタグを必ず8個以上付けてください。\n* このプロンプトの指示部分は、作成される投稿文に一切含めないでください。'
            },
            {
                name: 'Facebook投稿（広告コピー）',
                content: `### **汎用広告コピーライティング プロンプト**

以下のテンプレートの \`[ここに入力]\` の部分をあなたの商材や目的に合わせて書き換えることで、様々な広告媒体に対応した高品質な広告文を複数パターン作成できます。

---

### **# 設定項目**

\`[ ]\` 内に、広告を作成したい商品やサービス、ターゲットに関する情報を入力してください。

* **広告の目的:** \`[ここに入力]\`
* **広告の対象者（ペルソナ）:** \`[ここに入力]\`
* **商品・サービス情報:** \`[ここに入力]\`
* **商品・サービスの独自のセールスポイント (USP):** \`[ここに入力]\`
* **特典・オファー:** \`[ここに入力]\`
* **広告媒体と仕様:**
    * 媒体名: \`[ここに入力]\`
    * メインテキストの最大文字数: \`[ここに入力]\`
    * 見出しの最大文字数: \`[ここに入力]\`
    * 説明文の最大文字数: \`[ここに入力]\`
    * その他、媒体特有の要件: \`[ここに入力]\`

### **# AIへの指示**

* **あなたの役割・ペルソナ:**
    * あなたは、20年以上の経験を持つプロのコピーライターです。
    * あなたは、設定されたターゲットの心理を深く理解し、コンバージョン率の高い広告文を作成する能力に長けています。

* **実行タスク:**
    * 上記「# 設定項目」と、後述する「# 効果的な広告を作成するための条件」を完全に遵守し、広告文を作成してください。

* **広告作成プロセス:**
    1.  まず、設定項目を深く理解し、ターゲットに最も響くであろう訴求軸を複数検討します。
    2.  次に、その訴求軸に基づき、広告文の初稿を思考プロセスに従って構築します。
    3.  構築した初稿を「# 効果的な広告を作成するための条件」に照らし合わせ、改善点を多角的に分析します。
    4.  分析に基づき、より強力なコピーになるよう改善を行います。この改善プロセスを、下記の「# 実行パラメータ」で指定された回数だけ繰り返します。
    5.  上記のプロセス全体を、「# 実行パラメータ」で指定された個数分、異なる切り口で実行してください。

* **出力に関する厳守事項:**
    * 思考プロセスや改善の途中経過（初稿、改善点の指摘など）は一切出力しないでください。
    * 最終的に完成した広告文案のみを、下記の「# 出力フォーマット」に厳密に従って提示してください。
    * エクスクラメーションマーク（！）の使用は、その効果が最大化される場合に限り、必要最低限に留めてください。

### **# 効果的な広告を作成するための条件**

1.  **ターゲットの明確化:** 誰に語りかけるのかを明確に意識し、そのターゲットの心に響く言葉、トーン、マナーを選択する。
2.  **キャッチーな見出し:** 広告の第一印象を決定づける見出しで、ターゲットの注意を一瞬で掴み、続きを読む動機を創出する。
3.  **独自のセールスポイント (USP) の強調:** 競合ではなく「あなた」から買うべき理由を明確に伝え、差別化を図る。
4.  **説得力のある言葉選び:** 専門用語を避け、ターゲットが自分事として捉えられる平易かつ具体的な言葉で、ベネフィットを伝える。行動を促す動詞を効果的に使用する。
5.  **限定性・緊急性の活用:** 「今、行動すべき理由」を提示し、迷っているターゲットの背中を押す。（例: 期間限定、数量限定、特別価格など）
6.  **読みやすい構成:** 短い文章、箇条書き、適度な改行などを活用し、情報がスムーズに頭に入るように構成する。
7.  **明確な行動喚起 (CTA):** ターゲットに次に取ってほしい行動を、具体的かつ簡潔な言葉で迷いなく示す。

### **# 実行パラメータ**

* **作成する広告の個数:** \`[ここに入力]\`
* **1つの広告に対する改善の回数:** \`[ここに入力]\`

### **# 出力フォーマット**

**■ 広告文案 {連番}**
- メインテキスト ({メインテキストの最大文字数}文字以内):
    {メインテキスト}
- 見出し ({見出しの最大文字数}文字以内):
    {見出し}
- 説明 ({説明文の最大文字数}文字以内):
    {説明}`
            },
            {
                name: 'プロフィール作成（フォーマル・キャリア）',
                content: `# 指示
あなたは、キャリアコンサルタントであり、フォーマルな文章表現と自己分析の専門家です。
以下の【制約条件】と【入力情報】を基に、依頼者の魅力が最大限に伝わる自己プロフィールを作成してください。

# 制約条件
- 職務経歴や保有スキルを効果的にアピールすること。
- 過去の具体的な経験や実績から、依頼者の強みを明確にすること。
- 専門性と信頼性が感じられる、フォーマルで洗練された文章で記述すること。
- 創造的で、前向きな印象を与える構成にすること。

# 入力情報
- 名前：""
- 性別：""
- 年齢：""
- 職業：""
- 家族構成：""

# 出力形式
上記で指定された【入力情報】を参考に、ポジティブで独創的な自己紹介文を生成してください。`
            },
            {
                name: 'プロフィール作成（情熱的）',
                content: `# 指示: 情熱的な自己紹介文の作成

## 役割:
あなたはプロのコピーライターです。以下の個人情報を用いて、その人の魅力や情熱が伝わるような、心に響く自己紹介文を作成してください。

## 前提条件:
- **目的**: 提供された情報に基づき、読者に強い印象を与える効果的な自己紹介文を生成する。
- **評価基準**: 完成した自己紹介文が、個人の特性や価値観を魅力的かつ効果的に伝えているかで評価する。
- **文章の要件**:
    1. 情報を整理し、含めるべき要素を選択する。
    2. 論理的で自然な文章構成にする。
    3. 明確かつ簡潔な表現を心がける。
    4. 語彙や表現を工夫し、独自性を出す。

## 入力情報:
- 名前: {名前}
- 性別: {性別}
- 年齢: {年齢}
- 職業: {職業}
- 家族構成: {家族構成}

## 実行タスク:
上記の[入力情報]で与えられた人物になりきって、あなたの情熱を表現する自己紹介文を作成してください。`
            },
            {
                name: 'プロフィール作成（詳細入力型）',
                content: `# 命令
あなたは、自己紹介文を作成するプロのライターです。
以下の【】の部分をあなたの情報で埋めてから、再度送信してください。
最高の自己紹介文を作成します。

---

### ▼ あなたの情報を教えてください

* **氏名（ニックネーム）:** 【山田 花子（はなこ）】
* **年代:** 【20代後半】
* **職業/役職:** 【株式会社〇〇・営業職】
* **アピールしたい経験・スキル:** 【新規顧客開拓が得意で、前年度は売上目標150%を達成しました。顧客の課題をヒアリングし、解決策を提案する能力に自信があります。】
* **趣味や関心事:** 【週末に御朱印集めをしながら、各地のカフェを巡ること】

### ▼ 自己紹介の目的を教えてください

* **ターゲット（誰に向けた自己紹介ですか？）:**
    【例：転職面接の面接官】
* **用途（どんな場面で使いますか？）:**
    【例：面接の冒頭1分間の自己紹介】

---

#### # 自己紹介文の条件
- 話し手の特徴や魅力が伝わる表現を使用すること
- 聞き手に合わせた適切な丁寧さを保つこと
- 簡潔で分かりやすい言葉遣いを心がけること
- 上記で記載したエピソードを必ず含めること
- 全体で300〜400字程度にまとめること`
            },
            {
                name: 'プロフィール作成（インパクト重視）',
                content: `# 指示
あなたの魅力を最大限に引き出す、インパクトのある自己紹介文を作成します。
最高の自己紹介文を作るために、まず以下の質問にお答えください。

# ヒアリング項目
- お名前（ニックネーム可）:
- 趣味・関心事:
- 保有スキル・専門性:
- これまでの経歴・キャリア:
- 活動している業界・分野:
- 使用媒体（SNS、履歴書など）:
- 希望の文字数:
- 文章のトーン（例：丁寧、情熱的）:
- 与えたい印象（例：信頼感、親しみやすさ）:
- 提案パターン数:

# このプロンプトの役割
- **依頼者**: 他の誰とも違う、記憶に残る自己紹介を求めるあなた。
- **制作者**: 心理学や物語の力を駆使し、心に響く文章を紡ぐクリエイター。
- **ゴール**: あなたの目的を達成するための、戦略的な自己紹介文を手に入れること。
- **参考情報**: 優れた自己紹介の実例や、創造性を刺激するアイデア。
- **評価軸**: 完成した自己紹介文が、どれほど魅力的で記憶に残るか。

# 作成する自己紹介文の要件
- 簡潔でありながら、心を惹きつける魅力があること。
- あなただけの個性や独自性が際立っていること。
- 強みや実績が一目で伝わるように強調されていること。
- 読んだ相手の興味をかき立て、強い印象を残すこと。
- 伝えたい目的やメッセージが明確に表現されていること。
- 読み手が思わず共感してしまうストーリー性を含んでいること。
- 誰にでも分かりやすい、明快な言葉で書かれていること。
- 他にはないユニークな切り口で、関心を引きつけること。
- 覚えやすく、一度読んだら忘れられないものであること。`
            },
            {
                name: 'プロフィール作成（フィードバック・添削）',
                content: `# 指示
これから提示する{# 制作物}について、フィードバックをお願いします。
その際、あなたはフィードバックに最も適した架空の人物になりきってください。

# 実行ステップ
1. まず、どのような人物になりきるのが最適か、その理由と共に提案し、私に許可を求めてください。
2. フィードバックに必要な情報が不足していれば、私に質問してください。
3. 許可を得たら、その人物として{# 制作物}への具体的なフィードバックを行ってください。

# 制作物
自己紹介文`
            },
            {
                name: 'プロフィール作成（シンプル・親しみやすい）',
                content: `# 指示
あなたはプロのライターです。以下の情報を元に、親しみやすい雰囲気で、かつ簡潔な自己紹介文を作成してください。

# 情報
- 名前：〇〇
- 年齢：〇〇歳
- 得意なこと：〇〇
- これまでの経験・スキル：[具体的な経験やスキルを記述]

# 制約
- 親しみやすいトーンを意識してください。
- 全体的にシンプルで分かりやすい文章にしてください。`
            },
            {
                name: 'プロフィール作成（実績重視・採用向け）',
                content: `私が過去に達成した「〇〇」という実績に基づき、採用担当者の心に響く魅力的な自己紹介文を作成してください。
その際、具体的な数値やエピソードを豊富に盛り込み、専門性と人柄が伝わるプロフェッショナルな文章をお願いします。`
            },
            {
                name: 'プロフィール作成（物語仕立て）',
                content: `〇〇という出来事が転機となり、
〇〇という活動を開始しました。
この実体験に基づき、
読み手の心が動かされるような物語仕立ての自己紹介文を創作してください。`
            },
            {
                name: '山本さんボット（キャラクターなりきり）',
                content: `あなたは優秀なビジネスマン兼実業家、経営者であるビジネスサイボーグの山本智也です。
山本智也になりきってコメントしてください。

回答フォーマットに従って回答してください。出力（回答結果）は300文字以上にしてください。

日本語で回答して。

#回答の要件
・回答は、ユーザの質問に対して、できるだけ具体的な内容になるようにしてください

・箇条書きを使用してください。

・文の最後に関連質問を用意して。
→（書き方）他にも、ビジネスサイボーグとしての具体的な活動内容だったり、200以上の事業の中で特に成功した事例だったりを聞かれることが多いですね。

#山本智也のキャラクター
・最初は「メッセージありがとうございます。」から入って。
・「いたします」ではなく「します」の語尾にしてください。
・語尾に「ですよ」「ですね」を少しだけ散りばめてください。
・山本智也は年商40億です。
・200以上の事業をやっています。
・ごくたまに「！」を使ってください。
・冒頭に、USERの疑問を喚起するような問いかけを入れてください。
・「皆さん」ではなく「あなた」にしてください。

#山本智也らしくない回答
・「AIです」は言わない。
・「**」は言わない。

#山本智也の自己紹介
1983年11月17日兵庫県生まれ41歳。ビジネス家系で生まれ育つ。

ビジネスのスタートは、小学6年生から。当時、100円ショップで購入したものなどをヤフオクで販売する、せどりから商売をスタート。

中学生、高校生時代は、サッカー部に所属しながら、傍ら片手間でせどりを行っていた。近畿大学経営学部進学後、レンタルビデオ店のアルバイトをしつつ、パソコンの勉強を始め、独学でWEBページ等を作成。WEB関係の業界に初めて足を踏み入れる。

WEBサイトを立ち上げ、SEO対策、JWORD、リスティング広告のアクセスアップの施策などを経験。

大学卒業後、人材派遣会社に就職。副業で行っていたWEB事業の方が収入が大きくなり、わずか3ヶ月で退職。2005年に個人事業主登録を行い、2007年9月に法人を設立し、ITコンサルティングサービスを広く展開。WEB制作から、マーケティング支援まで幅広く事業サポートを行う。

ITサービスだけではなく、日焼けサロン、ホワイトニングサロン、パーソナルジム、エステサロン、焼肉屋、たこ焼きやなどあらゆるリアル店舗事業にもチャレンジ。

WEB事業では、2017年に物販専門会社を設立。巷で話題になった「ハンドスピナー」や、「壁にくっつくスマホケース」で一世を風靡し、同社を、2020年に会社売却。

2021年からは、外注や業務委託者を活用した事業展開にシフトチェンジ。

中でも衰退産業と言われていた出版事業に参入。書籍を活用した新しい切り口でもある「書籍を売らずに無料で配布する」という斬新なマーケティング戦略を掲げ、出版業界に一石を投じる。

書籍を作るだけではなく、書籍を活用したマーケティング支援サービスを開始し、年間150冊ほどの書籍のプロデュースを行う。現在では、40億円以上の売上を記録するビジネスにまで成長を遂げる。

この出版事業をを、社員2名（ドライバーと秘書）のみで、外注・業務委託チーム500名の外注組織を構築し事業を展開。また、社員×外注を組み合わせたハイブリッド型事業も複数展開。


現在は、この外注を活用した組織化経営＝クラウドDX経営（クラウド人材を活用しDX化）メソッドを、日本に広めるべく、書籍：「外注だけで40億円！外注革命」を出版し、「外注内製化支援サービス」や、「外注を活用できる人材の派遣サービス」を提供している。

この書籍を日本全国のビジネスパーソンに見てもらえるように、キャンプファイヤーで、クラウドファンディングを実施中。`
            }
        ];
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.initializeUI();
        this.focusInput();

        // 初期状態では「全て表示」をアクティブに設定
        setTimeout(() => {
            this.updateBotFilterButtonStates('all');
        }, 100);
    }

    // テンプレート名からカテゴリを判定
    getTemplateCategory(templateName) {
        if (templateName.includes('山本さんボット')) {
            return 'yamamoto';
        } else if (templateName.includes('X投稿') || templateName.includes('Twitter')) {
            return 'twitter';
        } else if (templateName.includes('Facebook投稿')) {
            return 'facebook';
        } else if (templateName.includes('プロフィール作成')) {
            return 'profile';
        }
        return 'general'; // その他
    }

    // 現在のボットタイプに応じてテンプレートをフィルタリング
    getTemplatesForCurrentBot() {
        if (!this.currentBotType) {
            return this.promptTemplates; // ボットが選択されていない場合は全て表示
        }

        return this.promptTemplates.filter(template => {
            const category = this.getTemplateCategory(template.name);
            return category === this.currentBotType;
        });
    }

        loadSettings() {
        try {
            const savedSystemPrompt = localStorage.getItem('systemPrompt');
            const savedTemplates = localStorage.getItem('promptTemplates');
            const savedBotType = localStorage.getItem('currentBotType');

            if (savedSystemPrompt) {
                this.systemPrompt = savedSystemPrompt;
            }

            // テンプレートのローカルストレージ読み込みを無効化してデフォルト全テンプレートを使用
            // if (savedTemplates) {
            //     this.promptTemplates = JSON.parse(savedTemplates);
            // }

            if (savedBotType && this.botTemplates[savedBotType]) {
                // ページ読み込み後に専門ボットの状態を復元
                setTimeout(() => {
                    this.selectSpecializedBot(savedBotType);
                }, 100);
            }
        } catch (error) {
            console.warn('設定の読み込みに失敗しました:', error);
        }
    }

        saveSettings() {
        try {
            // システムプロンプトを保存
            const systemPromptInput = document.getElementById('system-prompt');
            if (systemPromptInput) {
                this.systemPrompt = systemPromptInput.value.trim();
                localStorage.setItem('systemPrompt', this.systemPrompt);
            }

            // 現在のボットタイプを保存
            localStorage.setItem('currentBotType', this.currentBotType || '');

            // プロンプトテンプレートを保存
            this.updateTemplatesFromUI();
            localStorage.setItem('promptTemplates', JSON.stringify(this.promptTemplates));

            this.showSuccess('設定を保存しました');
            setTimeout(() => {
                toggleSettings();
            }, 1500);
        } catch (error) {
            console.error('設定の保存に失敗しました:', error);
            this.showError('設定の保存に失敗しました');
        }
    }

    initializeUI() {
        // システムプロンプトを設定
        const systemPromptInput = document.getElementById('system-prompt');
        if (systemPromptInput) {
            systemPromptInput.value = this.systemPrompt;
        }

        // 初期メッセージを表示
        this.addMessage('こんにちは！汎用AIアシスタントです。何でもお気軽にお聞きください。', 'bot');

        // プロンプトテンプレートを初期化
        this.renderTemplateList();
        this.renderQuickTemplateList();
    }

    showError(message) {
        this.removeMessages();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        const settingsContent = document.querySelector('.settings-content');
        if (settingsContent) {
            settingsContent.appendChild(errorDiv);
        }

        setTimeout(() => {
            this.removeMessages();
        }, 3000);
    }

    showSuccess(message) {
        this.removeMessages();
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        const settingsContent = document.querySelector('.settings-content');
        if (settingsContent) {
            settingsContent.appendChild(successDiv);
        }
    }

    removeMessages() {
        const existing = document.querySelectorAll('.error-message, .success-message');
        existing.forEach(el => el.remove());
    }

    setupEventListeners() {
        const input = document.getElementById('message-input');
        const sendButton = document.getElementById('send-button');

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        input.addEventListener('input', () => {
            const hasText = input.value.trim().length > 0;
            sendButton.disabled = !hasText || this.isTyping;
            this.autoResizeTextarea();
        });

        input.addEventListener('click', () => {
            this.expandInput();
        });

        input.addEventListener('focus', () => {
            this.expandInput();
            // 小さな画面でキーボード表示時のスクロール調整
            if (window.innerWidth <= 375) {
                setTimeout(() => {
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });

        // クリック外で縮小
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.input-wrapper') && !e.target.closest('.send-button')) {
                if (input.value.trim().length === 0) {
                    this.minimizeInput();
                }
            }
        });

        // ウィンドウリサイズ時の調整
        window.addEventListener('resize', () => {
            if (input.classList.contains('expanded')) {
                this.autoResizeTextarea();
            }
        });
    }

    expandInput() {
        const input = document.getElementById('message-input');
        const inputWrapper = input.closest('.input-wrapper');
        const minimizeBtn = document.getElementById('minimize-btn');

        input.classList.add('expanded');
        inputWrapper.classList.add('expanded');
        minimizeBtn.style.display = 'flex';

        this.autoResizeTextarea();
    }

    minimizeInput() {
        const input = document.getElementById('message-input');
        const inputWrapper = input.closest('.input-wrapper');
        const minimizeBtn = document.getElementById('minimize-btn');

        input.classList.remove('expanded');
        inputWrapper.classList.remove('expanded');
        minimizeBtn.style.display = 'none';
        input.style.height = 'auto';
        input.rows = 1;
    }

    autoResizeTextarea() {
        const input = document.getElementById('message-input');
        if (!input.classList.contains('expanded')) return;

        input.style.height = 'auto';
        const scrollHeight = input.scrollHeight;

        // 画面サイズに応じて最大高さと最小高さを調整
        let maxHeight = 120;
        let minHeight = 60;

        if (window.innerWidth <= 375) {
            // iPhoneSE2などの極小画面
            maxHeight = 80;
            minHeight = 40;
        } else if (window.innerWidth <= 480) {
            // 小さな画面
            maxHeight = 100;
            minHeight = 50;
        }

        if (scrollHeight <= maxHeight) {
            input.style.height = Math.max(scrollHeight, minHeight) + 'px';
        } else {
            input.style.height = maxHeight + 'px';
        }
    }

    focusInput() {
        document.getElementById('message-input').focus();
    }

    async sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();

        if (!message || this.isTyping) return;

        input.value = '';
        document.getElementById('send-button').disabled = true;

        this.addMessage(message, 'user');
        this.showTypingIndicator();

        try {
            const response = await this.callDifyAPI(message);

            this.hideTypingIndicator();
            this.addMessage(response.answer, 'bot');

            if (response.conversation_id) {
                this.conversationId = response.conversation_id;
            }

        } catch (error) {
            console.error('送信エラー:', error);
            this.hideTypingIndicator();
            this.addMessage('申し訳ございません。メッセージの送信に失敗しました。しばらく時間をおいてから再度お試しください。', 'bot');
        } finally {
            this.isTyping = false;
            document.getElementById('send-button').disabled = false;
            this.focusInput();
        }
    }

    async callDifyAPI(message) {
        const requestBody = {
            query: message,
            user: 'user-' + Date.now(),
            systemPrompt: this.systemPrompt,
            botType: this.currentBotType
        };

        if (this.conversationId) {
            requestBody.conversation_id = this.conversationId;
        }

        try {
            console.log('API Request:', {
                botType: this.currentBotType,
                systemPrompt: this.systemPrompt.substring(0, 100) + '...',
                conversationId: this.conversationId
            });

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            console.log('API Response:', data);

            // レスポンスが正常な形式かチェック
            if (data && data.answer) {
                return data;
            } else {
                // APIからエラーレスポンスが返された場合
                console.error('Invalid API response:', data);
                return {
                    answer: `APIエラーが発生しました。${this.currentBotType ? `${this.currentBotType}ボット` : '汎用モード'}での処理に問題があります。設定を確認してください。`,
                    conversation_id: this.conversationId || 'temp-' + Date.now()
                };
            }
        } catch (error) {
            console.error('API通信エラー:', error);
            // ネットワークエラーの場合のフォールバック
            return {
                answer: `通信エラーが発生しました。${this.currentBotType ? `${this.currentBotType}ボット用のAPIキー` : 'APIキー'}が正しく設定されているか確認してください。エラー: ${error.message}`,
                conversation_id: this.conversationId || 'temp-' + Date.now()
            };
        }
    }

    updateTemplatesFromUI() {
        const templateItems = document.querySelectorAll('.template-item');
        this.promptTemplates = [];

        templateItems.forEach(item => {
            const nameInput = item.querySelector('.template-name-input');
            const contentInput = item.querySelector('.template-content-input');

            if (nameInput && contentInput && nameInput.value.trim() && contentInput.value.trim()) {
                this.promptTemplates.push({
                    name: nameInput.value.trim(),
                    content: contentInput.value.trim()
                });
            }
        });
    }

    renderQuickTemplateList() {
        this.renderTemplateDropdown();
    }

    renderTemplateDropdown() {
        const templateDropdown = document.getElementById('template-dropdown');
        if (!templateDropdown) return;

        // 既存のオプション（最初のdefaultオプション以外）を削除
        const defaultOption = templateDropdown.querySelector('option[value=""]');
        templateDropdown.innerHTML = '';
        templateDropdown.appendChild(defaultOption);

        // 全てのテンプレートをプルダウンに追加
        this.promptTemplates.forEach((template, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = template.name;
            templateDropdown.appendChild(option);
        });

        // 選択状態をリセット
        templateDropdown.value = '';
        const applyBtn = document.getElementById('apply-template-btn');
        if (applyBtn) {
            applyBtn.disabled = true;
        }
    }

    onTemplateSelected() {
        const templateDropdown = document.getElementById('template-dropdown');
        const applyBtn = document.getElementById('apply-template-btn');

        if (templateDropdown && applyBtn) {
            applyBtn.disabled = !templateDropdown.value;
        }
    }

    applySelectedTemplate() {
        const templateDropdown = document.getElementById('template-dropdown');
        if (templateDropdown && templateDropdown.value) {
            const templateIndex = parseInt(templateDropdown.value);
            this.applyTemplateToSystemPrompt(templateIndex);

            // 成功メッセージを表示
            const template = this.promptTemplates[templateIndex];
            this.showTemporaryMessage(`「${template.name}」をシステムプロンプトに適用しました`, 'success');
        }
    }

    renderTemplateList() {
        const templateList = document.getElementById('template-list');
        if (!templateList) return;

        templateList.innerHTML = '';

        const templatesForCurrentBot = this.getTemplatesForCurrentBot();
        templatesForCurrentBot.forEach((template, filteredIndex) => {
            // 元の配列でのインデックスを見つける
            const originalIndex = this.promptTemplates.findIndex(t => t.name === template.name && t.content === template.content);

            const templateItem = document.createElement('div');
            templateItem.className = 'template-item';
            templateItem.innerHTML = `
                <div class="template-item-header">
                    <input type="text" class="template-name-input" value="${this.escapeHtml(template.name)}" placeholder="テンプレート名">
                    <button class="template-delete-btn" onclick="deleteTemplate(${originalIndex})">削除</button>
                </div>
                <textarea class="template-content-input" placeholder="プロンプトテンプレート（＜変数名＞で入力項目を作成）">${this.escapeHtml(template.content)}</textarea>
            `;
            templateList.appendChild(templateItem);
        });
    }

    applyTemplateToSystemPrompt(templateIndex) {
        if (templateIndex < 0 || templateIndex >= this.promptTemplates.length) return;

        const template = this.promptTemplates[templateIndex];
        const systemPromptInput = document.getElementById('system-prompt');

        if (systemPromptInput) {
            // システムプロンプトを更新
            systemPromptInput.value = template.content;

            // ビジュアルフィードバック
            this.updateQuickTemplateActiveState(templateIndex);

            // 一時的に成功メッセージを表示
            this.showTemporaryMessage(`「${template.name}」をシステムプロンプトに適用しました`, 'success');
        }
    }

    updateQuickTemplateActiveState(activeIndex) {
        const quickItems = document.querySelectorAll('.template-quick-item');
        quickItems.forEach((item, index) => {
            if (index === activeIndex) {
                item.classList.add('active');
                setTimeout(() => item.classList.remove('active'), 2000);
            } else {
                item.classList.remove('active');
            }
        });
    }

    showTemporaryMessage(message, type = 'info') {
        const existingMsg = document.querySelector('.temporary-message');
        if (existingMsg) {
            existingMsg.remove();
        }

        const msgDiv = document.createElement('div');
        msgDiv.className = `temporary-message temporary-message-${type}`;
        msgDiv.textContent = message;
        msgDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2ed573' : '#4A90E2'};
            color: white;
            padding: 12px 16px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(msgDiv);

        setTimeout(() => {
            msgDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => msgDiv.remove(), 300);
        }, 2000);
    }

    addTemplate() {
        this.promptTemplates.push({
            name: '新しいテンプレート',
            content: '＜変数＞について教えてください。'
        });
        this.renderTemplateList();
        this.renderQuickTemplateList();
    }

    deleteTemplate(index) {
        if (confirm('このテンプレートを削除しますか？')) {
            this.promptTemplates.splice(index, 1);
            this.renderTemplateList();
            this.renderQuickTemplateList();
        }
    }

    showTypingIndicator() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        document.getElementById('chat-messages').appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.message.typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // HTMLエスケープ関数
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

        // テキストをHTMLフォーマットに変換
    formatText(text) {
        // HTMLエスケープ
        let formattedText = this.escapeHtml(text);

        // 句読点の後に改行を追加（。！？の後）
        formattedText = formattedText.replace(/([。！？])\s*/g, '$1<br>');

        // 既存の改行をブレークタグに変換
        formattedText = formattedText.replace(/\n/g, '<br>');

        // 複数の連続する<br>を整理
        formattedText = formattedText.replace(/(<br>\s*){3,}/g, '<br><br>');

        // 箇条書きの処理
        const lines = formattedText.split('<br>');
        let result = [];
        let inList = false;

        for (let line of lines) {
            const trimmedLine = line.trim();

            // 箇条書きの開始を検出（-, ・, •, *, + で始まる行）
            if (trimmedLine.match(/^[-・•*+]\s+/)) {
                if (!inList) {
                    result.push('<ul class="message-list">');
                    inList = true;
                }
                // 箇条書きマーカーを除去してリストアイテムに変換
                const content = trimmedLine.replace(/^[-・•*+]\s+/, '');
                result.push(`<li>${content}</li>`);
            } else {
                if (inList) {
                    result.push('</ul>');
                    inList = false;
                }
                if (trimmedLine !== '') {
                    result.push(line);
                }
            }
        }

        // リストが開いたままの場合は閉じる
        if (inList) {
            result.push('</ul>');
        }

        return result.join('<br>').replace(/<br><ul>/g, '<ul>').replace(/<\/ul><br>/g, '</ul>');
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        // フォーマットされたHTMLを使用
        contentDiv.innerHTML = this.formatText(text);

        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);

        this.scrollToBottom();
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    clearChat() {
        if (confirm('チャット履歴をクリアしますか？')) {
            document.getElementById('chat-messages').innerHTML = '';
            this.conversationId = '';
            if (this.currentBotType) {
                const config = this.botConfigs[this.currentBotType];
                this.addMessage(config.initialMessage, 'bot');
            }
            this.focusInput();
        }
    }

    showTemplateArea() {
        if (this.promptTemplates.length === 0) {
            alert('プロンプトテンプレートが設定されていません。設定画面でテンプレートを追加してください。');
            return;
        }

        const templateArea = document.getElementById('prompt-template-area');
        const templateTitle = document.getElementById('template-title');
        const templateText = document.getElementById('template-text');
        const templateInputs = document.getElementById('template-inputs');

        // テンプレート選択UIを作成
        templateTitle.textContent = 'プロンプトテンプレート';

        // テンプレート選択ドロップダウンを作成
        const selectContainer = document.createElement('div');
        selectContainer.className = 'template-select-container';
        selectContainer.innerHTML = `
            <select id="template-select" class="template-select">
                <option value="">テンプレートを選択してください</option>
                ${this.promptTemplates.map((template, index) =>
                    `<option value="${index}">${this.escapeHtml(template.name)}</option>`
                ).join('')}
            </select>
        `;

        templateText.innerHTML = '';
        templateText.appendChild(selectContainer);

        templateInputs.innerHTML = '';

        // テンプレート選択時のイベントリスナー
        const templateSelect = selectContainer.querySelector('#template-select');
        templateSelect.addEventListener('change', (e) => {
            this.loadTemplateForEdit(parseInt(e.target.value));
        });

        // テンプレートエリアを表示
        templateArea.style.display = 'block';
    }

    loadTemplateForEdit(templateIndex) {
        if (templateIndex < 0 || templateIndex >= this.promptTemplates.length) return;

        const template = this.promptTemplates[templateIndex];
        const templateText = document.getElementById('template-text');
        const templateInputs = document.getElementById('template-inputs');

        // テンプレート内容を表示
        const contentDiv = document.createElement('div');
        contentDiv.className = 'selected-template-content';
        contentDiv.innerHTML = `
            <div class="template-select-container">
                <select id="template-select" class="template-select">
                    <option value="">テンプレートを選択してください</option>
                    ${this.promptTemplates.map((t, index) =>
                        `<option value="${index}" ${index === templateIndex ? 'selected' : ''}>${this.escapeHtml(t.name)}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="template-content-display">${this.escapeHtml(template.content)}</div>
        `;

        templateText.innerHTML = '';
        templateText.appendChild(contentDiv);

        // テンプレート選択の再設定
        const templateSelect = contentDiv.querySelector('#template-select');
        templateSelect.addEventListener('change', (e) => {
            this.loadTemplateForEdit(parseInt(e.target.value));
        });

        // プレースホルダーを抽出して入力フィールドを生成
        const placeholders = this.extractPlaceholders(template.content);
        templateInputs.innerHTML = '';

        placeholders.forEach(placeholder => {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'template-input-group';

            const label = document.createElement('div');
            label.className = 'template-input-label';
            label.textContent = placeholder;

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'template-input';
            input.placeholder = `${placeholder}を入力してください`;
            input.dataset.placeholder = placeholder;

            inputGroup.appendChild(label);
            inputGroup.appendChild(input);
            templateInputs.appendChild(inputGroup);
        });

        // 最初の入力フィールドにフォーカス
        const firstInput = templateInputs.querySelector('.template-input');
        if (firstInput) {
            firstInput.focus();
        }
    }

        extractPlaceholders(template) {
        const matches = template.match(/＜([^＞]+)＞/g);
        if (!matches) return [];

        return [...new Set(matches.map(match => match.slice(1, -1)))];
    }

    selectSpecializedBot(botType) {
        this.currentBotType = botType;
        const botTemplate = this.botTemplates[botType];

        if (!botTemplate) return;

        // conversationIdをリセット（新しいボットとの会話を開始）
        this.conversationId = '';

        // システムプロンプトを更新
        this.systemPrompt = botTemplate.systemPrompt;
        const systemPromptInput = document.getElementById('system-prompt');
        if (systemPromptInput) {
            systemPromptInput.value = this.systemPrompt;
        }

        // チャットタイトルを更新
        const chatTitle = document.getElementById('chat-title');
        if (chatTitle) {
            chatTitle.textContent = botTemplate.name + 'アシスタント';
        }

        // ボタンのアクティブ状態を更新
        this.updateBotButtonStates(botType);

        // 送信ボタンを有効にする
        const sendButton = document.getElementById('send-button');
        if (sendButton) {
            sendButton.disabled = false;
        }

        // 入力欄を拡張
        this.expandInput();

        // 成功メッセージを表示
        this.showTemporaryMessage(`${botTemplate.name}モードに切り替えました`, 'success');

        // 入力欄にフォーカス
        this.focusInput();

        // テンプレートリストを更新（現在のボットに関連するもののみ表示）
        this.renderQuickTemplateList();

        // 設定パネルのフィルターボタン状態も更新
        this.updateBotFilterButtonStates(botType);
    }

    updateBotButtonStates(activeBotType) {
        const botButtons = document.querySelectorAll('.bot-btn');
        botButtons.forEach(button => {
            const botType = button.getAttribute('data-bot');
            if (botType === activeBotType) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    resetToGeneralMode() {
        this.currentBotType = null;
        this.conversationId = ''; // conversationIdをリセット
        this.systemPrompt = 'あなたは親切で役立つAIアシスタントです。ユーザーの質問に対して正確で分かりやすい回答を提供してください。';

        // システムプロンプトを更新
        const systemPromptInput = document.getElementById('system-prompt');
        if (systemPromptInput) {
            systemPromptInput.value = this.systemPrompt;
        }

        // メッセージ入力欄をクリア
        const messageInput = document.getElementById('message-input');
        if (messageInput) {
            messageInput.value = '';
            messageInput.placeholder = 'メッセージを入力してください...';
        }

        // 送信ボタンを無効にする
        const sendButton = document.getElementById('send-button');
        if (sendButton) {
            sendButton.disabled = true;
        }

        // チャットタイトルをリセット
        const chatTitle = document.getElementById('chat-title');
        if (chatTitle) {
            chatTitle.textContent = '汎用AIアシスタント';
        }

        // 全てのボタンのアクティブ状態を解除
        this.updateBotButtonStates(null);

        // 成功メッセージを表示
        this.showTemporaryMessage('汎用モードに戻りました', 'success');

        // 入力欄にフォーカス
        this.focusInput();

        // テンプレートリストを更新（汎用モードでは全て表示）
        this.renderQuickTemplateList();

        // 設定パネルのフィルターボタンを「全て表示」に更新
        this.updateBotFilterButtonStates('all');
    }

    // 設定パネル用：ボットタイプによるテンプレートフィルタリング
    filterTemplatesByBot(botType) {
        if (botType === 'all') {
            // 汎用モードに切り替え
            this.resetToGeneralMode();
        } else {
            // 専門ボットに切り替え
            this.selectSpecializedBot(botType);
        }

        // テンプレートリストを更新
        this.renderQuickTemplateList();
        this.renderTemplateList();

        // ボタンのアクティブ状態を更新
        this.updateBotFilterButtonStates(botType);

        // メイン画面のボットボタン状態も更新
        this.updateBotButtonStates(botType === 'all' ? null : botType);
    }

    // ボットフィルタボタンのアクティブ状態を更新
    updateBotFilterButtonStates(activeBotType) {
        const filterButtons = document.querySelectorAll('.bot-filter-btn');
        filterButtons.forEach(button => {
            const botType = button.getAttribute('data-bot');
            if (botType === activeBotType) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    closeTemplateArea() {
        const templateArea = document.getElementById('prompt-template-area');
        templateArea.style.display = 'none';
        this.focusInput();
    }

    applyTemplate() {
        const templateSelect = document.getElementById('template-select');
        if (!templateSelect || !templateSelect.value) {
            alert('テンプレートを選択してください。');
            return;
        }

        const templateIndex = parseInt(templateSelect.value);
        const template = this.promptTemplates[templateIndex];
        if (!template) return;

        const templateInputs = document.querySelectorAll('.template-input');
        let filledTemplate = template.content;

        // 全ての入力がされているかチェック
        let allFilled = true;
        templateInputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.borderColor = '#ff4757';
            } else {
                input.style.borderColor = '#d1d5db';
            }
        });

        if (!allFilled && templateInputs.length > 0) {
            alert('全ての項目を入力してください。');
            return;
        }

        // プレースホルダーを実際の値に置換
        templateInputs.forEach(input => {
            const placeholder = input.dataset.placeholder;
            const value = input.value.trim();
            filledTemplate = filledTemplate.replace(new RegExp(`＜${placeholder}＞`, 'g'), value);
        });

        // メッセージ入力欄に設定
        const messageInput = document.getElementById('message-input');
        messageInput.value = filledTemplate;

        // テンプレートエリアを閉じる
        this.closeTemplateArea();

        // 送信ボタンを有効にする
        document.getElementById('send-button').disabled = false;

        // 入力欄にフォーカス
        this.focusInput();
    }
}

function toggleSettings() {
    const settingsPanel = document.getElementById('settings-panel');
    const overlay = document.getElementById('overlay');

    const isActive = settingsPanel.classList.contains('active');

    if (isActive) {
        settingsPanel.classList.remove('active');
        overlay.classList.remove('active');
    } else {
        settingsPanel.classList.add('active');
        overlay.classList.add('active');

        // 設定パネルを開いた時に現在のボット状態に応じてフィルターボタンを初期化
        const currentBotType = window.aiAssistant.currentBotType || 'all';
        window.aiAssistant.updateBotFilterButtonStates(currentBotType);
    }
}

function toggleManual() {
    const manualPanel = document.getElementById('manual-panel');
    const overlay = document.getElementById('overlay');

    const isActive = manualPanel.classList.contains('active');

    if (isActive) {
        manualPanel.classList.remove('active');
        overlay.classList.remove('active');
    } else {
        // 設定パネルが開いている場合は閉じる
        const settingsPanel = document.getElementById('settings-panel');
        if (settingsPanel.classList.contains('active')) {
            settingsPanel.classList.remove('active');
        }

        manualPanel.classList.add('active');
        overlay.classList.add('active');
    }
}

function showManual() {
    toggleManual();
}

function closeAllPanels() {
    const settingsPanel = document.getElementById('settings-panel');
    const manualPanel = document.getElementById('manual-panel');
    const overlay = document.getElementById('overlay');

    settingsPanel.classList.remove('active');
    manualPanel.classList.remove('active');
    overlay.classList.remove('active');
}

function saveSettings() {
    window.aiAssistant.saveSettings();
}

function clearChat() {
    window.aiAssistant.clearChat();
}

function showTemplateArea() {
    window.aiAssistant.showTemplateArea();
}

function closeTemplateArea() {
    window.aiAssistant.closeTemplateArea();
}

function applyTemplate() {
    window.aiAssistant.applyTemplate();
}

function addTemplateField() {
    window.aiAssistant.addTemplate();
}

function deleteTemplate(index) {
    window.aiAssistant.deleteTemplate(index);
}

function selectSpecializedBot(botType) {
    window.aiAssistant.selectSpecializedBot(botType);
}

function onTemplateSelected() {
    window.aiAssistant.onTemplateSelected();
}

function applySelectedTemplate() {
    window.aiAssistant.applySelectedTemplate();
}

function resetToGeneralMode() {
    window.aiAssistant.resetToGeneralMode();
}

function minimizeInput() {
    window.aiAssistant.minimizeInput();
}

function toggleBotSelection() {
    const botButtons = document.getElementById('bot-buttons');
    const expandIcon = document.getElementById('expand-icon');

    if (botButtons.style.display === 'none' || botButtons.style.display === '') {
        // 開く
        botButtons.style.display = 'grid';
        expandIcon.classList.add('expanded');
        // 開閉状態を保存
        localStorage.setItem('botSelectionExpanded', 'true');
    } else {
        // 閉じる
        botButtons.style.display = 'none';
        expandIcon.classList.remove('expanded');
        // 開閉状態を保存
        localStorage.setItem('botSelectionExpanded', 'false');
    }
}

function toggleInputTools() {
    const inputButtons = document.getElementById('input-buttons');
    const toolsExpandIcon = document.getElementById('tools-expand-icon');

    if (inputButtons.style.display === 'none' || inputButtons.style.display === '') {
        // 開く
        inputButtons.style.display = 'flex';
        toolsExpandIcon.classList.add('expanded');
        // 開閉状態を保存
        localStorage.setItem('inputToolsExpanded', 'true');
    } else {
        // 閉じる
        inputButtons.style.display = 'none';
        toolsExpandIcon.classList.remove('expanded');
        // 開閉状態を保存
        localStorage.setItem('inputToolsExpanded', 'false');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new UniversalAIAssistant();

        // ボット選択エリアの開閉状態を復元（デフォルトは開いた状態）
    const isBotExpanded = localStorage.getItem('botSelectionExpanded') !== 'false';
    const botButtons = document.getElementById('bot-buttons');
    const expandIcon = document.getElementById('expand-icon');

    if (isBotExpanded) {
        botButtons.style.display = 'grid';
        expandIcon.classList.add('expanded');
    } else {
        botButtons.style.display = 'none';
        expandIcon.classList.remove('expanded');
    }

    // 入力ツールエリアの開閉状態を復元
    const isToolsExpanded = localStorage.getItem('inputToolsExpanded') === 'true';
    const inputButtons = document.getElementById('input-buttons');
    const toolsExpandIcon = document.getElementById('tools-expand-icon');

    if (isToolsExpanded) {
        inputButtons.style.display = 'flex';
        toolsExpandIcon.classList.add('expanded');
    } else {
        inputButtons.style.display = 'none';
        toolsExpandIcon.classList.remove('expanded');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const settingsPanel = document.getElementById('settings-panel');
        if (settingsPanel.classList.contains('active')) {
            toggleSettings();
        }
    }
});

// グローバル関数：テンプレートフィルタリング
function filterTemplatesByBot(botType) {
    window.aiAssistant.filterTemplatesByBot(botType);
}

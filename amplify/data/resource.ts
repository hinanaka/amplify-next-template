import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
以下のセクションでは、「コンテンツ」フィールドを持つ Todo データベース テーブルを作成します。試す
新しい「isDone」フィールドをboolean値として追加します。以下の認可ルール
API キーを介して認証されたすべてのユーザーが「作成」、「読み取り」、
「Todo」レコードを「更新」および「削除」します。
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      category: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
フロントエンドのソースコードに移動します。クライアント側のコードから、
テーブルに対して CRUDL リクエストを行うデータ クライアント。 (このスニペットは、
フロントエンド コード ファイルで作業します。)

JavaScript または Next.js の使用 React サーバー コンポーネント、ミドルウェア、サーバー 
アクションまたはページルーター?これらの用途に使用するデータ クライアントを生成する方法を確認します。
ケース:
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>

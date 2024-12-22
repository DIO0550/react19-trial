# react19-trial

## useActionState

### 定義

```ts
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

### 使用方法

- `useReducer`の非同期対応したものではない。
- `button`押下で、`useActionState`の `formAction`を実行するには、以下のようにする必要がある。
  - `button`を`from`タグで囲む
  - `form`タグの`action`に`useActionState`の`formAction`を設定する
  - `button`の`type`を`submit`にする。
- `form`の`action`実行後に、入力などがリセットされる

```tsx
const Component = () => {
  const [state, formAction, isPending] = useActionState(register, initialState);

  return (
    <form action={formActuin}>
      <button disabled={isPending} type="submit">
        ボタン
      </button>
    </form>
  );
};
```

- `button`の`onClick`に`formAction`を設定することができるが、設定した場合に、`formAction`実行中に、`isPending`が`true`にならない。
- また、`button`の`onClick`に設定した場合は、以下のようなエラーが表示される。

```
An async function was passed to useActionState, but it was dispatched outside of an action context. This is likely not what you intended. Either pass the dispatch function to an `action` prop, or dispatch manually inside `startTransition`
```

### 参考

- [公式](https://ja.react.dev/reference/react/useActionState)
- https://zenn.dev/jun0723/articles/7c7a4a2823785a

## useFormStatus

### 定義

- 直近の親のフォームに関するステータス情報を提供する

```ts
const { pending, data, method, action } = useFormStatus();
```

#### `pending`

- 親の`<form>`の`formAction`が実行中かどうかを表す値。
  - 実行していない場合は、`false`

#### `data`

- `FormData`インターフェースを実装したオブジェクト。
- 親の`<form>`が`action`実行時の、データを含んでいる（`action`の引数の`data`など）。
- `action`を実行中でない場合、または親に`<form>`がないと、`null`になる。

#### `method`

- `get` or `post`のいずれかの文字列。
- 親の`<form>`が`GET`と`POST`メソッドどちらを利用しているかどうかを表す。

#### `action`

- 親の`<form>`の`action`に渡された関数への参照。
- 子要素側で、`action`を実行できる
- 以下の場合、`null`になる。
  - 親に`<form>`がない
  - 親の`<form>`の`action`にプロパティに URI 値が渡される
  - 親の`<form>`の`action`に何も指定されていない

### 使用例

- `useFormStatus`は、`<form>`タグの中で使用する必要がある
  - 兄弟関係`<form>`があっても意味がない

```tsx
const Component = () => {
  const { pending } = useFormStatus();

  return (
    <div>
      <input type="text" name="name">
      <button type="submit" disabled={pending}>送信</button>
    </div>
  )
};

const Form = () => (
  <div>
    <form>
      <Component /> // OK
    </form>
    <Component /> // NG pendignが常にfalseになる
  </div>
);

```

### 参考

- [公式](https://ja.react.dev/reference/react-dom/hooks/useFormStatus)

## useOptimistic

### 定義

- `useOptimistic`は、何らかの非同期アクションが進行中の間だけ、異なる state を表示するためにしようする hooks
- 引数で受け取った state をコピーして返す。
  - ただし、非同期実行中のみ、別の値を返すことができる

```ts
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

### 引数

#### `state`

- 初期状態 or アクションが実行中でない場合に使用する値

#### `updateFn(currentState, optimisticValue): state`

- 現在の`state`と`addOptimisticValue`を呼び出された際に渡された値を使用して、アクション実行中に使用する`state`を返す関数
- 純粋関数である必要がある
- 返却値は、`currentState`に`optimisticValue`の値を反映させたもの

### 返り値

#### `optimisticState`

- アクション実行中以外 => `state`
- アクション実行中 => `updateFn`の返り値

#### `addOptimistic`

- 楽観的な更新を行う際に呼び出すディスパッチ関数
- 任意の型の引数を１つ（`updateFn`の`optimisticValue`と同じ型）
  - 実行すると、`state`とこの関数に渡した値を使用して、`updateFn`が呼び出される。

### 使い方

- 基本的に`state`に渡す値を別途`useState`で管理することが多いと思われる。
  - アクション実行中以外は、`state`の値をコピーしてるだけのため。
  - `state`に定数の初期値を渡してしまうと、アクション実行中以外は、その初期値が`optimisticState`になってしまう。

```tsx
const deliverMessage = async (message) => {
  await new Promise((r) => setTimeout(r, 1000));
  return message;
};

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageText, setMessageText] = useState<string>("");

  // アクション実行中以外は、messageTextと optimisticMessage.textは同じ値
  const [optimisticMessage, addOptimisticMessageo] = useOptimistic(
    { isPending: false, text: message },
    // ２つ目の引数は、stateと同じ型にする必要はない
    (state, text: string) => ({
      ...state,
      text,
      isPending: true,
    })
  );

  const formAction = async (inputValue: string) => {
    addOptimisticMessageo(`Loading：${inputValue}`);
    const message = await deliverMessage(inputValue);
    setMessageText(message);
  };

  return (
    <div>
      <div>{optimisticMessage.isPending ? "Loading..." : ""}</div>
      <div>{optimisticMessage.text}</div>
      <form
        action={() => {
          formAction(inputRef.current?.value || "");
        }}
      >
        <input ref={inputRef} type="input" />

        <button type="submit">送信</button>
      </form>
    </div>
  );
};
```

### 参考

- [公式](https://ja.react.dev/reference/react/useOptimistic)

## use

- プロミスやコンテキストを読み取る際に使用する

### Context を受け取る

- context を受けとり、その値を返す
- 動作自体は、`useContext`とほぼ同じ。
  - ただし、`use`は`if文`のブロック内で使える

### 使い方

```tsx
import { createContext, use, useContext } from "react";

const ThemeContext = createContext(null);

const Provider = ({ children }: Props) => {
  return <ThemeContext value="dark">{children}</ThemeContext>;
};

const Component = ({ isShow }: { isShow: boolean }) => {
  const themeByUseContext = useContext(ThemeContext);

  if (isShow) {
    // themeByUseContextと同じ値
    const themeByUse = use(ThemeContext);

    return (
      <div>
        {/** この値は使われない */}
        <ThemeContext value="light">
          <div>{themeByUseContext}</div>
          <div>{themeByUse}</div>
        </ThemeContext>
      </div>
    );
  }

  return null;
};

const App = () => {
  return (
    <Provider>
      <Component />
    </Provider>
  );
};
```

### Promise を受け取る

- Promise が解決した際の値を受け取ることができる。
- Promise が解決するまでは、親の`Suspense`の`fallback`を表示する。
- `use`は`Promise`が解決した時点で、`use`を使用したコンポーネントを再度レンダリングする

  - そのため、`use`を使うコンポーネント内で、`Promise`を生成するとい以下のような状況になり、無限に再レンダリングが発生する
    - 1. `Promise`生成
    - 2. `use`で`Promise`の解決を待つ
    - 3. `use`の`Promise`が解決されて、再度レンダリングされる
    - 4. `Promise`が再生成されて、`use`が再度`Promise`の解決を待つ（`3`で解決された`Promise`と別のものになっているため）

- Promise が拒否された場合は、以下のどちらかの方法を使う
  - エラーバウンダリを使う
    - 使い方参照
  - Promise.cache で代替値を提供する
    ```ts
    const userList = new Promise((resolve, reject) => {
      reject();
    }).catch(() => {
      return [];
    });
    ```

### 使い方

```tsx
const UserList = ({
  userListPromise,
}:{
  userListPromise: Promise<UserList>;
}) => {
  // 以下のようにuseを使用する場所で、Promiseを生成すると、無限に再レンダリングが走る
  // const promise = fetchUserList()
  const userList = use(userListPromise);

  return (
    <div>
      {
        userList.map((user) => {
          <div key={user.id}>
            <div>{user.name}</iv>
          </div>
        })
      }
    </div>
  )
};


const App = () => {
  const promise = fetchUserList();

  return (
    <div>
      <ErrorBoundary fallback={<div>Error</div>}> {/** Prmiseが拒否された場合は、こちらが表示される */}
        <Suspense fallback={<div>Loading<div>}> {/** Promise解決までは、Suspenseのfallbackが表示される */}
          <UserList />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
```

### 参考

- [公式](https://react.dev/reference/react/use)

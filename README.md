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

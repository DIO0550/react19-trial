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

import { Suspense, use, useState } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { GroupId, UserListApi, UserListApiResponse } from "../../apis/userList";

const fetchUserList = async (groupId: GroupId) => {
  try {
    const response = await UserListApi.Post({ groupId: groupId });
    if (!response.ok) {
      throw Error("Error fetch User List");
    }

    const userList = (await response.json()) as UserListApiResponse;

    return userList;
  } catch (e) {
    if (e instanceof Error) {
      throw Error(`error:${e.message}`);
    }
    throw Error("Error fetch User List");
  }
};

const fetchUserListNoThrowError = async () => {
  const errorResponse: UserListApiResponse = {
    users: [
      {
        lastName: "エラー",
        firstName: "エラー",
        age: 400,
      },
    ],
  };
  try {
    const response = await UserListApi.Post({ groupId: "Error" as GroupId });
    console.log(response);
    if (!response.ok) {
      return errorResponse;
    }

    const userList = (await response.json()) as UserListApiResponse;

    return userList;
  } catch {
    return errorResponse;
  }
};

const ErrorFallbackRender = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      <div>
        Error:{error.message}
        <div>
          <button onClick={resetErrorBoundary}>再試行</button>
        </div>
      </div>
    </div>
  );
};

const UserListIf = ({
  fetchUserListPromise,
  isStart = false,
  onClickStart,
}: {
  fetchUserListPromise: Promise<UserListApiResponse>;
  isStart: boolean;
  onClickStart: () => void;
}) => {
  // ここで宣言した場合は、無限に再レンダリングされる（Promise解決時に再レンダリングされる）
  // const fetchUserListPromise = fetchUserList(GroupId.ClassA);
  // Promiseを渡すので、Promiseを返す関数を渡さないように注意する
  let userList = undefined;
  if (isStart) {
    userList = use(fetchUserListPromise);
  }

  return (
    <div>
      ユーザーリスト
      {userList?.users.map((user) => (
        <div key={user.lastName} style={{ marginBottom: "10px" }}>
          ユーザー１
          <div>姓：{user.lastName}</div>
          <div>名：{user.firstName}</div>
          <div>歳：{user.age}</div>
        </div>
      ))}
      <div>
        <button onClick={onClickStart}>ユーザーデータ取得</button>
      </div>
    </div>
  );
};

const UserListError = ({
  fetchUserListPromise,
}: {
  fetchUserListPromise: Promise<UserListApiResponse>;
}) => {
  const userList = use(fetchUserListPromise);

  return (
    <div>
      ユーザーリスト（エラー）
      {userList.users.map((user) => (
        <div key={user.lastName} style={{ marginBottom: "10px" }}>
          ユーザー１
          <div>姓：{user.lastName}</div>
          <div>名：{user.firstName}</div>
          <div>歳：{user.age}</div>
        </div>
      ))}
    </div>
  );
};

const UserListNoErrorThrow = ({
  fetchUserListPromise,
}: {
  fetchUserListPromise: Promise<UserListApiResponse>;
}) => {
  const userList = use(fetchUserListPromise);

  return (
    <div>
      ユーザーリスト（エラースローなし）
      {userList.users.map((user) => (
        <div key={user.lastName} style={{ marginBottom: "10px" }}>
          ユーザー１
          <div>姓：{user.lastName}</div>
          <div>名：{user.firstName}</div>
          <div>歳：{user.age}</div>
        </div>
      ))}
    </div>
  );
};

const UsePromise = () => {
  // このコンポーネントが際レンダリングされると、再度子コンポーネントのuseが実行される
  const fetchUserListPromiseA = fetchUserList(GroupId.ClassA);
  const fetchUserListPromiseB = fetchUserList(GroupId.ClassB);
  const fetchUserListNoThrowErrorPromise = fetchUserListNoThrowError();

  const fetchUserListPromiseError = fetchUserList("Error" as GroupId);
  const [isStart, setIsStart] = useState(false);
  const [isRetried, setIsRetried] = useState(false);

  return (
    <div>
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>Loading</div>}>
          <UserListIf
            fetchUserListPromise={fetchUserListPromiseA}
            isStart={isStart}
            onClickStart={() => setIsStart(true)}
          />
        </Suspense>
      </ErrorBoundary>

      <hr />

      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>Loading</div>}>
          <>
            <UserListNoErrorThrow
              fetchUserListPromise={fetchUserListNoThrowErrorPromise}
            />
          </>
        </Suspense>
      </ErrorBoundary>

      <hr />

      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }: FallbackProps) => {
          return (
            <ErrorFallbackRender
              error={error}
              resetErrorBoundary={() => {
                resetErrorBoundary();
                setIsRetried(true);
              }}
            />
          );
        }}
      >
        <Suspense fallback={<div>Loading</div>}>
          <UserListError
            fetchUserListPromise={
              isRetried ? fetchUserListPromiseB : fetchUserListPromiseError
            }
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default UsePromise;

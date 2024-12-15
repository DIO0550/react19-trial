import { useOptimistic, useRef, useState } from "react";
import {
  RegisterUserApi,
  RegisterUserApiResponse,
} from "../../apis/registerUser";

type UserInfo = {
  id: string;
  password: string;
};
type State = {
  userInfo: UserInfo;
  isCallApi: boolean;
};
const initialState: State = {
  userInfo: {
    id: "",
    password: "",
  },
  isCallApi: false,
};

type Props = {
  userInfo: UserInfo;
  regiseterUser: (formData: FormData) => Promise<void>;
};
const Form = ({ userInfo, regiseterUser }: Props) => {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticUserInfo, addOptimisticUserInfo] = useOptimistic(
    { ...initialState, userInfo: userInfo }, // addOptimisticUserInfoを呼び終わった際に、optimisticUserInfoが、この値になる。
    (state, newUserInfo: UserInfo) => ({
      ...state,
      userInfo: newUserInfo,
      isCallApi: true,
    })
  );

  const formAction = async (formData: FormData) => {
    const id = formData.get("id")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    addOptimisticUserInfo({ id, password });
    formRef.current?.reset();
    await regiseterUser(formData);
  };

  return (
    <div>
      <div>
        <h2>Optimistic</h2>
        <div>id: {optimisticUserInfo.userInfo.id}</div>
        <div>password: {optimisticUserInfo.userInfo.password}</div>
        <div>{optimisticUserInfo.isCallApi && "Loading..."}</div>
      </div>

      <div>
        <h2>useState</h2>
        <div>id: {userInfo.id}</div>
        <div>password: {userInfo.password}</div>
      </div>

      <div>
        <h2>form</h2>
        <form action={formAction}>
          <label htmlFor="id">ID：</label>
          <input ref={idRef} type="input" name="id" id="id" />
          <label htmlFor="password">パスワード：</label>
          <input ref={passwordRef} type="input" name="password" id="password" />

          <button type="submit">登録</button>
        </form>
      </div>
    </div>
  );
};

const Form2 = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: "",
    password: "",
  });
  const [optimisticUserInfo, addOptimisticUserInfo] = useOptimistic(
    { ...initialState, userInfo: userInfo }, // addOptimisticUserInfoを呼び終わった際に、optimisticUserInfoが、この値になる。
    (state, newUserInfo: UserInfo) => ({
      ...state,
      userInfo: newUserInfo,
      isCallApi: true,
    })
  );

  const formAction = async (formData: FormData) => {
    const id = formData.get("id")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    addOptimisticUserInfo({ id, password });
    formRef.current?.reset();

    const response = await RegisterUserApi.Post({
      id,
      password,
    });

    const responseParam = (await response.json()) as RegisterUserApiResponse;

    setUserInfo({
      id: responseParam.id,
      password: responseParam.password,
    });
  };

  return (
    <div>
      <div>
        <h2>Optimistic</h2>
        <div>id: {optimisticUserInfo.userInfo.id}</div>
        <div>password: {optimisticUserInfo.userInfo.password}</div>
        <div>{optimisticUserInfo.isCallApi && "Loading..."}</div>
      </div>

      <div>
        <h2>useState</h2>
        <div>id: {userInfo.id}</div>
        <div>password: {userInfo.password}</div>
      </div>

      <div>
        <h2>form</h2>
        <form action={formAction}>
          <label htmlFor="id">ID：</label>
          <input ref={idRef} type="input" name="id" id="id" />
          <label htmlFor="password">パスワード：</label>
          <input ref={passwordRef} type="input" name="password" id="password" />

          <button type="submit">登録</button>
        </form>
      </div>
    </div>
  );
};

const Optimistic = () => {
  // この値をForm側で持つと、実行中はuseOptimisticは、
  // formAction実行中は、保持するが、実行後はuseOptimisticは第一引数に渡した値を使うようになる。
  const [userInfo, setUserInfo] = useState({ id: "", password: "" });
  const registerUser = async (formData: FormData) => {
    const id = formData.get("id")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const response = await RegisterUserApi.Post({
      id,
      password,
    });

    const responseParam = (await response.json()) as RegisterUserApiResponse;

    setUserInfo({
      id: responseParam.id,
      password: responseParam.password,
    });
  };
  return (
    <div>
      <div>
        <h2>useStateの値は親が所持</h2>
        <Form userInfo={userInfo} regiseterUser={registerUser} />
      </div>
      <hr />
      <div>
        <h2>useStateの値は子が所持</h2>
        <Form2 />
      </div>
    </div>
  );
};

export default Optimistic;

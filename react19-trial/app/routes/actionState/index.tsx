import {
  RegisterUserApi,
  RegisterUserApiResponse,
} from "../../apis/registerUser";
import { useActionState, useRef } from "react";

type State = {
  registerId: string;
  registerPassword: string;
  isError: boolean;
};

const initialState: State = {
  registerId: "",
  registerPassword: "",
  isError: false,
};

type Action = {
  type: "register";
  payload: {
    id: string;
    password: string;
  };
};

const register = async (state: State, action: Action): Promise<State> => {
  switch (action.type) {
    case "register": {
      try {
        const response = await RegisterUserApi.Post({
          id: action.payload.id,
          password: action.payload.password,
        });

        const responseJson = (await response.json()) as RegisterUserApiResponse;

        return {
          ...state,
          registerId: responseJson.id,
          registerPassword: responseJson.password,
          isError: false,
        };
      } catch {
        return {
          registerId: "",
          registerPassword: "",
          isError: true,
        };
      }
    }
    default:
      return state;
  }
};

const ActionState = () => {
  const [state, formAction, isPending] = useActionState(register, initialState);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      {<div>{isPending ? "Loading" : "None"}</div>}

      <label htmlFor="id">ID：</label>
      <input ref={idRef} type="input" name="id" id="id" />

      <label htmlFor="password">パスワード：</label>
      <input ref={passwordRef} type="input" name="password" id="password" />

      <button
        onClick={() => {
          formAction({
            type: "register",
            payload: {
              id: idRef.current?.value ?? "",
              password: passwordRef.current?.value ?? "",
            },
          });
        }}
      >
        登録
      </button>

      <div>
        <div>登録したid: {state.registerId}</div>
        <div>登録したパスワード: {state.registerPassword}</div>
        <div>エラー: {state.isError}</div>
      </div>
    </div>
  );
};

export default ActionState;

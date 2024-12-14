export type RegisterUserApiRequest = {
  id: string;
  password: string;
};

export type RegisterUserApiResponse = {
  id: string;
  password: string;
  isError: boolean;
};

export const RegisterUserApi = {
  Path: "/register/user",
  Post: (request: RegisterUserApiRequest) => {
    return fetch(RegisterUserApi.Path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON形式のデータのヘッダー
      },
      body: JSON.stringify(request),
    });
  },
} as const;

export const GroupId = {
  ClassA: "ClassA",
  ClassB: "ClassB",
};

export type GroupId = (typeof GroupId)[keyof typeof GroupId];

export type User = {
  // 姓
  lastName: string;
  // 名
  firstName: string;
  // 年齢
  age: number;
};

export type UserListApiRequest = {
  groupId: GroupId;
};

export type UserListApiResponse = {
  users: User[];
};

export const UserListApi = {
  Path: "/user/list",
  Post: (request: UserListApiRequest) => {
    return fetch(UserListApi.Path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON形式のデータのヘッダー
      },
      body: JSON.stringify(request),
    });
  },
} as const;

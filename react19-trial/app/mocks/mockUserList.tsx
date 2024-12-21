import { http, delay, HttpResponse } from "msw";
import {
  GroupId,
  User,
  UserListApi,
  UserListApiRequest,
} from "../apis/userList";

const UserList: { [key in GroupId]: User[] } = {
  [GroupId.ClassA]: [
    {
      lastName: "田中",
      firstName: "太郎",
      age: 20,
    },
    {
      lastName: "鈴木",
      firstName: "二郎",
      age: 19,
    },
    {
      lastName: "佐藤",
      firstName: "三郎",
      age: 18,
    },
  ],

  [GroupId.ClassB]: [
    {
      lastName: "高橋",
      firstName: "四郎",
      age: 30,
    },
    {
      lastName: "山田",
      firstName: "五郎",
      age: 29,
    },
    {
      lastName: "岡崎",
      firstName: "六郎",
      age: 28,
    },
  ],
};

export const mockUserList = http.post(UserListApi.Path, async ({ request }) => {
  await delay(1500);
  const requestJson = (await request.json()) as UserListApiRequest;

  const userList = UserList[requestJson.groupId];

  if (!userList) {
    return HttpResponse.json(null, { status: 500 });
  }

  return HttpResponse.json(
    {
      users: userList,
    },
    { status: 200 }
  );
});

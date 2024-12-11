import { http, delay, HttpResponse } from "msw";
import { RegisterUserApi, RegisterUserApiRequest } from "../apis/registerUser";

export const mockRegisterUser = http.post(
  RegisterUserApi.Path,
  async ({ request }) => {
    await delay(1000);
    const requestJson = (await request.json()) as RegisterUserApiRequest;
    console.log(requestJson);

    return HttpResponse.json(
      {
        ...requestJson,
        isError: false,
      },
      { status: 200 }
    );
  }
);

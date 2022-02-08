import { CreateUserDto, CreateUserWordDto, UserDto } from "../interfaces/user";

const base = "https://react-rslang-be.herokuapp.com";

export const getWords = async (page: number, group: number) => {
  return getRequest(`${base}/words?page=${page}&group=${group}`);
};

export const getWord = async (wordId: string) => {
  return getRequest(`${base}/words/${wordId}`);
};

export const createUser = async (user: CreateUserDto) => {
  return postRequest(`${base}/users`, user);
};

export const loginUser = async (user: UserDto) => {
  return postRequest(`${base}/signin`, user);
};

export const createUserWord = async ({
  userId,
  wordId,
  word,
  token,
}: CreateUserWordDto) => {
  return postRequest(`${base}/users/${userId}/words/${wordId}`, word, token);
};

const getRequest = async (url: string) => {
  const res = await fetch(url);

  return res.json();
};

const postRequest = async <T>(url: string, body: T, token?: string) => {
  const res = await fetch(url, {
    method: "POST",
    // credentials: token ? "include" : "omit",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw Error(res.status.toString());

  return res.json();
};

export const getImage = async (path: string) => {
  const res = await fetch(`${base}/${path}`);
  const imgBlob = await res.blob();
  const imgObjURL = URL.createObjectURL(imgBlob);
  return imgObjURL;
};

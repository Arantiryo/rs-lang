export interface Word {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface UserDto {
  email: string;
  password: string;
}

export interface CreateUserDto extends UserDto {
  name: string;
}

export interface CreateUserWordDto {
  userId: string;
  wordId: string;
  word: Object;
  token: string;
}

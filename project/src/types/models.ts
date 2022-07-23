export type Film = {
  id: number,
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  backgroundColor: string,
  videoLink: string,
  previewVideoLink: string,
  description: string,
  rating: number,
  scoresCount: number,
  director: string,
  starring: string[],
  runTime: number,
  genre: string,
  released: number,
  isFavorite: boolean,
}

export type CommentGet = {
  id: number,
  user: {
    id: number,
    name: string,
  },
  rating: number,
  comment: string,
  date: string,
}

export type AuthInfo = {
  id: number,
  avatarUrl: string,
  email: string,
  name: string,
  token: string,
}

export type UserCredentials = {
  email: string,
  password: string
}

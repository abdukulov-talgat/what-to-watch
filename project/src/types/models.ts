export type Film = {
  id: number,
  name: string,
  posterImg: string,
  previewImg: string,
  backgroundImg: string,
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

export type GenreFilterItem = {
  name: string,
  isActive: boolean
}

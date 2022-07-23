export enum AppRoute {
  Main = '/',
  Login = '/login',
  Logout = '/logout',
  Film = '/films/:id',
  MyList = '/mylist',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  NotFound = '/notfound'
}

export const ApiRoute = {
  checkToken: () => '/login',
  signIn: () => '/login',
  logOut: () => '/logout',
  Promo: () => '/promo',
  Films: () => '/films',
  FavoriteFilms: () => '/favorite',
  Player: (filmId: string) => `/films/${filmId}`,
};

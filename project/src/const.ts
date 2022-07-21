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

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

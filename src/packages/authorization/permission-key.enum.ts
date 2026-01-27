export const enum PermissionKey {
  // USER MODULE (1xx)
  CreateUser = '101',
  GetUser = '102',
  GetUserList = '103',
  EditUser = '104',
  DeleteUser = '105',
  UpdateProfile = '106',

  // ROLE MODULE (2xx)
  CreateRole = '201',
  GetRole = '202',
  GetRoleList = '203',
  EditRole = '204',
  DeleteRole = '205',
  AssignRole = '206',

  // POST MODULE (3xx)
  CreatePost = '301',
  GetPost = '302',
  GetPostFeed = '303',
  EditPost = '304',
  DeletePost = '305',

  // COMMENT MODULE (4xx)
  AddComment = '401',
  GetComments = '402',
  EditComment = '403',
  DeleteComment = '404',

  // VOTE MODULE (5xx)
  UpvotePost = '501',
  DownvotePost = '502',
  RemoveVote = '503',

  // MEDIA MODULE (6xx)
  UploadMedia = '601',
  DeleteMedia = '602',

  // AUTH / SYSTEM (9xx)
  Login = '901',
  Logout = '902',
  RefreshToken = '903',
}

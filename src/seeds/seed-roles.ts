import { PermissionKey } from 'src/packages/authorization/permission-key.enum';
import { AppDataSource } from '../data-source';
import { Roles } from '../roles/entities/roles.entity';

export async function seedRoles() {
  const now = Math.floor(Date.now() / 1000);

  await AppDataSource.getRepository(Roles)
    .createQueryBuilder()
    .insert()
    .into(Roles)
    .values([
      {
        name: 'admin',
        permissions: [
          PermissionKey.CreateUser,
          PermissionKey.GetUser,
          PermissionKey.GetUserList,
          PermissionKey.EditUser,
          PermissionKey.DeleteUser,
          PermissionKey.UpdateProfile,
          PermissionKey.CreateRole,
          PermissionKey.GetRole,
          PermissionKey.GetRoleList,
          PermissionKey.EditRole,
          PermissionKey.DeleteRole,
          PermissionKey.AssignRole,
          PermissionKey.CreatePost,
          PermissionKey.GetPost,
          PermissionKey.GetPostFeed,
          PermissionKey.EditPost,
          PermissionKey.DeletePost,
          PermissionKey.AddComment,
          PermissionKey.GetComments,
          PermissionKey.EditComment,
          PermissionKey.DeleteComment,
          PermissionKey.UpvotePost,
          PermissionKey.DownvotePost,
          PermissionKey.RemoveVote,
          PermissionKey.UploadMedia,
          PermissionKey.DeleteMedia,
          PermissionKey.Login,
          PermissionKey.Logout,
          PermissionKey.RefreshToken,
        ],
        created_on: now,
        deleted: false,
      },
      {
        name: 'user',
        permissions: [
          PermissionKey.GetUser,
          PermissionKey.UpdateProfile,
          PermissionKey.CreatePost,
          PermissionKey.GetPost,
          PermissionKey.GetPostFeed,
          PermissionKey.AddComment,
          PermissionKey.GetComments,
          PermissionKey.UpvotePost,
          PermissionKey.DownvotePost,
          PermissionKey.RemoveVote,
          PermissionKey.UploadMedia,
          PermissionKey.Login,
          PermissionKey.Logout,
          PermissionKey.RefreshToken,
        ],
        created_on: now,
        deleted: false,
      },
    ])
    .orIgnore();

  console.log('✅ Roles seeded successfully');
}

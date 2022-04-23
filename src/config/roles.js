const Roles = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  USER: 'USER',
  isAdminOrOwner(user) {
    return this.isOwner(user) || this.isAdmin(user)
  },
  isOwner(user) {
    return user.role === this.OWNER
  },
  isAdmin(user) {
    return user.role === this.ADMIN
  },
  isUser(user) {
    return user.role === this.USER
  }
}

export const isSuperUserPath = (path) => ['owner', 'admin'].some(pathname => path && path.startsWith(pathname))

export default Roles

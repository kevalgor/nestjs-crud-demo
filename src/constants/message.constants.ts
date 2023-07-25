export const messageConstants = {
  /*
   * ------ success response messages ------
   */

  // general success message
  SUCCESS: 'Success',

  // user related success messages
  SIGNUP_SUCCESS: 'Signup successful',
  LOGIN_SUCCESS: 'Login successful',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',

  // blog related success messages
  BLOG_CREATED: 'Blog created successfully',
  BLOG_UPDATED: 'Blog updated successfully',
  BLOG_DELETED: 'Blog deleted successfully',

  /*
   * ------ fail response messages ------
   */

  // user related fail messages
  USER_ALREADY_EXIST: 'User already exist',
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_NOT_EXIST: 'User not exist',
  UNAUTHORIZED: 'You are not authorized',

  // blog related fail messages
  BLOG_NOT_EXIST: 'Blog not exist',
};

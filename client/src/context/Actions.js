export const LoginStart = (usercredentials) => ({
  type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
  type: "LOGIN_success",
  payload: user,
});
export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});
export const Logout = () => ({
  type: "LOGOUT",
});
export const UpdateStart = (usercredentials) => ({
  type: "UPDATE_START",
});
export const UpdateSuccess = (user) => ({
  type: "UPDATE_success",
  payload: user,
});
export const UpdateFailure = () => ({
  type: "UPDATE_FAILURE",
});
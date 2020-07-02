const initialState = {
  isAuthenticated: false,
  hello: "Hello world",
  user: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Login Example

This is a React/Redux app with a NodeJs/Express server demonstrating an example implementation of an authorisation flow.

This example is only to show one way to tie together React components, Redux actions and reducers and Redux Thunk requests. I have made use of Material UI components to give a more professional feel for very little styling effort. There is also good coverage with unit tests using Jest and Enzyme, I plan to follow up with example integration tests shortly. 

Note: There is no database with proper accounts here. All the backend NodeJs server does is check for a valid email and that the password is 'password' to determine whether to accept or reject the login request.

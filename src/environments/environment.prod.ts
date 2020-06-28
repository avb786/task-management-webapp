export const environment = {
  production: true,
  taskServiceManagement: {
    getAllList: '/lists/:userId',
    getAllTaskByListId: '/list/:listId/:userId/tasks',
    createList: '/create/list/:userId',
    deleteList: '/list/:listId/:userId',
    createTask: '/list/:listId/tasks',
    updateTask: '/list/:listId/tasks/:taskId',
    deleteATask: '/list/:listId/tasks/:taskId'
  },
  UserManagement: {
    userSignin: '/signin' ,
    userSignOut: '/signout',
    getUserDetail: '/user/:userId',
    userSignUp: '/signup'
  }
};

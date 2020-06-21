// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
    getUserDetail: '/user/:userId'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

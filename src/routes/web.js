import express from "express";
import homeController from '../controller/homeController';

const router = express.Router();

/**
 * 
 *  @param {*} app : express app
 */


const initWebRoutes = (app) => {
    //path, handler
    router.get("/", homeController.handleHelloWord);
    router.get("/user", homeController.handleUserPage);
    // method get tượng trưng cho việc lấy data từ phía server
    router.post("/users/create-user", homeController.handleCreateNewUser);
    // method post tượng trưng cho việc đẩy data lên phía server (create)
    return app.use("/", router);

}

export default initWebRoutes;
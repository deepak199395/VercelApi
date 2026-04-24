const express = require("express");
const authMiddleware = require("../../MiddleWere/authMiddleware")
const apiKeyMiddleware= require("../../MiddleWere/apiKeyMiddleware")
const {DueLoanController, getLoandeuDetailsController, updateLoanController} = require("../Controllers/OldCoro/LoanDueController");
const { CreateExpessController, getExpessController, updateExpenssController, DeleteExpenssController } = require("../Controllers/OldCoro/expenseController");
const { CreateCoroUser, CorouserregiGet, CorouserregiGetById, CorouserregiUpdate, CorouserregiDelete,coroLoginController } = require("../Controllers/OldCoro/CoroUserController");
const { createExpessDiaryController, getExpessDiaryController } = require("../Controllers/OldCoro/ExpessDiaryController");
const { CreateRegiUserController, FoxloginController } = require("../Controllers/FoxWebController/CoroAuthController");
const { ExpenseController, getExpensseController, UpdateExpenssController, DeleteExpensesController } = require("../Controllers/FoxWebController/ExpensesController");
const { DeleteMoodController } = require("../Controllers/RuhiController/AiAwairnesController");
const {CreatNewPinController, getPinController, VerifyPinController}= require("../Controllers/FoxWebController/PinController");
const { CreateCollectionController, getCollectionController } = require("../Controllers/Shregar/CollectionController");
const { CreateCategoriesController, getCategoriesController } = require("../Controllers/Shregar/CategoriesController");
const { regiController, getUserController, getSingleUserController, loginController } = require("../Controllers/RuhiController/JuhiAuthController");
const { registerController, getAllUserController, getSingleUsersController, UpdateUserController, DeleteUserController, UserloginController } = require("../Controllers/Shregar/AuthController");
const { CreateProductController, getProductController } = require("../Controllers/Shregar/CollecProdController");
const { createOrderController, getMyOrdersController, getSingleOrderController, updateOrderStatusController } = require("../Controllers/Shregar/orderController");
const router = express.Router();
const API = "";   


/* -------------------- Shregar API -------------------- */
router.post(`${API}/shrigar/collections/create/api51`,CreateCollectionController)
router.get(`${API}/shrigar/collections/list/api52`, getCollectionController);
router.post(`${API}/shrigar/CreateCategories/get/api53`,CreateCategoriesController)
router.get(`${API}/shrigar/getCategories/list/api54`,getCategoriesController)
router.post(`${API}/shrigar/Collections/products/create/api55`,CreateProductController)
router.get(`${API}/shrigar/Collections/products/list/api56`,getProductController)
router.post(`${API}/shrigar/order/create/api57`,createOrderController)
router.get(`${API}/shrigar/order/list/api58`,getMyOrdersController)
router.get(`${API}/shrigar/order/get/api59/:id`,getSingleOrderController)
router.put(`${API}/shrigar/order/update/api60/:id`,updateOrderStatusController)
/* -------------------- Shregar API AUTH -------------------- */
router.post(`${API}/shringar/User/registerUser/api61`,registerController)
router.get(`${API}/shringar/User/GetAllUsersDetails/api62`,getAllUserController)
router.get(`${API}/shringar/User/SingleUsers/api63/:id`,getSingleUsersController)
router.put(`${API}/shringar/User/UpdateUsers/api64/:id`,authMiddleware,UpdateUserController)
router.delete(`${API}/shringar/User/DeleteUsers/api65/:id`,authMiddleware,DeleteUserController)
router.post(`${API}/shringar/User/login/api66`,UserloginController)

module.exports = router;

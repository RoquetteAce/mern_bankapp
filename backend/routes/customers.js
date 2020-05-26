const express = require("express");
const router = express.Router();

const CustomerController = require("../controllers/customers");

router.get("/", CustomerController.customers_get_all);
router.post("/", CustomerController.customer_create);
router.get("/:customerId", CustomerController.customer_get_by_id);
router.patch("/:customerId/account", CustomerController.update_account_status);
router.patch(
  "/api/:customerId/creditcard",
  CustomerController.update_creditcard
);
//router.get("/creditcard_stats", CustomerController.customers_get_pending_cc);

module.exports = router;

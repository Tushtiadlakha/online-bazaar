import axios from "axios";
import Noty from "noty";
import { initAdmin } from "./admin";
let cartbutton = document.querySelectorAll(".add-to-cart");
let cart_counter = document.querySelector(".cart_counter");
let delete_btn = document.querySelectorAll(".delete-btn");
let add_btn = document.querySelectorAll(".add_btn");
let del_btn = document.querySelectorAll(".del-btn");
function addCart(bazaar_id) {
  axios
    .post("/addcart", bazaar_id)
    .then((res) => {
      new Noty({
        type: "success",
        text: "Item added to cart",
        timeout: 1000,
      }).show();
      cart_counter.innerText = res.data.totalQty;
      document.location.reload();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        text: "can't adding item to cart try later",
        timeout: 1000,
      }).show();
    });
}

add_btn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let bazaar = JSON.parse(btn.value);
    addCart(bazaar);
  });
});

function deleteCart(bazaar_id) {
  axios
    .post("/deletecart", bazaar_id)
    .then((res) => {
      new Noty({
        type: "success",
        text: "Item Deleted from cart",
        timeout: 1000,
      }).show();
      cart_counter.innerText = res.data.totalQty;
      document.location.reload();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        text: "can't delete item from cart try later",
        timeout: 1000,
      }).show();
    });
}

delete_btn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let bazaar = JSON.parse(btn.value);
    deleteCart(bazaar);
  });
});

function delCart(bazaar_id) {
  axios
    .post("/delcart", bazaar_id)
    .then((res) => {
      new Noty({
        type: "success",
        text: "Item Deleted from cart",
        timeout: 1000,
      }).show();
      cart_counter.innerText = res.data.totalQty;
      document.location.reload();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        text: "can't delete item from cart try later",
        timeout: 1000,
      }).show();
    });
}

del_btn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let bazaar = JSON.parse(btn.value);
    delCart(bazaar);
  });
});

function updateCart(bazaar) {
  axios
    .post("/updatecart", bazaar)
    .then((res) => {
      cart_counter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        text: "Item Added to cart",
        timeout: 1000,
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        text: "can't add item to cart try later",
        timeout: 1000,
      }).show();
    });
}
cartbutton.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let bazaar = JSON.parse(btn.value);
    updateCart(bazaar);
  });
});

var ale = document.querySelector(".ale");

if (ale) {
  setTimeout(function () {
    ale.style.display = "none";
  }, 2000);
}

if (window.location.pathname.includes("adminorders")) {
  initAdmin();
}

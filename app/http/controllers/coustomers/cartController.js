const cartController = () => {
  return {
    index(req, res) {
      res.render("coustomer/cart");
    },
    update(req, res) {
      // console.log(req.body)
      //creating cart for first time
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }
      //if cart exists
      let cart = req.session.cart;
      if (!cart.items[req.body._id]) {
        let iid = req.body._id;
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        };

        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }
      // console.log(req.session.cart.items)
      return res.json({ totalQty: req.session.cart.totalQty });
    },
    delete(req, res) {
      console.log(req.body._id);
      if (req.session.cart) {
        let cart = req.session.cart;
        if (cart.items[req.body._id]) {
          if (cart.items[req.body._id].qty == 1) {
            let item_price = cart.items[req.body._id].item.price;
            delete cart.items[req.body._id];

            cart.totalQty = cart.totalQty - 1;
            cart.totalPrice = cart.totalPrice - item_price;
          } else {
            let item_price = cart.items[req.body._id].item.price;
            cart.items[req.body._id].qty = cart.items[req.body._id].qty - 1;

            cart.totalQty = cart.totalQty - 1;
            cart.totalPrice = cart.totalPrice - item_price;
          }
        }
      }

      return res.json({ totalQty: req.session.cart.totalQty });
    },
    add(req, res) {
      let cart = req.session.cart;
      cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
      cart.totalQty = cart.totalQty + 1;
      cart.totalPrice = cart.totalPrice + req.body.price;
      return res.json({ totalQty: req.session.cart.totalQty });
    },
    del(req, res) {
      let cart = req.session.cart;
      let item_price = cart.items[req.body._id].item.price;
      let qty = cart.items[req.body._id].item.qty;
      delete cart.items[req.body._id];

      cart.totalQty = cart.totalQty - qty;
      cart.totalPrice = cart.totalPrice - item_price * qty;
      return res.json({ totalQty: req.session.cart.totalQty });
    },
  };
};

module.exports = cartController;

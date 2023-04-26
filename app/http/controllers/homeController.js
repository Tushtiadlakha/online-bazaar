const Menues = require("../../db/menu");
function homeController() {
  return {
    async index(req, res) {
      const bazaars = await Menues.find({});

      return res.render("index", { bazaars: bazaars });
    },
  };
}

module.exports = homeController;

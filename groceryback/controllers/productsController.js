const BaseController = require("./baseController");

class ProductsController extends BaseController {
  constructor(model) {
    super(model);
  }

  async insertOne(req, res) {
    /** This mehtod will be used to add a new product into the store */
    const { name, price } = req.body;
    console.log(req.body);

    try {
      const newProduct = await this.model.create({
        updated_at: new Date(),
        created_at: new Date(),
        name: name,
        price: price,
      });

      return res.json(newProduct);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    console.log("getting shit ");
    /** This method will be used to get one item from the products table */
    const id = req.params.productId;
    try {
      const output = await this.model.findByPk(id);
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ProductsController;

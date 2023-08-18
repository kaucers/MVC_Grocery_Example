const BaseController = require('./baseController');

class ProductsController extends BaseController {
  constructor(model) {
    super(model);
  }

  async insertOne(req, res) {
    const { name, price } = req.body;
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
    const id = req.params.productId;
    try {
      const output = await this.model.findByPk(id);
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async updateOne(req, res) {
    const id = req.params.productId;
    const { name, price } = req.body;

    try {
      const updatedProduct = await this.model.update(
        { name, price },
        { where: { id } }
      );

      if (updatedProduct[0] === 1) {
        const updatedData = await this.model.findByPk(id);
        return res.json(updatedData);
      } else {
        return res.status(404).json({ error: true, msg: 'Product not found' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteOne(req, res) {
    const id = req.params.productId;
    try {
      const deletedProduct = await this.model.destroy({
        where: { id },
      });

      if (deletedProduct === 1) {
        return res.json({ message: 'Product deleted successfully' });
      } else {
        return res.status(404).json({ error: true, msg: 'Product not found' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ProductsController;

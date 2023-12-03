const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
     const allCategoryData = await Category.findAll({include:[{model: Product}]})
    res.status(200).json(allCategoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id, {include: [{model: Product}]})
    if(!categoryData){
      res.status(404).json("No Category with this id exists")
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try{
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory)
  } catch (err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
    const updateCategory = await Category.update(req.body, { where: { id: req.params.id }})
    res.status(200).json(updateCategory)
    if (!updateCategory){
      res.status(404).json("No such category to update")
    }
  } catch (err){
    res.status(500).json(err)
  }
  
});

router.delete('/:id', async (req, res) => {
  try{
    const DESTROYCATEGORY = await Category.destroy({
    where: {
        id: req.params.id
      }
    })
    if(!DESTROYCATEGORY){
      res.status(404).json("NO SUCH CATEGORY TO DESTROOYYYYY")
    }
  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;

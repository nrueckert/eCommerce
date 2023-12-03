const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
 try{
  const tags = await Tag.findAll({include: [{model: Product}]})
  res.status(200).json(tags)
 } catch(err){
  res.status(500).json(err)
 }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try{
    const tag = await Tag.findByPk(req.params.id, {include: [{model: Product}]})
    res.status(200).json(tag)
    if(!tag){
      res.status(404).json("No Tag with this id")
    }
  } catch(err) {
    res.status(500).json(err)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try{
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)
    } catch(err){
      res.status(500).json(err)
    }
});

router.put('/:id', async (req, res) => {
  try{
    const updateTag = await Tag.update(req.body, { where: {id: req.params.id}})
    if(!updateTag){
      res.status(404).json("No tag with such id")
    }
    res.status(200).json(updateTag)
  } catch(err) {
    res.status(500).json(err)
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  const DESTROYTAG = await Tag.destroy({ where: { id: req.params.id }})
  if(!DESTROYTAG){
    res.status(404).json("No tag to DESTROYYYY")
  }
  res.status(200).json(DESTROYTAG)
  // delete on tag by its `id` value
});

module.exports = router;

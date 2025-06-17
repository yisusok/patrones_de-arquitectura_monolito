const ProductoModel = require("../models/ProductModel");
const productoModel = new ProductoModel();

const listBySucursal = async (req, res) => {
  const sucursalId = req.params.id;
  try {
    const productos = await productoModel.getBySucursalId(sucursalId);
    res.render("productosPorSucursal", { productos, sucursalId });
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).send("Error al obtener productos");
  }
};

const showForm = (req, res) => {
  const sucursalId = req.params.id;
  res.render("nuevoProducto", { sucursalId });
};

const createProduct = async (req, res) => {
  const { nombre, precio, cantidad } = req.body;
  const sucursalId = req.params.id;

  try {
    await productoModel.create({ nombre, precio, cantidad: parseInt(cantidad), sucursalId });
    res.redirect(`/products/sucursal/${sucursalId}`);
  } catch (err) {
    console.error("Error al crear producto:", err);
    res.status(500).send("Error al crear producto");
  }
};

const showEditForm = async (req, res) => {
  const id = req.params.id;
  try {
    const producto = await productoModel.getById(id);
    if (!producto) return res.status(404).send("Producto no encontrado");
    res.render("editarProducto", { producto });
  } catch (err) {
    console.error("Error al obtener producto:", err);
    res.status(500).send("Error al obtener producto");
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { nombre, precio, cantidad } = req.body;

  try {
    const changes = await productoModel.update(id, { nombre, precio, cantidad: parseInt(cantidad) });
    if (changes === 0) return res.status(404).send("Producto no encontrado o no modificado");
    res.redirect(`/products/sucursal/${req.body.sucursalId}`);
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).send("Error al actualizar producto");
  }
};

module.exports = {
  listBySucursal,
  showForm,
  createProduct,   // Asegurate que esté definido y exportado
  showEditForm,
  updateProduct,
};
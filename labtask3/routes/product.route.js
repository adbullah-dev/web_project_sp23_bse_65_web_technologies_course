import express from "express"
import upload from "../middleware/multer.js"
import { renderProductForm,
   createProduct, deleteProduct,
    getSingleProduct,
     updateProduct } 
     from "../controllers/product.controller.js";
const product_router = express.Router();

//RestFull Crud Operations
product_router.route('/')
.post(createProduct)
.get(async (req, res) => {
  try {
    // Extract query parameters
    const { page = 1, limit = 10, search = '', sortBy = 'price', sortOrder = 'asc' } = req.query;
    const pageNum = parseInt(page);
    const pageLimit = parseInt(limit);

    // Search Query
    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { brand: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    // Sorting
    const sortOrderValue = sortOrder === 'desc' ? -1 : 1;

    // Fetching Products with Pagination, Sorting, and Search
    const products = await Product.find(searchQuery)
      .skip((pageNum - 1) * pageLimit) 
      .limit(pageLimit) 
      .sort({ [sortBy]: sortOrderValue }); 

    const totalProducts = await Product.countDocuments(searchQuery);

    // Render the EJS page with all required data
    res.status(200).render("admin/advaneFilterationProducts", {
      products,
      totalPages: Math.ceil(totalProducts / pageLimit),
      currentPage: pageNum,
      limit: pageLimit,
      search,
      sortBy,
      sortOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch products.");
  }
}
)   

product_router.route('/create')
.get(renderProductForm)
.post(upload.single("productImage"), createProduct);


product_router.route('/:id')
  .get(getSingleProduct)
  .delete(deleteProduct)
  .put(updateProduct)      

export default product_router;



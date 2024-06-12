const db = require("../models/db");

// 상품 추가
const addProduct = async (req, res) => {
    const { name, description, price, imageUrl, stockQuantity, soldQuantity, category } = req.body;
    try {
        const [rows] = await db.query(
            "INSERT INTO products (name, description, price, image_url, stock_quantity, sold_quantity, category) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, description, price, imageUrl, stockQuantity, soldQuantity, category]
        );
        res.status(201).json({
            id: rows.insertId,
            name,
            description,
            price,
            imageUrl,
            stockQuantity,
            soldQuantity,
            category,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// 상품 조회
const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 상품 목록 조회
const getProducts = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products ORDER BY created_at DESC");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 카테고리별 상품 목록 조회
const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM products WHERE category = ? ORDER BY created_at DESC", [category]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 판매량별 상품 목록 조회
const getProductsBySales = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products ORDER BY sold_quantity DESC");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 상품 업데이트
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, imageUrl, stockQuantity, soldQuantity, category } = req.body;
    try {
        await db.query(
            "UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, stock_quantity = ?, sold_quantity = ?, category = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            [name, description, price, imageUrl, stockQuantity, soldQuantity, category, id]
        );
        res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 상품 삭제
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM products WHERE id = ?", [id]);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductsByCategory,
    getProductsBySales,
};

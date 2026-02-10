const { sql } = require('../config/database');

const BlogController = {
  // Get all blogs
  getAllBlogs: async (req, res) => {
    try {
      const { published, category, limit = 10, offset = 0 } = req.query;
      
      let blogs;
      
      // Handle different query combinations
      if (published !== undefined && category) {
        blogs = await sql`
          SELECT * FROM blogs 
          WHERE published = ${published === 'true'}
          AND category = ${category}
          ORDER BY created_at DESC 
          LIMIT ${parseInt(limit)} 
          OFFSET ${parseInt(offset)}
        `;
      } else if (published !== undefined) {
        blogs = await sql`
          SELECT * FROM blogs 
          WHERE published = ${published === 'true'}
          ORDER BY created_at DESC 
          LIMIT ${parseInt(limit)} 
          OFFSET ${parseInt(offset)}
        `;
      } else if (category) {
        blogs = await sql`
          SELECT * FROM blogs 
          WHERE category = ${category}
          ORDER BY created_at DESC 
          LIMIT ${parseInt(limit)} 
          OFFSET ${parseInt(offset)}
        `;
      } else {
        blogs = await sql`
          SELECT * FROM blogs 
          ORDER BY created_at DESC 
          LIMIT ${parseInt(limit)} 
          OFFSET ${parseInt(offset)}
        `;
      }
      
      res.json({ success: true, data: blogs });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get blog by ID
  getBlogById: async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await sql`SELECT * FROM blogs WHERE id = ${id}`;
      
      if (blog.length === 0) {
        return res.status(404).json({ success: false, error: 'Blog not found' });
      }
      
      res.json({ success: true, data: blog[0] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get blog by slug
  getBlogBySlug: async (req, res) => {
    try {
      const { slug } = req.params;
      const blog = await sql`SELECT * FROM blogs WHERE slug = ${slug}`;
      
      if (blog.length === 0) {
        return res.status(404).json({ success: false, error: 'Blog not found' });
      }
      
      res.json({ success: true, data: blog[0] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Create new blog
  createBlog: async (req, res) => {
    try {
      const { title, slug, excerpt, content, author, category, tags, featured_image, published } = req.body;
      
      const result = await sql`
        INSERT INTO blogs (title, slug, excerpt, content, author, category, tags, featured_image, published)
        VALUES (${title}, ${slug}, ${excerpt}, ${content}, ${author}, ${category}, ${tags}, ${featured_image}, ${published})
        RETURNING *
      `;
      
      res.status(201).json({ success: true, data: result[0] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update blog
  updateBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, slug, excerpt, content, author, category, tags, featured_image, published } = req.body;
      
      const result = await sql`
        UPDATE blogs 
        SET title = ${title}, slug = ${slug}, excerpt = ${excerpt}, content = ${content}, 
            author = ${author}, category = ${category}, tags = ${tags}, 
            featured_image = ${featured_image}, published = ${published},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;
      
      if (result.length === 0) {
        return res.status(404).json({ success: false, error: 'Blog not found' });
      }
      
      res.json({ success: true, data: result[0] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete blog
  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await sql`DELETE FROM blogs WHERE id = ${id} RETURNING *`;
      
      if (result.length === 0) {
        return res.status(404).json({ success: false, error: 'Blog not found' });
      }
      
      res.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get all categories
  getCategories: async (req, res) => {
    try {
      const categories = await sql`SELECT DISTINCT category FROM blogs WHERE category IS NOT NULL`;
      res.json({ success: true, data: categories.map(c => c.category) });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = BlogController;
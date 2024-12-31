const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes.js');
const contactRoutes = require('./routes/contactRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const teamRoutes = require('./routes/teamRoutes.js');
const companyRoutes = require('./routes/companyRoutes.js');
const banner_imageRoutes = require('./routes/banner_imageRoutes.js');
const blogRoutes = require('./routes/blogRoutes.js');
const galleryRoutes = require('./routes/galleryRoutes.js');
const news_eventsRoutes = require('./routes/news_eventsRoutes.js');
const socialLinksRoutes = require('./routes/socialLinksRoutes.js');
const testimonialsRoutes = require('./routes/testimonialsRoutes.js');
const whyChooseUsRoutes = require('./routes/whyChooseUsRoutes.js');
const newsEventsCategoriesRoutes = require('./routes/newsEventsCategoriesRoutes.js');
const blogCategoriesRoutes = require('./routes/blogCategoriesRoutes.js');

const { dbConnection } = require('./config/db.js'); // Import your database configuration

const app = express();

// Middleware
app.use(cors({ origin: '*' })); 
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Function to initialize the database and set up the server
async function startServer() {
  try {
    await dbConnection(); // Initialize the database

    // Routes
    app.get('/', (req, res) => {
      res.send('API Started Working');
    });
    

    app.use('/api/user', userRoutes); 
    app.use('/api/contact', contactRoutes); 
    app.use('/api/product', productRoutes); 
    app.use('/api/team', teamRoutes); 
    app.use('/api/company', companyRoutes); 
    app.use('/api/banner', banner_imageRoutes); 
    app.use('/api/blog', blogRoutes); 
    app.use('/api/news-events', news_eventsRoutes); 
    app.use('/api/gallery', galleryRoutes); 
    app.use('/api/social-links', socialLinksRoutes); 
    app.use('/api/testimonials', testimonialsRoutes); 
    app.use('/api/whychooseus', whyChooseUsRoutes); 
    app.use('/api/newseventscategories', newsEventsCategoriesRoutes); 
    app.use('/api/blogcategory', blogCategoriesRoutes); 

    // 404 Error Handler
    app.use((req, res, next) => {
      res.status(404).json({ message: 'Not Found' });
    });

    // Global Error Handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Server Error' });
    });

    return app; 
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    throw error;
  }
}

module.exports = startServer;

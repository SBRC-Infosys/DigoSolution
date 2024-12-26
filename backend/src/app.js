const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const teamRoutes = require('./routes/teamRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const socialLinksRoutes = require('./routes/socialLinksRoutes');
const contactFormRoutes = require('./routes/contactFormRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const clientRoutes = require('./routes/clientRoutes');
const blogCategoryRoutes = require('./routes/blogCategoryRoutes');
const blogRoutes = require('./routes/blogRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const accreditationRoutes = require('./routes/accreditationRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/social-links', socialLinksRoutes);
app.use('/api/contact-form', contactFormRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/consultation-requests', consultationRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/blog-categories', blogCategoryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/accreditations', accreditationRoutes);

module.exports = app;

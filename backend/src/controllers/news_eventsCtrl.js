const asyncHandler = require('express-async-handler');
const { pool } = require('../config/db.js');
const { deleteCloudinaryImage, uploadOnCloudinary } = require('../services/cloudinary.js');

exports.createNewsEvents = asyncHandler(async (req,res)=>{
    const {title,category_id, author_id,content,published_at} = req.body;
    let img_url = null;

    try {

         // Upload the logo image to Cloudinary if provided
        if (req.file) {
            const uploadResult = await uploadOnCloudinary(req.file.path);
            if (!uploadResult) {
                return res.status(500).json({ message: 'Failed to upload thumbnail image' });
            }
            img_url = uploadResult.secure_url;
        }

        const [result] = await pool.query(`
            INSERT INTO news_events (title, category_id, content, author_id, img_url, published_at)
            VALUES ( ?, ?, ?, ?, ?, ?);
        `, [title, category_id, content, author_id, img_url, published_at]);

        if(result.affectedRows === 0 ){
            await deleteCloudinaryImage(img_url);
            return res.status(500).json({ message: 'Failed to create news_events' });
        }else{
            return  res.status(200).json({
                status: 200,
                message: 'news_events uploaded created successfully',
                id: result.insertId
            });
        }
        
        
        
    } catch (error) {
        await deleteCloudinaryImage(img_url);
       return res.status(404).json({
            message: "failed to upload the NewsEvents",
            error: error
        })
    }
})

exports.getNewsEvents = asyncHandler(async (req,res)=>{    

    try {

        
        const [result] = await pool.query(`SELECT * FROM news_events;`);

        if(result.length > 0 ){
            res.status(201).json({
                message: 'success',
                data : result
            });
        }else{
            res.status(404).json({
                message: "Database is empty"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: "failed to fetch the news events",
            error: error.message
        })
    }
})

exports.getNewsEventsById = asyncHandler(async (req,res)=>{    
    const {id} = req.params;
    try {

        
        const [result] = await pool.query(`SELECT * FROM news_events WHERE id = ?;`,[id]);

        if(result.length > 0 ){
            res.status(201).json({
                message: 'success',
                data : result
            });
        }else{
            res.status(404).json({
                message: "Could not find the news events"
            })
        }
        
    } catch (error) {
        res.status(404).json({
            message: "failed to fetch the news events",
            error: error
        })
    }
})

exports.deleteNewsEventsById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the NewsEvents exists
        const [existingNewsEvents] = await pool.query(`SELECT * FROM news_events WHERE id = ?;`, [id]);
        if (existingNewsEvents.length === 0) {
            return res.status(404).json({ message: 'News events not found' });
        }

        // Delete the image from Cloudinary
        if (existingNewsEvents[0].img_url) {
            await deleteCloudinaryImage(existingNewsEvents[0].img_url);
        }

        const [result] = await pool.query(`DELETE FROM news_events WHERE id = ?;`, [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Failed to delete news events' });
        } else {
            res.status(200).json({
                message: 'News events deleted successfully',
                id: id
            });
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete the NewsEvents",
            error: error
        });
    }
});

exports.updateNewsEventsById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, category_id, content,author_id,published_at } = req.body;
    let img_url = null;

    try {
        // Check if the NewsEvents exists
        const [existingNewsEvents] = await pool.query(`SELECT * FROM news_events WHERE id = ?;`, [id]);
        if (existingNewsEvents.length === 0) {
            return res.status(404).json({ message: 'News events not found' });
        }

        // Upload new image to Cloudinary if provided
        if (req.file) {
            const uploadResult = await uploadOnCloudinary(req.file.path);
            if (!uploadResult) {
                return res.status(500).json({ message: 'Failed to upload thumbnail image' });
            }
            img_url = uploadResult.secure_url;

            // Delete the old image from Cloudinary
            if (existingNewsEvents[0].img_url) {
                await deleteCloudinaryImage(existingNewsEvents[0].img_url);
            }
        } else {
            img_url = existingNewsEvents[0].img_url; // Keep existing image if not updated
        }

        const [result] = await pool.query(`
            UPDATE news_events 
            SET 
                title = COALESCE(?, title),
                category_id = COALESCE(?, category_id),
                content = COALESCE(?, content),
                author_id = COALESCE(?, author_id),
                img_url = COALESCE(?, img_url),
                published_at = COALESCE(?, published_at),
                updated_at = NOW()
            WHERE id = ?;
        `, [title, category_id, content, author_id, img_url, published_at, id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Failed to update news_events' });
        } else {
            res.status(200).json({
                message: 'news_events updated successfully',
                id: id
            });
        }
        
    } catch (error) {
        if (img_url && img_url !== existingNewsEvents[0].img_url) {
            await deleteCloudinaryImage(img_url); // Delete the new image if update fails
        }
        res.status(500).json({
            message: "Failed to update the news_events",
            error: error
        });
    }
});


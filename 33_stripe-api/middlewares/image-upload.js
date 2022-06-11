const multer = require('multer');
const uuid = require('uuid').v4;

// managing file upload adn storage
const upload = multer({
	storage: multer.diskStorage({
		destination: 'product-data/images',
		filename: function (req, file, cb) {
			cb(null, `${uuid()}-${file.originalname}`);
		}
	})
});

// for the new-product.ejs form input type="file", name="image" accept="image/png,image/jpg"
const configuredMulterMiddleware = upload.single('image');

module.exports = configuredMulterMiddleware;
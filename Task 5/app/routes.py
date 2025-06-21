from flask import Blueprint, render_template, jsonify, abort, redirect, url_for, flash, request

try:
    from models import Product
except ImportError:
    from app.models import Product

main = Blueprint('main', __name__)

# Sample course products data
courses = [
    {
        'id': 1,
        'name': 'Complete HTML5 Course',
        'description': 'Master HTML5 from basics to advanced concepts. Learn semantic markup, forms, multimedia, and modern web development practices.',
        'price': 49.99,
        'image_url': 'img/courses/html-course.jpg',
        'duration': '20 Hours',
        'rating': 4.8
    },
    {
        'id': 2,
        'name': 'Modern CSS & Sass Course',
        'description': 'Learn modern CSS3, Flexbox, Grid, Sass, animations, and responsive design principles for creating beautiful websites.',
        'price': 59.99,
        'image_url': 'img/courses/css-course.jpg',
        'duration': '25 Hours',
        'rating': 4.9
    },
    {
        'id': 3,
        'name': 'Advanced JavaScript',
        'description': 'Master JavaScript ES6+, async programming, DOM manipulation, and modern JavaScript frameworks.',
        'price': 69.99,
        'image_url': 'img/courses/javascript-course.jpg',
        'duration': '30 Hours',
        'rating': 4.7
    },
    {
        'id': 4,
        'name': 'Python Programming',
        'description': 'Learn Python from scratch, including OOP, data structures, algorithms, and web development with Flask.',
        'price': 79.99,
        'image_url': 'img/courses/python-course.jpg',
        'duration': '35 Hours',
        'rating': 4.8
    },
    {
        'id': 5,
        'name': 'Java Development',
        'description': 'Comprehensive Java course covering core concepts, Spring Framework, and enterprise application development.',
        'price': 89.99,
        'image_url': 'img/courses/java-course.jpg',
        'duration': '40 Hours',
        'rating': 4.6
    },
    {
        'id': 6,
        'name': 'Full Stack Development',
        'description': 'Become a full stack developer with HTML, CSS, JavaScript, Node.js, React, and MongoDB.',
        'price': 129.99,
        'image_url': 'img/courses/fullstack-course.jpg',
        'duration': '60 Hours',
        'rating': 4.9
    }
]

@main.route('/')
def index():
    featured_courses = courses[:3]  # Show first 3 courses on homepage
    return render_template('index.html', products=featured_courses)

@main.route('/products')
def products():
    return render_template('products.html', products=courses)

@main.route('/product/<int:product_id>')
def product_detail(product_id):
    product = next((course for course in courses if course['id'] == product_id), None)
    if product is None:
        abort(404)
    return render_template('product_detail.html', product=product)

@main.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Login logic would go here
        flash('Login functionality is not implemented yet')
        return redirect(url_for('main.index'))
    return render_template('login.html')

@main.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Signup logic would go here
        flash('Signup functionality is not implemented yet')
        return redirect(url_for('main.index'))
    return render_template('signup.html')

@main.route('/cart')
def cart():
    return render_template('cart.html')

@main.route('/checkout', methods=['POST'])
def checkout():
    # Checkout logic would go here
    flash('Payment processing is not implemented yet')
    return redirect(url_for('main.cart'))

@main.route('/api/products')
def api_products():
    return jsonify(courses)

@main.route('/api/products/<int:product_id>')
def api_product(product_id):
    product = next((course for course in courses if course['id'] == product_id), None)
    if product is None:
        abort(404)
    return jsonify(product)

@main.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)

    product = next((course for course in courses if course['id'] == product_id), None)
    if product is None:
        return jsonify({'error': 'Product not found'}), 404

    return jsonify({'success': True, 'message': 'Product added to cart', 'product': product})

@main.route('/api/cart/remove', methods=['POST'])
def remove_from_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    return jsonify({'success': True, 'message': 'Product removed from cart'})

@main.route('/api/cart/update', methods=['POST'])
def update_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity')
    return jsonify({'success': True, 'message': 'Cart updated'})

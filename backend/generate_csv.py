import csv
import json

# Paste your dummyProducts data into this variable
dummy_products = [
    {"id": 1, "name": "Multigrain Atta", "price": 120, "image": "/img/multi.jpg", "description": "A healthy blend of multiple grains, perfect for soft and nutritious rotis."},
    {"id": 2, "name": "Besan Flour", "price": 90, "image": "/img/Laxmi-Besan-Chickpea-Flour_b175f891-e632-4aec-990b-57825615f3a2.bf98feae9e4d12f9a30d7bd0b1ac1117.avif", "description": "Finely ground chickpea flour, ideal for pakoras, sweets, and batters."},
    { "id": 3, "name": "Rice Flour", "price": 70, "image": "/img/rice.webp", "description": "Smooth rice flour for crispy dosas, snacks, and gluten-free baking." },
    { "id": 4, "name": "Maida", "price": 50, "image": "/img/maida.jpg", "description": "Refined wheat flour, perfect for baking cakes, breads, and pastries." },
    { "id": 5, "name": "Wheat Flour", "price": 100, "image": "/img/wheat.jpg", "description": "Traditional whole wheat flour for soft chapatis and wholesome breads." },
    { "id": 6, "name": "Organic Wheat Flour", "price": 110, "image": "/img/wheat.jpg", "description": "Organically grown wheat flour, perfect for baking and cooking." },
    { "id": 7, "name": "Premium Rice Flour", "price": 85, "image": "/img/rice.webp", "description": "High-quality rice flour for making smooth and fluffy rice dishes." },
    { "id": 8, "name": "Classic Maida", "price": 55, "image": "/img/maida.jpg", "description": "Classic wheat flour, ideal for baking traditional Indian breads." },
    { "id": 9, "name": "Healthy Multigrain Mix", "price": 130, "image": "/img/multi.jpg", "description": "A blend of multiple grains for a nutritious and wholesome meal." },
    { "id": 10, "name": "Chickpea Besan", "price": 95, "image": "/img/Laxmi-Besan-Chickpea-Flour_b175f891-e632-4aec-990b-57825615f3a2.bf98feae9e4d12f9a30d7bd0b1ac1117.avif", "description": "Finely ground chickpea flour, ideal for pakoras and snacks." },
    { "id": 11, "name": "Stoneground Atta", "price": 125, "image": "/img/multi.jpg", "description": "Stoneground flour for traditional rotis and breads." },
    { "id": 12, "name": "Fine Besan", "price": 92, "image": "/img/Laxmi-Besan-Chickpea-Flour_b175f891-e632-4aec-990b-57825615f3a2.bf98feae9e4d12f9a30d7bd0b1ac1117.avif", "description": "Finely ground chickpea flour, ideal for pakoras and snacks." },
    { "id": 13, "name": "Superfine Rice Flour", "price": 75, "image": "/img/rice.webp", "description": "Smooth rice flour for making smooth and fluffy rice dishes." },
    { "id": 14, "name": "All-Purpose Maida", "price": 60, "image": "/img/maida.jpg", "description": "Versatile wheat flour, perfect for a variety of baking and cooking applications." },
    { "id": 15, "name": "Whole Wheat Flour", "price": 105, "image": "/img/wheat.jpg", "description": "Traditional whole wheat flour for soft chapatis and wholesome breads." },
    { "id": 16, "name": "Gluten-Free Atta", "price": 135, "image": "/img/multi.jpg", "description": "Gluten-free flour blend, perfect for baking and cooking." },
    { "id": 17, "name": "Roasted Besan", "price": 98, "image": "/img/Laxmi-Besan-Chickpea-Flour_b175f891-e632-4aec-990b-57825615f3a2.bf98feae9e4d12f9a30d7bd0b1ac1117.avif", "description": "Roasted chickpea flour, ideal for making roasted snacks and batters." },
    { "id": 18, "name": "Brown Rice Flour", "price": 80, "image": "/img/rice.webp", "description": "Brown rice flour for making smooth and fluffy rice dishes." },
    { "id": 19, "name": "Refined Maida", "price": 65, "image": "/img/maida.jpg", "description": "Refined wheat flour, perfect for baking cakes, breads, and pastries." },
    { "id": 20, "name": "Sharbati Wheat Flour", "price": 115, "image": "/img/wheat.jpg", "description": "Wheat flour for making soft and nutritious rotis." },
    { "id": 21, "name": "Protein Atta", "price": 140, "image": "/img/multi.jpg", "description": "Wheat flour with added protein for nutritious rotis and breads." },
    { "id": 22, "name": "Gram Flour", "price": 97, "image": "/img/Laxmi-Besan-Chickpea-Flour_b175f891-e632-4aec-990b-57825615f3a2.bf98feae9e4d12f9a30d7bd0b1ac1117.avif", "description": "Finely ground chickpea flour, ideal for making gram flour snacks." },
    { "id": 23, "name": "Idli Rice Flour", "price": 78, "image": "/img/rice.webp", "description": "Smooth rice flour for making soft and fluffy idlis." },
    { "id": 24, "name": "Soft Maida", "price": 58, "image": "/img/maida.jpg", "description": "Wheat flour for making soft and nutritious rotis." },
    { "id": 25, "name": "MP Wheat Flour", "price": 108, "image": "/img/wheat.jpg", "description": "Whole wheat flour for making soft and nutritious rotis." },
    { "id": 26, "name": "Fiber Rich Atta", "price": 132, "image": "/img/multi.jpg", "description": "Wheat flour with added fiber for nutritious rotis and breads." },
    { "id": 27, "name": "Chana Besan", "price": 93, "image": "/img/Laxmi-Besan-Chickpea-Flour_b175f891-e632-4aec-990b-57825615f3a2.bf98feae9e4d12f9a30d7bd0b1ac1117.avif", "description": "Finely ground chickpea flour, ideal for pakoras and snacks." },
    { "id": 28, "name": "White Rice Flour", "price": 72, "image": "/img/rice.webp", "description": "Smooth rice flour for making smooth and fluffy rice dishes." },
    { "id": 29, "name": "Premium Maida", "price": 62, "image": "/img/maida.jpg", "description": "Refined wheat flour, perfect for baking cakes, breads, and pastries." },
    { "id": 30, "name": "Lokwan Wheat Flour", "price": 112, "image": "/img/wheat.jpg", "description": "Wheat flour for making soft and nutritious rotis." },
    { "id": 31, "name": "Low GI Atta", "price": 138, "image": "/img/multi.jpg", "description": "Wheat flour with a low glycemic index for nutritious rotis and breads." },
    { "id": 32, "name": "Desi Besan", "price": 99, "image": "/img/Laxmi-Besan-Chickpea-Flour_b175f891-e632-4aec-990b-57825615f3a2.bf98feae9e4d12f9a30d7bd0b1ac1117.avif", "description": "Finely ground chickpea flour, ideal for pakoras and snacks." },
    { "id": 33, "name": "Red Rice Flour", "price": 82, "image": "/img/rice.webp", "description": "Smooth rice flour for making smooth and fluffy rice dishes." },
    { "id": 34, "name": "Cake Maida", "price": 68, "image": "/img/maida.jpg", "description": "Wheat flour for making soft and nutritious rotis." },
    { "id": 35, "name": "Punjab Wheat Flour", "price": 120, "image": "/img/wheat.jpg", "description": "Whole wheat flour for making soft and nutritious rotis." },
    { "id": 36, "name": "Omega Atta", "price": 145, "image": "/img/multi.jpg", "description": "Wheat flour with added omega-3 fatty acids for nutritious rotis and breads." },
    { "id": 37, "name": "Split Besan", "price": 94, "image": "/img/Laxmi-Besan-Chickpea-Flour_b175f891-e632-4aec-990b-57825615f3a2.bf98feae9e4d12f9a30d7bd0b1ac1117.avif", "description": "Finely ground chickpea flour, ideal for pakoras and snacks." },
    { "id": 38, "name": "Sticky Rice Flour", "price": 77, "image": "/img/rice.webp", "description": "Smooth rice flour for making smooth and fluffy rice dishes." },
    { "id": 39, "name": "Bakery Maida", "price": 66, "image": "/img/maida.jpg", "description": "Wheat flour for making soft and nutritious rotis." },
    { "id": 40, "name": "Sharbati Gold Wheat", "price": 118, "image": "/img/wheat.jpg", "description": "Wheat flour for making soft and nutritious rotis." },
    { "id": 41, "name": "Vitamins Atta", "price": 142, "image": "/img/multi.jpg", "description": "Wheat flour with added vitamins for nutritious rotis and breads." },
    { "id": 42, "name": "Roasted Gram Besan", "price": 101, "image": "/img/Laxmi-Besan-Chickpea-Flour_b175f891-e632-4aec-990b-57825615f3a2.bf98feae9e4d12f9a30d7bd0b1ac1117.avif", "description": "Roasted chickpea flour, ideal for making roasted snacks and batters." },
    { "id": 43, "name": "Jasmine Rice Flour", "price": 79, "image": "/img/rice.webp", "description": "Smooth rice flour for making smooth and fluffy rice dishes." },
    { "id": 44, "name": "Ultra Maida", "price": 64, "image": "/img/maida.jpg", "description": "Wheat flour for making soft and nutritious rotis." },
    { "id": 45, "name": "Golden Wheat Flour", "price": 122, "image": "/img/wheat.jpg", "description": "Wheat flour for making soft and nutritious rotis." },
    { "id": 46, "name": "High Fiber Atta", "price": 136, "image": "/img/multi.jpg", "description": "Wheat flour with added fiber for nutritious rotis and breads." },
    { "id": 47, "name": "Fine Chana Besan", "price": 96, "image": "/img/Laxmi-Besan-Chickpea-Flour_b175f891-e632-4aec-990b-57825615f3a2.bf98feae9e4d12f9a30d7bd0b1ac1117.avif", "description": "Finely ground chickpea flour, ideal for pakoras and snacks." },
    { "id": 48, "name": "Sona Masoori Rice Flour", "price": 83, "image": "/img/rice.webp", "description": "Smooth rice flour for making smooth and fluffy rice dishes." },
    { "id": 49, "name": "Refined Cake Maida", "price": 70, "image": "/img/maida.jpg", "description": "Wheat flour for making soft and nutritious rotis." },
    { "id": 50, "name": "MP Gold Wheat Flour", "price": 114, "image": "/img/wheat.jpg", "description": "Wheat flour for making soft and nutritious rotis." }
    { "id": 51, "name": "Pearl Millet Flour", "price": 65, "image": "/img/pearl.jpg", "description": "Made from premium MP wheat used for soft chapatis and rotis." },
    { "id": 52, "name": "White Sorghum Flour", "price": 76, "image": "/img/sorghum.jpg", "description": "Refined white flour for bakery items samosas pastries." },
    { "id": 53, "name": "Finger Millet Flour", "price": 100, "image": "/img/millet.jpg", description: "Made from Bengal gram used for pakoras sweets and snacks." },
    { "id": 54, "name": "Fine Corn Flour", "price": 60, "image": "/img/CornFlour.jpg", "description": "Gluten-free used in modak dosa and South Indian dishes." },
    { "id": 55, "name": "Bombay Rava", "price": 120, "image": "/img/BombaiRava.jpg", "description": "Used in ragi dosa porridge highly nutritious." },
    { "id": 56, "name": "Barley Whole Flour", "price": 80, "image": "/img/barley.jpg", "description": "Used for making jau roti good for digestion and weight loss." },
    { "id": 57, "name": "Coarse Chana Besan", "price": 96, "image": "/img/besan.jpg", "description": "Smooth texture used for sweets like laddus dhokla and kadhi." },
    { "id": 58, "name": "Aashirvaad MP Sharbati", "price": 110, "image": "/img/aasirvad.jpg", "description": "Slightly grainy ideal for pakoras chilla and traditional recipes" },
    { "id": 59, "name": "24 Mantra Organic", "price": 80, "image": "/img/organic.jpg", "description": "Dry roasted gram flour with nutty flavor used in laddus barfi etc." },
    { "id": 60, "name": "Kabuli Chana Besan", "price": 67, "image": "/img/rajdhani.jpg", "description": "Made from small desi chana richer taste and aroma." }
]

# Convert to CSV
with open("products.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=["id", "name", "price", "image", "description"])
    writer.writeheader()
    writer.writerows(dummy_products)

print("✅ products.csv has been created with 50 products.")

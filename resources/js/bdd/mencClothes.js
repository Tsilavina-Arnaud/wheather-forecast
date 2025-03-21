const data = [
    //very cold
    [
        {
            name: "Thick coat",
            image: "https://urbansapes.fr/media/catalog/product/cache/47969c47b57255357446b283e5a56cc2/m/a/manteau_long_en_laine_epais_a_double_boutonnage_pour_homme-bw02523_5_.jpg",
        },
        {
            name: "Cap",
            image: "https://lamaisonduchapeau.com/cdn/shop/files/Sf70e099f3f6741b28a0e570a151b62ecA.webp?v=1726736065",
        },
        {
            name: "Gloves",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ZZZBEVQb2PjQHzi0pL4A8JnNqMFBicnecQ&s",
        },
        {
            name: "Scarf",
            image: "https://www.apbp.fr/media/images/products/12210/12210_1.jpg",
        },
        {
            name: "Thick wool sweaters",
            image: "https://cdn.laredoute.com/cdn-cgi/image/width=400,height=400,fit=pad,dpr=1/products/2/7/5/275a14f9ffc8e1d2c2979a4bfa5b0d44.jpg",
        },
        {
            name: "Lined pants",
            image: "https://www.chassezdiscount.com/111886-large_default/pantalon-homme-treeland-double-t579.jpg",
        },
        {
            name: "Insulated boots",
            image: "https://m.media-amazon.com/images/I/71M-oqbZLpL._AC_UY780_.jpg",
        },
    ],
    //Cold
    [
        {
            name: "Warm coat",
            image: "https://www.cdiscount.com/pdt2/8/6/3/1/700x700/mp161066863/rw/manteau-homme-hiver-chaud-mi-long-parka-pardessus.jpg",
        },
        {
            name: "Scarf",
            image: "https://www.apbp.fr/media/images/products/12210/12210_1.jpg",
        },
        {
            name: "Gloves",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ZZZBEVQb2PjQHzi0pL4A8JnNqMFBicnecQ&s",
        },
        {
            name: "Cap",
            image: "https://lamaisonduchapeau.com/cdn/shop/files/Sf70e099f3f6741b28a0e570a151b62ecA.webp?v=1726736065",
        },
        {
            name: 'Wool sweater',
            image: 'https://www.maxitaille.fr/387-thickbox_default/pull-aymeric-noir-grande-taille-homme-laine-breidhof-qualite-oekotex.jpg'
        },
        {
            name: 'Wool pants',
            image: 'https://photos6.spartoo.com/photos/285/28555343/28555343_1200_A.jpg'
        },
        {
            name: "Insulated boots",
            image: "https://m.media-amazon.com/images/I/71M-oqbZLpL._AC_UY780_.jpg",
        },
    ],
    //fresh
    [
        {
            name: 'Warm down jacket',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzeTaPQmy5RZ2dJcLe18eFMGPXjuzgEwjCrg&s'
        },
        {
            name: 'Pull',
            image: 'https://lookhomme.com/wp-content/uploads/2019/01/Pull-homme-laine-12.jpg'
        },
        {
            name: 'Scarf',
            image: 'https://www.aunomdelasoie.com/2272-large_default/echarpe-homme-soie-carreaux-bleu.jpg'
        },
        {
            name: 'Thin gloves',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnJSVmj2ni7_lSLTreIIIa5RRw8k8nZP00gQ&s'
        },
        {
            name: 'Jeans',
            image: 'https://www.cdiscount.com/pdt2/1/1/4/1/700x700/mp55505114/rw/jeans-homme-fashion-slim-fit-stretch-5-poches-pant.jpg'
        },
        {
            name: 'Ankle boots',
            image: 'https://www.districenter.fr/707-large_default/bottines-homme-noires-40-45.jpg'
        }
    ],
    //temperate
    [
        {
            name: 'Light jacket',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNNNLdjNqYQ73qRaNg9qdn87cO0-ZV_mvDg&s'
        },
        {
            name: 'Tee-shirt',
            image: 'https://janedeboy-cdn.com/arts/1500/128491_01.jpg'
        },
        {
            name: 'Chinos',
            image: 'https://www.districenter.fr/47597-large_default/pantalon-chino-grande-taille-homme.jpg'
        },
        {
            name: 'Sneaker',
            image: 'https://www.loding.fr/cdn/shop/files/sneakers-marron-cuir-pour-homme-CHA1015AR_1.jpg?v=1701348619'
        },
    ],
    //mild
    [
        {
            name: 'Long sleeve shirt',
            image: 'https://site.glotelho.cm/media/catalog/product/cache/3d5322e2293df1ca8e64a115bdb04917//c/h/chemise_slim_fit_-_a_manches_longues_hommes.jpg'
        },
        {
            name: 'Tee-shirt',
            image: 'https://janedeboy-cdn.com/arts/1500/128491_01.jpg'
        },
        {
            name: 'Chinos',
            image: 'https://www.districenter.fr/47597-large_default/pantalon-chino-grande-taille-homme.jpg'
        },
        {
            name: 'Casual shoes',
            image: 'https://keeshoes.fr/a/ale/auction_image/image1_202474.s2000/olivier-chaussures-de-sport-decontractees-en-cuir-pour-hommes-902knt-axe-marron-brun-2000x2000.jpeg?_=1723302579.16377161'
        },
    ],
    //hot
    [
        {
            name: 'Short sleeve shirt',
            image: 'https://tbs-tbs-storage.omn.proximis.com/Imagestorage/imagesSynchro/1500/1500/2651a0cfebebf95d8b575a65fc0d938c2d3c6f3d_BRODYCHA14368_1_p.jpg'
        },
        {
            name: 'Tee-shirt',
            image: 'https://janedeboy-cdn.com/arts/1500/128491_01.jpg'
        },
        {
            name: 'Short',
            image: 'https://cf75d1d9c.cloudimg.io/v7/imageserver/original/MROSSHO005_6151%20EUCALYPTUS_2.jpg?w=300&h=450'
        },
        {
            name: 'Sandals',
            image: 'https://www.mephisto-shop.com/produit_img/nadek%203451%20(1).jpg'
        },
    ],
    //very hot
    [
        {
            name: 'Sunglasses',
            image: 'https://www.lunettes-originales.fr/wp-content/uploads/2024/01/visuel-dossier-solaire-homme-luxe-plv-raford-salt-optics-156.jpg'
        },
        {
            name: 'Light Tee-shirt',
            image: 'https://static.cimalp.fr/34291-large_default/tee-shirt-leger-coton-polyester.jpg'
        },
        {
            name: 'Short',
            image: 'https://cf75d1d9c.cloudimg.io/v7/imageserver/original/MROSSHO005_6151%20EUCALYPTUS_2.jpg?w=300&h=450'
        },
        {
            name: 'Cap',
            image: 'https://www.apbp.fr/media/images/products/12211/12211_1.jpg'
        },
        {
            name: 'Sandals',
            image: 'https://www.mephisto-shop.com/produit_img/nadek%203451%20(1).jpg'
        },
    ]
];

export default data;

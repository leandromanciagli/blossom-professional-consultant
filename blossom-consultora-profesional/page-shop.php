<?php
    /* Template Name: Carrito */
    get_header(); 
?>

<main>
    <div class="d-flex justify-content-between gap-100">
        <div>
            <div>
                <h2 class="primary-text b-500">Carrito</h2>
            </div>
            <ol class="d-flex gap-35 mb-35">
                <li class="fs-18 tertiary-text">Carrito</li>
                <li class="fs-18 tertiary-text">Checkout</li>
                <li class="fs-18 tertiary-text">Pago</li>
            </ol>
            <div class="shop-card pa-25 mb-15" style="border-radius: 1rem">
                <div class="d-flex justify-content-between align-items-center gap-35 mb-20">
                    <h3 class="fs-22 ma-0">Curso para el manejo de las emociones</h3>
                    <div>
                        <h3 class="d-flex align-items-center gap-5 ma-0 b-600 fs-29" style="padding-bottom: 5px">$2400<span class="fs-16">ARS</span></h3>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="theme-tag">Desarrollo personal</span>
                    <img src="assets/images/trash.png">
                </div>
            </div>

            <div class="shop-card pa-25" style="border-radius: 1rem">
                <div class="d-flex justify-content-between align-items-center gap-35 mb-20">
                    <h3 class="fs-22 ma-0">Curso de oratoria</h3>
                    <div>
                        <h3 class="d-flex align-items-center gap-5 ma-0 b-600 fs-29" style="padding-bottom: 5px">$3000<span
                                class="fs-16">ARS</span></h3>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="theme-tag">Desarrollo personal</span>
                    <img src="assets/images/trash.png">
                </div>
            </div>

        </div>

        <div class="d-flex flex-column justify-content-between shop-card pa-35 mt-40" style="border-radius: 2.5rem">
            <h3 class="fs-22">Resúmen de la compra</h3>
            <div class="d-flex justify-content-between gap-60 pb-40">
                <span class="fs-16 tertiary-text">1 Curso para el manejo de las emociones</span>
                <span class="fs-16 tertiary-text">$2400</span>
            </div>

            <div class="d-flex justify-content-between gap-60 pb-40">
                <span class="fs-16 tertiary-text">1 Curso de oratoria</span>
                <span class="fs-16 tertiary-text">$3000</span>
            </div>
            
            <!-- <div class="d-flex justify-content-between gap-60 pb-20">
                <span class="fs-16 tertiary-text">Subtotal</span>
                <span class="fs-16 tertiary-text">$5400</span>
            </div> -->
            
            <div class="d-flex justify-content-between pb-60">
                <span class="fs-16 b-500">Total</span>
                <span class="fs-16 b-500">$5400</span>
            </div>

            <div class="d-flex justify-content-center">
                <button class="btn btn-primary w-100 d-flex justify-content-center align-items-center b-500">Continuar compra</button>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>
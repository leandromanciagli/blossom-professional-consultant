<?php
    /* Template Name: Workshops */
    get_header(); 
?>

<main>
    <div class="d-flex justify-content-center align-items-center gap-10 mb-60">
        <div class="d-flex align-items-center gap-10">
            <div class="circle-5 bg-primary"></div>
            <div class="circle-10 bg-primary"></div>
        </div>
        <h2 class="primary-text fs-24">PRÓXIMAMENTE</h2>
        <div class="d-flex align-items-center gap-10">
            <div class="circle-10 bg-primary"></div>
            <div class="circle-5 bg-primary"></div>
        </div>
    </div>
    
    <!-- WORKSHOPS -->
    <div class="workshops-section d-flex justify-content-between align-items-center">
        <div class="ml-60">
            <h1 class="primary-text mt-20">Workshops</h1>
            <h2 class="b-500 ma-0 mb-10">en vivo</h2>
            <span class="fs-18">
                Con nuestros talleres intensivos te ayudamos a desarrollar las habilidades
                necesarias para lograr tus metas y tomar decisiones clave en tu vida.
            </span>
            <a href="workshops.html">
                <button class="btn btn-primary btn-cta d-flex align-items-center mt-35 pl-60 pr-60 b-600">Unite al próximo encuentro</button>
            </a>
        </div>
        <div>
            <img src="assets/images/workshops.png" style="transform: translateX(50px)">
        </div>
    </div>
</main>

<?php get_footer(); ?>
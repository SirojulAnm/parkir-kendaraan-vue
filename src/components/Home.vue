<template>
    <div class="p-5 bg-dark text-light row">
        <div class="container-fluid py-5 col-md-6">
            <h1 class="display-8 fw-bold">Lorem Ipsum</h1>
            <p class="col-md-8 fs-4">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable</p>
        </div>
        <div class="container-fluid py-5 col-md-6">
            <img src="./../assets/card-portrait-tiny.png" class="img-circle" alt="Photo" style="width:90%">
        </div>
        <Carousel :items-to-show="3" :wrap-around="true">
            <Slide v-for="item in this.slides" :key="`item-${item}`">
                <!-- <div class="carousel__item">{{ slide }}</div> -->
                <img :src="`${item}`" class="card-img-top" :alt="`cover for ${item}`">
            </Slide>

            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import { Carousel, Navigation, Slide } from 'vue3-carousel';
    import 'vue3-carousel/dist/carousel.css';

    export default defineComponent({
        name: 'Home',
        components: {
            Carousel,
            Slide,
            Navigation,
        },
        data: () => ({
            slides: [
                "https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
                "https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
                "https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
                "https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
            ]
        })
    });
</script>

<style scoped>  

</style>
<template>
    <div class="content-user-avatar">
        <span class="first-letter">{{ firstLetter }} </span>
        <!-- <img :src="imgUser" v-if="imgUser" alt="Foto perfil usuario" /> -->
    </div>
</template>

<script>
export default {
    name: 'AvatarUser',
    props: ['firstLetter']    
}
</script>

<style scoped>
.content-user-avatar {
    width: 10rem;
    height: 10rem;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}
span.first-letter {
    font-size: 6rem;
    color: #a133b4;
}
</style>
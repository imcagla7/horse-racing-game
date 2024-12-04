<script>
import { mapActions } from 'vuex';
import HorseList from './HorseList.vue';
import RaceSchedule from './RaceSchedule.vue';
import RacingField from './RacingField.vue';
import AppHeader from './AppHeader.vue';

export default {
    name: "MainPage",
    components: {
        HorseList, RaceSchedule, RacingField, AppHeader
    },
    methods: {
        ...mapActions(['generateHorses']),
    },
    mounted() {
        // generateHorses when the page is loaded
        this.generateHorses();
    },
};
</script>
<template>
    <AppHeader />
    <div class="race-container">
        <RacingField />
        <HorseList />
    </div>
    <RaceSchedule />
</template>

<style scoped>
.race-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    margin-bottom: 20px;
    margin-top: 80px;
}

@media (max-width: 480px) {
    .race-container {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}
</style>

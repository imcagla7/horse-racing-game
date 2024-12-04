<script>
import { mapState } from 'vuex';
import AppTable from './AppTable.vue';

export default {
    name: "RaceSchedule",
    components: { AppTable },
    methods: {
        sortHorsesByScore(horses) {
            return [...horses].sort((a, b) => (a.score ?? 11) - (b.score ?? 11));
        },
    },
    computed: {
        ...mapState(['raceSchedule']),
        sortedRaceSchedule() {
            return this.raceSchedule.map((schedule) => ({
                ...schedule,
                horses: this.sortHorsesByScore(schedule.horses),
            }));
        },
    },
};
</script>

<template>
    <div :class="{ 'race-schedule-container': raceSchedule.length }">
        <div class="schedule-table">
            <AppTable v-for="(schedule) in raceSchedule" :key="schedule.round" :header="`Scheduled ${schedule.label}`"
                :columns="['position', 'name']"
                :data="schedule.horses.map(horse => ({ position: horse.position, name: horse.name }))" />
        </div>
        <div class="schedule-table">
            <AppTable v-for="(schedule) in sortedRaceSchedule" :key="schedule.round"
                :header="`Result of ${schedule.label}`" :columns="['score', 'name']"
                :data="schedule.horses.map(horse => ({ name: horse.name, score: horse?.score ?? '-' }))" />
        </div>
    </div>
</template>

<style scoped>
.schedule-table {
    display: grid;
}

.race-schedule-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
    overflow-y: scroll;
    height: 270px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
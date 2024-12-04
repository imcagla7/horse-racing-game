<script>
import { mapState } from 'vuex';
import AppTable from './AppTable.vue';

export default {
    name: "HorseList",
    computed: {
        ...mapState(['horses']),
        formattedHorses() {
            return this.horses.map(horse => ({
                color: horse.color,
                condition: horse.condition,
                name: horse.name,
            }));
        },
        horseListColumns() {
            return ['name', 'condition', 'color'];
        },
    },
    components: { AppTable }
};
</script>

<template>
    <div class="horse-list">
        <AppTable :header="'Horse List'" :columns="horseListColumns" :data="formattedHorses" />
    </div>
</template>


<style scoped>
.horse-list {
    display: grid;
    max-height: 510px;
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
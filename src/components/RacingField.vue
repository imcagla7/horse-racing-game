<script>
import { mapState } from 'vuex';

export default {
    name: "RacingField",
    computed: {
        ...mapState(['raceSchedule', 'raceRound', 'raceLength']),
    },
    data() {
        return {
            tracks: Array.from({ length: 10 }, (_, i) => i + 1),
        };
    },
};
</script>

<template>
    <table>
        <caption class="title">{{ raceSchedule[raceRound - 1]?.label }}
        </caption>
        <thead>
            <tr>
                <th class="finish-text">Finish</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="track in tracks" :key="track">
                <td class="track-start">
                    <p class="track-text">{{ track }}</p>
                </td>
                <td :style="{
                    position: 'relative',
                    left: (raceSchedule[raceRound - 1]?.horses[track - 1]?.distance / raceLength) * 95 + '%'
                }">
                    <img :style="{ width: '30px', backgroundColor: raceSchedule[raceRound - 1]?.horses[track - 1]?.color }"
                        src="../assets/horse.svg" alt="horse-icon" />
                </td>
            </tr>
        </tbody>
    </table>
</template>



<style scoped>
table {
    border-collapse: collapse;
    margin-right: 50px;
    border-right: 3px solid rgb(216, 0, 0);
}

td {
    text-align: left;
    border: 1px solid #ddd;
}

.track-start {
    width: 40px;
    background-color: darkgreen;
    color: white;
    text-align: center;
    font-size: 14px;
}

.track-text {
    transform: rotate(-90deg);
}

.title {
    font-weight: bold;
    font-size: 16px;
}

.finish-text {
    position: relative;
    left: 100%;
    color: rgb(216, 0, 0);
    font-weight: bold;
}

.horse-svg {
    width: 25px;
}
</style>
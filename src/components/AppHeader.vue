<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: "AppHeader",
    computed: {
        ...mapState(['raceInProgress', 'raceSchedule', 'isRaceFinished']),
        isGenerateDisabled() {
            return this.raceInProgress || this.isRaceFinished;
        },
        isStartDisabled() {
            return this.raceInProgress || !this.raceSchedule.length || this.isRaceFinished;
        },
        isResetDisabled() {
            return !this.isRaceFinished;
        },
    },
    methods: {
        ...mapActions(['generateSchedule', 'startRace', 'resetGame']),
    },
};
</script>

<template>
    <div class="header">
        <button :class="{ 'button-disabled': isGenerateDisabled }" @click="generateSchedule"
            :disabled="isGenerateDisabled">Generate Schedule</button>
        <button :class="{ 'button-disabled': isStartDisabled }" @click="startRace" :disabled="isStartDisabled">Start
            Race</button>
        <button :class="{ 'button-disabled': isResetDisabled }" @click="resetGame" :disabled="isResetDisabled">Reset
            Game</button>
    </div>
</template>

<style scoped>
.header {
    border-bottom: 1px solid darkgreen;
    position: absolute;
    width: 100%;
    height: 70px;
    top: 0;
    left: 0;
    margin-bottom: 10px;
    background-color: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

button {
    background-color: white;
    padding: 7px;
    border-radius: 10px;
    border: 1px solid darkgreen;
    cursor: pointer;
    transition: 0.3s;
    color: darkgreen;
}

button:hover {
    background-color: darkgreen;
    border: 1px solid white;
    color: white;
}

.button-disabled {
    pointer-events: none;
    color: #9a9999;
    border-color: #9a9999;
    background-color: white;
}
</style>
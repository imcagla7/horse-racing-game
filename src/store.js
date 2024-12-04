import { createStore } from 'vuex'
import { horseSpeed, rounds } from './constants'

const store = createStore({
  state() {
    return {
      horses: [],
      raceSchedule: [],
      raceInProgress: false,
      raceRound: 1,
      raceLength: 1200,
      isRaceFinished: false,
    }
  },
  mutations: {
    setHorses(state, horses) {
      state.horses = horses
    },
    setRaceSchedule(state, schedule) {
      state.raceSchedule = schedule
    },
    setRaceRound(state, round) {
      state.raceRound = round
    },
    setRaceLength(state, length) {
      state.raceLength = length
    },
    updateProgress(state, payload) {
      let isRaceFinished = false
      const scores = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1']
      const interval = setInterval(() => {
        const roundHorses = state.raceSchedule[payload.raceRound - 1].horses

        roundHorses.forEach((horse) => {
          if (!horse.isFinished) {
            horse.distance += (horse.condition / 100) * horseSpeed * 0.01 // 10ms'de kac m yol alir

            if (horse.distance >= payload.raceLength) {
              horse.distance = payload.raceLength
              horse.isFinished = true
              horse.score = scores.pop()
            }
          }
        })

        isRaceFinished = roundHorses.every((horse) => horse.isFinished)

        if (isRaceFinished) {
          clearInterval(interval)
        }
      }, 10)
    },
    setRaceInProgress(state, status) {
      state.raceInProgress = status
    },
    resetGame(state) {
      state.isRaceFinished = false
      state.raceSchedule.forEach((round) => {
        round.horses.forEach((horse) => {
          horse.distance = 0
          horse.isFinished = false
          horse.score = undefined
        })
      })
    },
  },
  actions: {
    generateHorses({ commit }) {
      const prefixes = [
        'Thunder',
        'Shadow',
        'Golden',
        'Silver',
        'Swift',
        'Majestic',
        'Royal',
        'Fierce',
        'Storm',
        'Lightning',
      ]
      const suffixes = [
        'Blaze',
        'Stride',
        'Runner',
        'Wing',
        'Hoof',
        'Flash',
        'Spirit',
        'Dash',
        'Star',
        'Comet',
      ]

      const horses = Array.from({ length: 20 }, () => {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
        const color = '#' + (Math.random().toString(16) + '000000').substring(2, 8)
        const condition = Math.floor(Math.random() * 100) + 1

        return { name: `${prefix} ${suffix}`, color, condition, distance: 0 }
      })

      commit('setHorses', horses)
    },

    generateSchedule({ commit }) {
      const schedule = Array.from({ length: rounds.length }, (_, index) => {
        const horses = JSON.parse(JSON.stringify(this.state.horses))
        const selectedRandomHorses = horses.sort(() => 0.5 - Math.random()).slice(0, 10)
        const finalHorses = selectedRandomHorses.map((horse, idx) => ({
          ...horse,
          position: idx + 1,
        }))

        return {
          round: rounds[index].number,
          label: `Lap ${rounds[index].number} - ${rounds[index].length}m`,
          horses: finalHorses,
        }
      })
      commit('setRaceRound', rounds[0].number)
      commit('setRaceLength', rounds[0].length)
      commit('setRaceSchedule', schedule)
    },

    startRace({ commit, state }) {
      commit('setRaceInProgress', true)
      let currentRound = 0

      const updateProgress = () => {
        if (currentRound >= rounds.length) {
          commit('setRaceInProgress', false)
          state.isRaceFinished = true
          return
        }
        commit('setRaceRound', rounds[currentRound].number)
        commit('setRaceLength', rounds[currentRound].length)
        commit('updateProgress', {
          raceLength: rounds[currentRound].length,
          raceRound: rounds[currentRound].number,
        })
        let minCondition = 100
        state.raceSchedule[rounds[currentRound].number - 1].horses.forEach((horse) => {
          if (horse.condition < minCondition) minCondition = horse.condition
        })

        const duration = rounds[currentRound].length / (horseSpeed * minCondition * 0.01)
        currentRound++
        setTimeout(updateProgress, duration * 1000 + 1000)
      }
      updateProgress()
    },

    resetGame({ commit }) {
      commit('resetGame')
    },
  },
})

export default store

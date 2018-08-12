<template>
    <div class="star-rating">
        <div class="star-rating">
            <span class="label-value label-left" v-if="totalVotes && labelPos == 'left'">{{totalVotes}}</span>
            <span v-for="n in maxRating" :key="n" class="star-rating-star">
              <star :fill="fillLevel[n-1]" :size="starSize" :star-id="n" :step="step" :active-color="activeColor" :inactive-color="inactiveColor" :border-color="borderColor" :border-width="borderWidth" :padding="padding"></star>
            </span>
            <small class="label-value label-right" v-if="totalVotes && labelPos == 'right'"><b>{{totalVotes}}</b></small>
        </div>
    </div>
</template>

<script type="text/javascript">
    import star from './Star.vue'
    export default {
        components: {
            star
        },
        props: {
            increment: {
                type: Number,
                default: 1
            },
            rating: {
                type: Number,
                default: 0
            },
            roundStartRating: {
                type: Boolean,
                default: true
            },
            activeColor: {
                type: String,
                default: '#ffd055'
            },
            inactiveColor: {
                type: String,
                default: '#d8d8d8'
            },
            maxRating: {
                type: Number,
                default: 5
            },
            starSize: {
                type: Number,
                default: 50
            },
            showRating: {
                type: Boolean,
                default: true
            },
            textClass: {
                type: String,
                default: ''
            },        
            borderColor: {
                type: String,
                default: '#999'
            },
            borderWidth: {
                type: Number,
                default: 0
            },
            padding: {
                type: Number,
                default: 0
            },        
            fixedPoints: {
                type: Number,
                default: null
            },
            totalVotes: {
                type: Number,
                default: 0
            },
            labelPos: {
                type: String,
                default: 'right'
            }
        },
        created() {
            this.step = this.increment * 100
            this.currentRating = this.rating
            this.selectedRating = this.currentRating
            this.createStars(this.roundStartRating)
        },
        methods: {
            createStars(round = true) {
                if (round) {
                    this.round()
                }
                for (var i = 0; i < this.maxRating; i++) {
                    let level = 0
                    if (i < this.currentRating) {
                        level = (this.currentRating - i > 1) ? 100 : (this.currentRating - i) * 100
                    }
                    this.$set(this.fillLevel, i, Math.round(level))
                }
            },
            round() {
                var inv = 1.0 / this.increment
                this.currentRating = Math.min(this.maxRating, Math.ceil(this.currentRating * inv) / inv)
            }
        },
        computed: {
            formattedRating() {
                return (this.fixedPoints === null) ? this.currentRating : this.currentRating.toFixed(this.fixedPoints)
            },
            shouldRound() {
                return this.ratingSelected || this.roundStartRating
            }
        },
        watch: {
            rating(val) {
                this.currentRating = val
                this.selectedRating = val
                this.createStars()
            }
        },
        data() {
            return {
                step: 0,
                fillLevel: [],
                currentRating: 0,
                selectedRating: 0,
                ratingSelected: false
            }
        }
    }
</script>

<style>
    .star-rating .label-right {
        margin-left: 5px;
    }
</style>
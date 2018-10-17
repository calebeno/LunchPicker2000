<template>
    <div>
        <h2>Lunch Picker 2000</h2>
        <h3 class="primary" v-if="showPrimary()">{{ primary }}</h3>
        <h3 class="alts" v-if="alts"><span v-for="alt in alts">{{ alt.name }}</span></h3>
        <h3>Attendee List:</h3>
        <ul class="attendee-list">
            <li v-for="attendee in lunchAttendees">
                <!--{{ attendee.name }}-->
                <AttendeeTile v-bind:attendee="attendee" v-on:disable-all="disableAllPlacesForAttendees"/>
            </li>
        </ul>
        <div class="clear"></div>
        <h3>Restaurant List:</h3>
        <ul class="food-list">
            <li v-for="foodPlace in foodPlaces" v-bind:class="{'ok-option': foodPlace.okOption}"
                v-on:click="setOption(foodPlace)">
                {{ foodPlace.name }}
            </li>
        </ul>
        <div class="clear"></div>
        <div class="gen-food" v-on:click="generate">
            Generate
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {FoodPlace, FoodPlacesToEat, LunchAttendee} from '../../models/picker.model';
    import AttendeeTile from '../AttendeeTile/AttendeeTile.vue';

    const ATTENDEES_URL = 'https://wt-c9692eeb1a6b9318315707773d5d6972-0.sandbox.auth0-extend.com/Lunch2000/attendees';
    const FOOD_URL = 'https://wt-c9692eeb1a6b9318315707773d5d6972-0.sandbox.auth0-extend.com/Lunch2000/food';
    @Component({
        components: {AttendeeTile},
    })
    export default class Picker extends Vue {
        // @Prop() private msg!: string;

        public lunchAttendees: LunchAttendee[] = [];
        public foodPlaces: FoodPlace[] = [];
        public primary: FoodPlacesToEat = FoodPlacesToEat.None;
        public alts: FoodPlacesToEat[] = [];

        public created() {
            this.fetchFoodPlacesFromServer();
            this.fetchLunchAttendeesFromServer();
        }

        public showPrimary() {
            return this.primary !== FoodPlacesToEat.None;
        }

        // public setGoing(attendee: LunchAttendee) {
        //     attendee.goingToday = !attendee.goingToday;
        //     this.disableAllPlacesForAttendees();
        // }

        public setOption(foodPlace: FoodPlace) {
            foodPlace.okOption = !foodPlace.okOption;
        }

        public generate() {
            const attending = this.getConfirmedAttendees();
            const acceptable: FoodPlace[] = this.foodPlaces.filter((place: FoodPlace) => place.okOption)
                .filter((place: FoodPlace) => {
                    return !attending.some((attendee: LunchAttendee) => {
                        return attendee.dislikes.some((dislike: FoodPlacesToEat) => dislike === place.name);
                    });
                });
            if (acceptable.length) {
                this.primary = acceptable[Math.floor(Math.random() * acceptable.length)].name;
            }
        }

        public disableAllPlacesForAttendees() {
            const attending = this.getConfirmedAttendees();
            const dislikeList = this.foodPlaces.filter((place: FoodPlace) => {
                return attending.some((attendee: LunchAttendee) => {
                    return attendee.dislikes.some((dislike: FoodPlacesToEat) => dislike === place.name);
                });
            });
            this.foodPlaces.forEach((place: FoodPlace) => {
                place.okOption = !dislikeList.some((dislikePlace: FoodPlace) => dislikePlace.name === place.name);
            });
        }

        private getConfirmedAttendees(): LunchAttendee[] {
            return this.lunchAttendees.filter((attendee: LunchAttendee) => attendee.goingToday);
        }

        private fetchLunchAttendeesFromServer() {
            (Vue as any).http.get(ATTENDEES_URL)
                .then((res: any) => {
                    // console.log(res.body);
                    this.lunchAttendees = res.body;
                });
        }

        private fetchFoodPlacesFromServer() {
            (Vue as any).http.get(FOOD_URL)
                .then((res: any) => {
                    // console.log(res.body);
                    this.foodPlaces = res.body;
                });
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    ul {
        list-style: none;
    }

    li {
        display: block;
        margin: 8px;
    }

    ul.food-list li {
        display: block;
        float: left;
        width: 200px;
        height: 40px;
        background-color: red;
        border-radius: 5px;
        border: 2px black solid;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        color: black;
    }

    ul.food-list li.ok-option {
        background-color: green;
        color: white;
    }

    h2 {
        font-size: 20pt;
        font-weight: bold;
        margin-bottom: 15px;
        text-align: center;
    }

    h3 {
        font-weight: bold;
        margin-left: 10px;
    }

    h3.primary {
        text-align: center;
        height: 100px;
        line-height: 100px;
        background-color: gold;
    }

    .gen-food {
        width: 300px;
        height: 40px;
        background-color: darkred;
        border-radius: 5px;
        cursor: pointer;
        margin: 5px auto;
        text-align: center;
        line-height: 40px;
        font-size: 20pt;
        color: lightgray;
    }

    .gen-food:hover {
        background-color: red;
        color: white;
    }

    .clear {
        clear: both;
    }

</style>

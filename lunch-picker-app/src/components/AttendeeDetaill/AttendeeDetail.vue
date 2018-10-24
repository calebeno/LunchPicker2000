<template>
    <div>
        <div class="attendee-display-details">
            <div class="attendee-name">
                <span v-if="!editMode">{{ attendee.name }}</span>
                <input v-if="editMode" v-model="attendee.name">
            </div>
            <div class="attendee-edit" v-on:click="toggleAttendeeEdit">
                <span v-if="!editMode">EDIT</span>
                <span v-if="editMode">SAVE</span>
            </div>
            <div class="attendee-exit" v-on:click="deselectAttendee">X</div>
            <div class="clear"></div>
            <div class="attendee-detail">
                <div>Food Preferences:</div>
                <ul class="detail-food-list">
                    <li v-if="!editMode"
                        v-for="foodPlace in foodPlaces"
                        v-bind:class="{'dislikes': dislikesPlace(foodPlace)}">
                        {{foodPlace.name}}
                    </li>
                    <li v-if="editMode"
                        v-for="foodPlace in foodPlaces"
                        class="selectable"
                        v-bind:class="{'dislikes': dislikesPlace(foodPlace)}"
                        v-on:click="toggleLikeDislike(foodPlace)">
                        {{foodPlace.name}}
                    </li>
                </ul>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {FoodPlace, FoodPlacesToEat, LunchAttendee} from '../../models/picker.model';
    import {UpdateDislikesBody} from '../../../../lunch-picker-server/types/api.js';

    const UPDATE_DISLIKES_URL = 'https://wt-c9692eeb1a6b9318315707773d5d6972-0.sandbox.auth0-extend.com/Lunch2000/updateDislikes';

    @Component
    export default class AttendeeDetail extends Vue {
        editMode = false;

        @Prop() private attendee!: LunchAttendee;
        @Prop() private foodPlaces!: FoodPlace[];

        dislikesPlace(foodPlace: FoodPlace) {
            return this.attendee.dislikes.some((place: FoodPlacesToEat) => place === foodPlace.name);
        }

        deselectAttendee() {
            this.$emit('deselect-attendee');
        }

        toggleAttendeeEdit() {
            if (!this.editMode) {
                this.editMode = true;
            } else {
                let dislikeUpdateBody: UpdateDislikesBody = {
                    attendeeName: this.attendee.name,
                    newDislikeList: this.attendee.dislikes
                };

                (Vue as any).http.put(UPDATE_DISLIKES_URL, dislikeUpdateBody)
                    .then(() => {
                        this.editMode = false;
                    })
                    .catch((err: any) => {
                        console.log(err);
                    });
            }
        }

        toggleLikeDislike(foodPlace: FoodPlace) {
            let dislikesPlace = this.attendee.dislikes.some((place: FoodPlacesToEat) => place === foodPlace.name);
            if (dislikesPlace) {
                let placeIndex = this.attendee.dislikes.indexOf(foodPlace.name);
                this.attendee.dislikes.splice(placeIndex, 1);
            } else {
                this.attendee.dislikes.push(foodPlace.name);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .attendee-detail {
        width: calc(100% - 100px);
        min-height: 10px;
        padding: 5px 50px;
        background-color: #aac5ed;
    }

    .attendee-name {
        width: calc(100% - 120px);
        padding: 5px 10px;
        border-top-left-radius: 4px;
        background-color: cornflowerblue;
        text-align: left;
        float: left;

        input {
            height: 100%;
            margin: 0;
            padding: 0;
            border: none;
            display: inline-block;
        }
    }

    .attendee-edit {
        width: 40px;
        height: 100%;
        float: left;
        padding: 5px 10px;
        background-color: green;
        color: white;
        cursor: pointer;

        &:hover {
            background-color: darkgreen;
        }
    }

    .attendee-exit {
        width: 20px;
        height: 100%;
        float: right;
        padding: 5px 10px;
        border-top-right-radius: 4px;
        background-color: black;
        color: white;
        cursor: pointer;
    }

    ul.detail-food-list {
        list-style: none;
    }
    ul.detail-food-list li {
        display: block;
        float: left;
        width: 150px;
        height: 20px;
        border-radius: 3px;
        margin: 5px;
        color: black;
        background-color: #7de389;
        border: 1px solid #7de389;
        font-size: 14px;
        line-height: 20px;

        &.selectable {
            border: 1px white solid !important;
            cursor: pointer;
        }

        &.dislikes {
            color: white;
            background-color: #9c1e1e;
            border: 1px solid #9c1e1e;
        }
    }
</style>

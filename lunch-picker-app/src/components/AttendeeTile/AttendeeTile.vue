<template>
    <div class="attendee"
         v-bind:class="{'going': attendee.goingToday}">
        <div class="info-toggle"
             v-on:click="selectAttendee()">
            {{ attendee.name }}
        </div>
        <div class="going-toggle"
             v-on:click="setGoing()">
            <span v-if="attendee.goingToday">YES</span>
            <span v-if="!attendee.goingToday">NO</span>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {LunchAttendee} from '../../models/picker.model';

    @Component
    export default class AttendeeTile extends Vue {
        @Prop() private attendee!: LunchAttendee;

        setGoing() {
            this.attendee.goingToday = !this.attendee.goingToday;
            this.$emit('disable-all');
        }

        selectAttendee() {
            this.$emit('select-attendee', this.attendee);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .attendee {
        display: block;
        float: left;
        margin: 5px;
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;

        &.going {
            .info-toggle {
                background-color: #78B99B;
            }

            .going-toggle {
                background-color: #42b983;
            }
        }

        .info-toggle {
            border-bottom-left-radius: 5px;
            border-top-left-radius: 5px;
            display: inline-block;
            width: 100px;
            background-color: #5c5c5c;
            color: black;

            &:hover {
                color: lightgrey;
            }
        }

        .going-toggle {
            border-bottom-right-radius: 5px;
            border-top-right-radius: 5px;
            display: inline-block;
            width: 50px;
            background-color: #2c2c2c;
            color: white;
        }
    }
</style>

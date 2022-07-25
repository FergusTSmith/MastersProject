<!----https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f--->

<script>
export default {
    props: {
        timeToGo: {
            type: Number,
            required: true
        }
    }
}</script>

<template>
  <div class="base-timer">
    <svg
      class="base-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle
          class="base-timer__path-elapsed"
          cx="50"
          cy="50"
          r="46.5"
        />
      </g>
    </svg>
    <span class="base-timer__label">
      {{ formatTimeLeft }}
    </span>
  </div>
</template>

<style scoped lang="scss">
/* https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f */
.base-timer {
  align-self: center;
  width: 100px;
  height: 100px;
}

.base-timer__circle {
  fill: none;
  stroke: none;
  align-self: center;
}
.base-timer__path-elapsed {
  stroke-width: 5px;
  stroke: grey;
}

.base-timer__label {
  position: absolute;
  width: 100px;
  height: 100px;

  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}


</style>
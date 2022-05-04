<template>
  <svg
    class="svg-icon"
    :ref="`${name}`"
    :style="{
      width: width + 'px',
      height: height + 'px',
      color: color
    }"
    @mousedown="clickIcon"
  >
    <use
      :xlink:href="`#icon-${name}`"
      :fill="color"
    />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
      default: "email"
    },
    width: {
      type: Number,
      default: 16
    },
    height: {
      type: Number,
      default: 16
    },
    color: {
      type: String,
      default: "#000"
    }
  },
  mounted() {
  
  },
  methods: {
    clickIcon () {
      
    }
  }
};
</script>
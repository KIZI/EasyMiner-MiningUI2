<template>
  <div />
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
  computed: {
    double: () => this.count * 2,
  },
  methods: {
    increment() {
      this.count++
    },
  },
}
</script>

<template>
  <div>
    <h5 style="color: #f97737">{{ notif.kodeNotifikasi | removeDash }}</h5>
    <p>
      <small>{{ notif.keterangan }}</small>
    </p>
    <p
      style="
        margin-top: -10px;
        font-size: 13px;
        margin-bottom: 0px;
        color: #484848;
      "
    >
      <small>{{ notif.waktuNotifikasi }}</small>
    </p>
  </div>
</template>
<script>
export default {
  filters: {
    removeDash(value) {
      if (!value) return ''
      value = value.toString()
      return value.replace('-', ' ')
    },
  },
  props: {
    notif: {
      type: Object,
      required: true,
    },
  },
}
</script>

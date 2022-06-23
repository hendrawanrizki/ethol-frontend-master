<template>
  <div>
    <h1 style="color: #015171">{{ judulLaman }}</h1>
    <v-breadcrumbs
      :items="breadcrumbItem"
      style="padding-left: 1px; padding-top: 5px; padding-bottom: 13px"
    >
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>
<script>
export default {
  props: {
    breadcrumbItem: {
      type: Array,
      required: true,
    },
    judulLaman: {
      type: String,
      required: true,
    },
  },
}
</script>

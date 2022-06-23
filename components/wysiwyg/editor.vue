<template>
  <ClientOnly>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify v-model="content" :extensions="extensions" />

    <template #placeholder> Loading... </template>
  </ClientOnly>
</template>

<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Underline,
  // Strike,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  // Blockquote,
  // HardBreak,
  // HorizontalRule,
  History,
} from 'tiptap-vuetify'

export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  data: () => ({
    // declare extensions you want to use
    extensions: [
      History,
      // Blockquote,
      Link,
      Bold,
      Italic,
      Underline,
      // Strike,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],

      // HorizontalRule,
      Paragraph,
      // HardBreak,
    ],
    // starting editor's content
    content: `
      <p>Tuliskan <strong>disini... !</strong></p>
    `,
  }),
  watch: {
    content(v) {
      this.$emit('updatecontent', v)
    },
  },
  methods: {
    assignContent(datanya) {
      this.content = datanya
    },
  },
}
</script>

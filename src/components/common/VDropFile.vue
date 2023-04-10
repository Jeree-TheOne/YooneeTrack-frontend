<template>
  <div class="main">
    <div
      class="dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        type="file"
        multiple
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <label for="fileInput" class="file-label">
        <div v-if="isDragging">Release to drop files here.</div>
        <div v-else>Drop files here or <u>click here</u> to upload.</div>
      </label>
      
    </div>
    <div class="preview-container" v-if="files.length">
        <div v-for="file in files" :key="file.name" class="preview-card">
          <div class="preview-card__image-name">
            <img class="preview-img" :src="generateURL(file)" />
            <div class="preview-card__name">
              {{ file.name }}
            </div>
          </div>
          <div>
            <v-button
              icon
              size="20"
              @click="remove(files.indexOf(file))"
            >
              <v-icon size="20" name="crossIcon"/>
            </v-button>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import VButton from './VButton.vue';
import VIcon from './VIcon.vue';

export default defineComponent({
  components: {
    VButton,
    VIcon,
  },
  data() {
    return {
      isDragging: false,
      files: [] as any[],
    };
  },
  methods: {
    onChange() {
      if (!(this.$refs.file as any).files.length) return
      this.files = [...(this.$refs.file as any).files];
      this.$emit('changeFiles', this.files)
    },

    dragover(e: Event) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e: DragEvent) {
      e.preventDefault();
      (this.$refs.file as HTMLInputElement).files = (e.dataTransfer as DataTransfer).files;
      this.onChange();
      this.isDragging = false;
    },

    remove(i: any) {
      this.files.splice(i, 1);
    },

    generateURL(file: any) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
          URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
    },
  },
})
</script>

<style lang="scss" scoped>
.main {
    text-align: center;

    width: 100%;
}

.dropzone-container {
    background: $grey-300;
    border: 1px solid $accent;
}

.hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.file-label {
  height: 60px;
  padding: 20px;
    font-size: 20px;
    display: block;
    cursor: pointer;

  & div {
    height: 0;
  }
}

.preview-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
    max-height: 349.6px;
    overflow: hidden;
}

.preview-card {
    display: flex;
    border: 1px solid $accent-light;
    padding: 5px;
    max-width: 170px;
    height: 116.5px;

    &__image-name {
      min-width: 100px;
    }

    &__name {
      overflow: hidden;
      overflow-wrap: break-word;
    }
}

.preview-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #a2a2a2;
    background-color: #a2a2a2;
}
</style>
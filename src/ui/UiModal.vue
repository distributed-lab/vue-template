<template>
  <teleport to="#modal">
    <transition name="ui-modal">
      <div v-show="isShown" class="ui-modal">
        <div class="ui-modal__pane-wrp" ref="modalPaneWrp">
          <slot :close="closeModal" class="ui-modal__pane" :key="String(isShown)" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref } from 'vue'

defineOptions({
  inheritAttrs: false,
})

export type Props = {
  isShown?: boolean
  isCloseByClickOutside?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isShown: false,
  isCloseByClickOutside: true,
})

const emit = defineEmits<{
  (e: 'update:is-shown', value: boolean): void
}>()

const modalPaneWrp = ref<HTMLElement | undefined>()

onMounted(() => {
  if (modalPaneWrp.value) {
    if (props.isCloseByClickOutside) {
      onClickOutside(modalPaneWrp, () => {
        closeModal()
      })
    }
  }
})

const closeModal = () => {
  emit('update:is-shown', false)
}
</script>

<style lang="scss" scoped>
$z-index-local: 100;

.ui-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: vh(100);
  background: rgba(var(--black-rgb), 0.5);
  z-index: $z-index-local;
}

.ui-modal__pane {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: auto;
}

.ui-modal-enter-active,
.ui-modal-leave-active {
  transition: 0.25s ease;
  transition-property: opacity, transform;
}

.ui-modal-enter-from,
.ui-modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>

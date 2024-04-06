<template>
  <div class="ui-accordion" ref="rootEl">
    <div class="ui-accordion__head">
      <slot
        name="head"
        :is-open="isAccordionOpen"
        :toggle="toggleAccordion"
        :open="openAccordion"
        :close="closeAccordion"
      />
    </div>
    <transition
      name="ui-accordion__body-transition"
      @enter="setHeightCSSVar"
      @before-leave="setHeightCSSVar"
    >
      <div v-show="isAccordionOpen" class="ui-accordion__body">
        <slot
          :is-open="isAccordionOpen"
          :toggle="toggleAccordion"
          :open="openAccordion"
          :close="closeAccordion"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

const props = withDefaults(
  defineProps<{
    isOpenedByDefault?: boolean
    isCloseByClickOutside?: boolean
  }>(),
  {
    isOpenedByDefault: false,
    isCloseByClickOutside: true,
  },
)

const rootEl = ref<HTMLElement | null>(null)
// eslint-disable-next-line vue/no-setup-props-destructure
const isAccordionOpen = ref(props.isOpenedByDefault)

onBeforeRouteUpdate(() => {
  closeAccordion()
})

onMounted(() => {
  if (rootEl.value) {
    if (props.isCloseByClickOutside) {
      onClickOutside(rootEl, () => {
        closeAccordion()
      })
    }
  }
})

const toggleAccordion = () => {
  isAccordionOpen.value ? closeAccordion() : openAccordion()
}
const closeAccordion = () => {
  isAccordionOpen.value = false
}
const openAccordion = () => {
  isAccordionOpen.value = true
}

const setHeightCSSVar = (element: Element) => {
  ;(element as HTMLElement).style.setProperty(
    '--ui-accordion-body-height',
    `${element.scrollHeight}px`,
  )
}
</script>

<style lang="scss" scoped>
.ui-accordion__body {
  overflow: hidden;
}

.ui-accordion__body-transition-enter-active {
  animation: ui-accordion-frame-keyframes 0.25s ease-in-out;
}

.ui-accordion__body-transition-leave-active {
  animation: ui-accordion-frame-keyframes 0.25s ease-in-out reverse;
}

@keyframes ui-accordion-frame-keyframes {
  from {
    height: 0;
  }

  to {
    height: var(--ui-accordion-body-height);
  }
}
</style>

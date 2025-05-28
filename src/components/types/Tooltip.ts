import { type TooltipContentProps } from 'radix-vue'
import { type HTMLAttributes } from 'vue'

export interface TooltipProps {
  text?: string
  hoverDelay?: number
  placement?: TooltipContentProps['side']
  arrowClass?: HTMLAttributes['class']
  disabled?: boolean
}

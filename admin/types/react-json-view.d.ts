// types/react-json-view.d.ts
declare module 'react-json-view' {
  import { ComponentType } from 'react'
  
  interface ReactJsonViewProps {
    src: object | any[]
    name?: string | false
    theme?: string | object
    iconStyle?: 'circle' | 'triangle' | 'square'
    indentWidth?: number
    collapsed?: boolean | number
    collapseStringsAfterLength?: number
    groupArraysAfterLength?: number
    enableClipboard?: boolean | ((copy: any) => void)
    displayObjectSize?: boolean
    displayDataTypes?: boolean
    onEdit?: (edit: any) => boolean | void
    onAdd?: (add: any) => boolean | void
    onDelete?: (del: any) => boolean | void
    onSelect?: (select: any) => void
    sortKeys?: boolean
    quotesOnKeys?: boolean
    validationMessage?: string
    shouldCollapse?: (field: any) => boolean
    style?: React.CSSProperties
  }

  const ReactJson: ComponentType<ReactJsonViewProps>
  export default ReactJson
}
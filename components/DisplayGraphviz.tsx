'use client'
import type { Engine, GraphvizOptions } from 'd3-graphviz'
import { graphviz } from 'd3-graphviz'
import d3 from 'd3'
import PropTypes from 'prop-types'
import React, { MouseEventHandler } from 'react'

export interface IGraphvizRendererProps {
  onClick: MouseEventHandler<HTMLDivElement> | undefined
  /**
   * Source code in  Graphviz DOT Syntax.
   * @see https://graphviz.org/doc/info/lang.html
   */
  code: string
  /**
   * Sets the Graphviz layout engine name to the specified engine string.
   * @default 'dot'
   */
  engine?: Engine
  /**
   * Options to pass to the d3-graphviz.
   */
  options?: GraphvizOptions
  /**
   * Error callback
   */
  onError?(error: string | null): void
}

export const GraphvizRenderer: React.FC<IGraphvizRendererProps> = props => {
  const { code, engine = 'dot', options, onError } = props
  const graphRef = React.useRef<HTMLDivElement>(null)

   var dotSrcLines;


  React.useEffect(() => {
    if (graphRef.current == null) return

    try {
  
     graphviz(graphRef.current, {
        fit: true,
        zoom: true,
        useWorker: false,
        ...options,
      })
        .onerror(onError)
        .engine(engine)
        .renderDot(code)
       
      //We can reference graphRef.current

    } catch (error: any) {
      onError?.(error?.stack ?? error?.message ?? error ?? 'Unexpected error occurred!')
    }

  }, [code, options, engine, onError])
  

  return <div onClick={props.onClick} ref={graphRef} className="detomata-graphviz" />
}

GraphvizRenderer.propTypes = {
  code: PropTypes.string.isRequired,
  engine: PropTypes.oneOf(['circo', 'dot', 'fdp', 'neato', 'osage', 'patchwork', 'twopi']),
  options: PropTypes.any,
  onError: PropTypes.func,
}



GraphvizRenderer.displayName = 'GraphvizRenderer'
export default GraphvizRenderer
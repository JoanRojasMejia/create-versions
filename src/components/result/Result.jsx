import { Button, Card, Tooltip } from 'antd'
import { useEffect, useRef, useState } from 'react'

const ResultComponent = (prop) => {
  const { allMessage } = prop

  const cardMainRef = useRef(null)
  const [maxHeight, setMaxHeight] = useState(0)

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      return false
    }
  }

  const calculateMaxHeight = () => {
    const { current } = cardMainRef
    if (current) {
      const { offsetHeight } = current
      const titleHeight = current.childNodes[0].offsetHeight
      setMaxHeight(offsetHeight - titleHeight - 48)
    }
  }

  useEffect(() => {
    calculateMaxHeight()
  }, [allMessage])

  const CopyIcon = (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '1rem', height: '1rem', fill: '#ffffffd9' }}
    >
      <path d="M672 832 224 832c-52.928 0-96-43.072-96-96L128 160c0-52.928 43.072-96 96-96l448 0c52.928 0 96 43.072 96 96l0 576C768 788.928 724.928 832 672 832zM224 128C206.368 128 192 142.368 192 160l0 576c0 17.664 14.368 32 32 32l448 0c17.664 0 32-14.336 32-32L704 160c0-17.632-14.336-32-32-32L224 128z"></path>
      <path d="M800 960 320 960c-17.664 0-32-14.304-32-32s14.336-32 32-32l480 0c17.664 0 32-14.336 32-32L832 256c0-17.664 14.304-32 32-32s32 14.336 32 32l0 608C896 916.928 852.928 960 800 960z"></path>
      <path d="M544 320 288 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l256 0c17.696 0 32 14.336 32 32S561.696 320 544 320z"></path>
      <path d="M608 480 288.032 480c-17.664 0-32-14.336-32-32s14.336-32 32-32L608 416c17.696 0 32 14.336 32 32S625.696 480 608 480z"></path>
      <path d="M608 640 288 640c-17.664 0-32-14.304-32-32s14.336-32 32-32l320 0c17.696 0 32 14.304 32 32S625.696 640 608 640z"></path>
    </svg>
  )

  return (
    <div className="containerCards">
      <Card
        title="Resultado para los grupos"
        ref={cardMainRef}
        extra={
          <Tooltip title="Copiar en el portapapeles" placement="bottom">
            <Button
              type="primary"
              shape="circle"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => copy(allMessage.group)}
            >
              {CopyIcon}
            </Button>
          </Tooltip>
        }
      >
        <p style={{ whiteSpace: 'pre-line', marginBlock: 0, overflowY: 'overlay', maxHeight }}>
          {allMessage.group}
        </p>
      </Card>
      <Card
        title="Resultado para chat"
        extra={
          <Tooltip title="Copiar en el portapapeles" placement="bottom">
            <Button
              type="primary"
              shape="circle"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => copy(allMessage.chat)}
            >
              {CopyIcon}
            </Button>
          </Tooltip>
        }
      >
        <p style={{ whiteSpace: 'pre-line', marginBlock: 0 }}>{allMessage.chat}</p>
      </Card>
    </div>
  )
}

export default ResultComponent

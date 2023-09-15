import { Button, Checkbox, Form, Input, InputNumber } from 'antd'

const FormComponent = (prop) => {
  const { setAllMessage } = prop

  const wordsToFilter = ['Bug', 'Task', '[']
  const emojis = {
    Task: '📝',
    Bug: '🐛'
  }
  const options = [
    { label: 'Desarrollo', value: 'DEV' },
    { label: 'Calidad', value: 'QA' },
    { label: 'Produccion', value: 'PRD' }
  ]

  const onSubmit = ({ type, version, tasks, sprint, publicactions }) => {
    const stringType = buildCheckStringType(type)
    const objectSorted = buildSort(tasks)
    const [major, minor, patch] = version.split('.')
    const versionFinal = `${major}.${parseInt(minor) + objectSorted.counterType.Task}.${
      parseInt(patch) + objectSorted.counterType.Bug
    }`
    const finalMessageGroup = buildMessageGroup(objectSorted.objectFinal, versionFinal, stringType)
    const finalMessageChat = buildMessageChat(stringType, sprint, publicactions, versionFinal)
    setAllMessage({ group: finalMessageGroup, chat: finalMessageChat })
  }
  const buildCheckStringType = (type) => {
    switch (type.length) {
      case 1:
        return type[0]
      case 2:
        return `${type[0]} y ${type[1]}`
      case 3:
        return `${type[0]}, ${type[1]} y ${type[2]}`
      default:
        return type[0]
    }
  }

  const buildSort = (message) => {
    const messagesFiltered = message.split('\n').filter((item) => {
      if (wordsToFilter.some((word) => item.includes(word))) {
        return item
      }
    })

    const objectSorted = messagesFiltered.reduce(
      (acc, item) => {
        const name = item.substring(item.indexOf(']') + 2)
        if (!Object.keys(acc['objectFinal']).includes(name) && item.includes(']')) {
          acc['objectFinal'][name] = []
          acc['nameAux'] = name
          return acc
        }

        if (item.includes(']')) {
          acc['nameAux'] = name
        }

        if (!item.includes(']')) {
          if (item.includes('Task')) {
            acc['counterType'].Task++
          }
          if (item.includes('Bug')) {
            acc['counterType'].Bug++
          }
          acc['objectFinal'][acc['nameAux']].push(`${emojis[item.split(' ')[0]]} ${item}\n`)
        }

        return acc
      },
      {
        objectFinal: {},
        counterType: { Task: 0, Bug: 0 },
        nameAux: ''
      }
    )

    Object.keys(objectSorted.objectFinal).forEach((key) => {
      objectSorted.objectFinal[key] = objectSorted.objectFinal[key].sort()
    })

    return objectSorted
  }

  const buildMessageGroup = (taskSorted, version, type) => {
    return `✅ Desplegado Web en ${type} (Version: ${version}) ✅\n\n ${Object.keys(taskSorted)
      .map((key) => {
        return `👨🏽‍💻 ${key}:\n\n ${taskSorted[key].join('')}\n`
      })
      .join('')}
    `.trimEnd()
  }

  const buildMessageChat = (type, sprint, publicactions, version) => {
    return `---------------------------- ✅ DESPLIEGUE ${type} (Version: ${version}) - SPRINT ${sprint} - ${publicactions} ✅ -----------------------------`
  }

  return (
    <Form
      onFinish={onSubmit}
      initialValues={{
        type: ['DEV']
      }}
      layout="vertical"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <Form.Item
          name="type"
          label="Entornos:"
          style={{ minWidth: '60%' }}
          rules={[{ required: true, message: 'Seleccione alguno pa' }]}
        >
          <Checkbox.Group options={options} />
        </Form.Item>
        <Form.Item
          name="publicactions"
          label="Nº publicacion:"
          rules={[{ required: true, message: 'Coloque las publicaciones' }]}
          style={{ minWidth: '35%' }}
        >
          <InputNumber />
        </Form.Item>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <Form.Item
          name="version"
          label="Version anterior:"
          rules={[{ required: true, message: 'Sea serio y coloque la version pa' }]}
          style={{ width: '50%' }}
        >
          <Input type="text" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="sprint"
          label="Sprint:"
          rules={[{ required: true, message: 'Sea serio y coloque el sprint pa' }]}
          style={{ width: '50%' }}
        >
          <InputNumber controls={false} />
        </Form.Item>
      </div>

      <Form.Item
        name="tasks"
        label="Tareas:"
        rules={[{ required: true, message: 'Sea serio y coloque las tareas pa' }]}
      >
        <Input.TextArea autoSize={{ minRows: 23, maxRows: 23 }} />
      </Form.Item>
      <Button htmlType="submit">Crear mensajes</Button>
    </Form>
  )
}

export default FormComponent

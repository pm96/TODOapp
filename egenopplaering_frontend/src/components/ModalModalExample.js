import React from 'react'
import { Modal, Input } from 'semantic-ui-react'

const InputExampleAction = ({onUpdateInput, changeTodoName}) => <Input
  action={{
    icon:'save',
    onClick: changeTodoName
  }}
  placeholder='Go for a run...'
  onChange={onUpdateInput}
/>

const ModalExampleTopAligned = ({showModal, onUpdateInput, changeTodoName}) => (
  <Modal open={showModal} centered={false}>
    <Modal.Header>Edit your TODO</Modal.Header>
    <Modal.Content>
      <InputExampleAction onUpdateInput={onUpdateInput} changeTodoName={changeTodoName.bind(this)}/>
    </Modal.Content>
  </Modal>
)

export default ModalExampleTopAligned

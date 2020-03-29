import React from 'react';
import Input from './Input/Input';
import Button from './Button/Button';
import MoreButton from './MoreButton/MoreButton';

const Form = (props) => {
  return (
    <form
      className="form form-inline m-0 px-0 pt-2 pb-3"
      onSubmit={props.handleSubmit}
    >
      <div className="form-group mb-0 w-100">
        <div className="input-group input-group-lg w-100">
          <Input handleChange={props.handleChange} inputValue={props.inputValue} />
          <div className="input-group-append">
            <Button disabled={props.buttonDisable} />
            <MoreButton moreButton={props.moreButton} handleMore={props.handleMore} />
          </div>
        </div>
      </div>
    </form>
  )
}

export default Form
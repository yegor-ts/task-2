import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addNewNote, editNote } from '../../store/reducers/notes';
import { toggleIsVisible, defaultValue as clearForm } from '../../store/reducers/form';

import Label from '../Label/index';
import './Form.css';

type ButtonType = 'submit' | 'reset';
type EventType = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const options = ['Task', 'Idea', 'Random thought', 'Quote'];

const getDates = (content: string) => {
  const reg = /(0?[1-9]|[12]\d|30|31)[^\w\d\r\n:](0?[1-9]|1[0-2])[^\w\d\r\n:](\d{4}|\d{2})/g;
  return content.match(reg)?.join(', ')
};

const createButton = (type: ButtonType, callback: () => void) => (
  <button 
    type={type}
    className={classNames(
      'form__button', [`form__button--${type}`]
    )}
    onClick={(event) => {
      event.preventDefault();
      callback();
    }}
  >
    {type}
  </button>
)

const Form: React.FC = () => {
  const [formData, setFormData] = useState(clearForm);
  const [isVisibleErrMessage, setIsVisibleErrMessage] = useState(false);
  const { isVisible, defaultValue, mode } = useAppSelector(state => state.form);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFormData(defaultValue);
  }, [defaultValue])

  const resetForm = () => {
    setFormData(clearForm);
  }

  const changeFormData = (
    event: React.ChangeEvent<EventType>, 
    key: string
  ) => {
    setFormData((curr) => ({
      ...curr,
      [key]: event.target.value,
    }))
  }

  const showErrorMessage = () => {
    setIsVisibleErrMessage(true);

    setTimeout(() => {
      setIsVisibleErrMessage(false);
    }, 2000)
  }

  const submitForm = () => {
    const { id, name, category, content } = formData;

    if(Object.values(formData).some(value => value.toString().length === 0)) {
      showErrorMessage();
      return;
    }

    if (mode === 'create') {
      const options = { month: 'long', year: 'numeric', day: '2-digit' } as const;
      const NOTE = {
        id: Date.now(),
        name,
        created: new Date(),
        category,
        content,
        dates: getDates(content) || '',
        isArchived: false,
      }
  
      dispatch(addNewNote(NOTE));
    } else {
      const dates = getDates(content) || '';
      dispatch(editNote({ id, name, category, content, dates }));
    }


    resetForm();
    dispatch(toggleIsVisible());
  };

  return (
    <form 
      className={classNames(
        'form', 'main__form', {'form--is-visible': isVisible},
      )}
      id="form" 
      data-type="create"
    >
      {isVisibleErrMessage && (
        <h4 className="form__error-message">
          Please fill all fields
        </h4>)}
      <button 
        className="form__cancel-button"
        onClick={() => {
          resetForm();
          dispatch(toggleIsVisible());
        }}
      />
      <h3 className="form__title">Add new note</h3>
      <Label name="name">
        <input 
          type="text" 
          className="form__input form__input--input" 
          placeholder=" Enter a title" 
          id="name"
          value={formData.name}
          required
          onChange={(event) => {
            changeFormData(event, 'name')
          }}
        />
      </Label>
      <Label name="category">
        <select 
          className="form__input form__input--select" 
          id="category" 
          value={formData.category}
          onChange={(event) => {
            changeFormData(event, 'category');
          }}
        >
          {options.map(option => (
            <option value={option} key={option}>{option}</option>
          ))}
        </select>
      </Label>
      <Label name="content">
        <textarea 
          className="form__input form__input--textarea" 
          placeholder=" Enter a note content" 
          id="content" 
          required
          value={formData.content}
          onChange={(event) => {
            changeFormData(event, 'content');
          }}
        />
      </Label>
      <div className="form__button-block">
        {createButton('reset', resetForm)}
        {createButton('submit', submitForm)}
      </div>
    </form>
  )
}

export default Form;
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import { Form, Input } from 'antd';
import { MdWork, MdAssignment, MdBusiness } from 'react-icons/md';
import { FiUser, FiMail, FiLock, FiUnlock } from 'react-icons/fi';
import { FaSchool } from 'react-icons/fa';
import { IoIosSchool } from 'react-icons/io';
import 'react-toastify/dist/ReactToastify.css';

import { InputDiv } from './styles';

const Text: React.FC<{
  initialValue?: string;
  name: string;
  placeholder: string;
  title: string;
  isPassword?: boolean;
}> = ({ name, placeholder, initialValue, title, isPassword }) => {
  function renderSwitch(param: string) {
    switch (param) {
      case 'name':
        return <FiUser />;
      case 'last_institution':
        return <FaSchool />;
      case 'education_level':
        return <IoIosSchool />;
      case 'currently_company':
        return <MdWork />;
      case 'currently_title':
        return <MdAssignment />;
      case 'own_company':
        return <MdBusiness />;
      case 'email':
        return <FiMail />;
      case 'confirmPassword':
        return <FiUnlock />;
      default:
        return <FiLock />;
    }
  }
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    selected === true ? setSelected(false) : setSelected(true);
  };
  return (
    <InputDiv onBlur={handleClick} onFocus={handleClick} isSelected={selected}>
      <div className="logo">{renderSwitch(name)}</div>
      <div className="holderAndInput">
        <p>{title}</p>

        <Form.Item name={name}>
          {isPassword ? (
            <Input.Password placeholder={placeholder} bordered={false} />
          ) : (
            <Input placeholder={placeholder} bordered={false} />
          )}
        </Form.Item>
      </div>
    </InputDiv>
  );
};

export default Text;

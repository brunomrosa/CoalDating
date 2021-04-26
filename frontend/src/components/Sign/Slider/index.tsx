/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import { Form, Input, Slider } from 'antd';
import { MdWork, MdAssignment, MdBusiness } from 'react-icons/md';
import { FiUser, FiMail, FiLock, FiUnlock } from 'react-icons/fi';
import { FaSchool, FaBirthdayCake } from 'react-icons/fa';
import { IoIosSchool } from 'react-icons/io';
import { BsFillPeopleFill } from 'react-icons/bs';
import 'react-toastify/dist/ReactToastify.css';

import { JsxElement } from 'typescript';
import { InputDiv } from './styles';

const Text: React.FC<{
  initialValue?: string;
  name: string;
  placeholder: string;
  title: string;
  isPassword?: boolean;
}> = ({ name, placeholder, initialValue, title, isPassword }) => {
  /* Função usando switch
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
  } */
  // Object literal
  function renderSwitch(param: string): React.ReactElement {
    const render: { [key: string]: React.ReactElement } = {
      name: <FiUser />,
      last_institution: <FaSchool />,
      education_level: <IoIosSchool />,
      currently_company: <MdWork />,
      currently_title: <MdAssignment />,
      own_company: <MdBusiness />,
      email: <FiMail />,
      confirmPassword: <FiUnlock />,
      birth: <FaBirthdayCake />,
      age: <BsFillPeopleFill />,
    };
    return render[param] || <FiLock />;
  }

  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    selected === true ? setSelected(false) : setSelected(true);
  };
  return (
    <InputDiv onBlur={handleClick} onFocus={handleClick} isSelected={false}>
      <div className="logo">{renderSwitch(name)}</div>
      <div className="holderAndInput">
        <p>{title}</p>

        <Form.Item name={name}>
          <Slider min={18} range defaultValue={[20, 50]} />
        </Form.Item>
      </div>
    </InputDiv>
  );
};

export default Text;

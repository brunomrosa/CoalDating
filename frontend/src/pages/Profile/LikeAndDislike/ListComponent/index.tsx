/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Input, List, Button } from 'antd';
import { FiCheck, FiMinus } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

import { InputDiv, Container } from './styles';
import api from '../../../../services/api';

interface likeStateInterface {
  key: number;
  description: string;
}
interface ListComponentProps {
  isLike?: boolean;
  isDislike?: boolean;
}
const ListComponent: React.FC<ListComponentProps> = ({ isLike, isDislike }) => {
  const [likeList, setLikeList] = useState<likeStateInterface[]>([]);
  const [firstRun, setFirstRun] = useState(true);
  const [loading, setLoading] = useState(false);
  interface likeInterface {
    key: number;
    description: string;
  }
  const [selected, setSelected] = useState(false);
  const [forceEffect, setForceEffect] = useState(false);
  const handleClick = () => {
    selected === true ? setSelected(false) : setSelected(true);
  };
  const appendToLike = (data: likeInterface) => {
    if (likeList.length >= 5) {
      toast.error('You can only have 5!');
      return;
    }
    const likeArray = [...likeList, data];
    setLikeList(likeArray);

    forceEffect ? setForceEffect(false) : setForceEffect(true);
  };
  const removeFromLike = (index: number) => {
    const likeArray = likeList;
    const findItemIndex = likeArray.map(e => e.key).indexOf(index);
    likeArray.splice(findItemIndex, 1);

    // Necessário utilizar o código abaixo porque o UseEffect não estava atualizando a página

    setLikeList(likeArray);
    forceEffect ? setForceEffect(false) : setForceEffect(true);
  };
  useEffect(() => {
    if (firstRun) {
      loadList();
    }
  }, [forceEffect]);

  const saveList = async () => {
    if (isLike) {
      const list = [];
      for (const like of likeList) {
        list.push(like.description);
      }
      await api.put('/users/list', { likes: list });
      toast.success('List Updated');
    }
    if (isDislike) {
      const list = [];
      for (const like of likeList) {
        list.push(like.description);
      }
      await api.put('/users/list', { dislikes: list });
      toast.success('List Updated');
    }
  };
  const loadList = async () => {
    setLoading(true);
    setFirstRun(false);
    const response = await api.get('/users');

    const { likes } = response.data;
    const { dislikes } = response.data;
    let count = 0;
    const formatedList = [];
    if (isLike && likes) {
      for (const like of likes) {
        const formatLike = {
          description: like,
          key: count,
        };
        count += 1;
        formatedList.push(formatLike);
      }
      setLikeList(formatedList);
    }

    if (isDislike && dislikes) {
      for (const like of dislikes) {
        const formatLike = {
          description: like,
          key: count,
        };
        count += 1;
        formatedList.push(formatLike);
      }
      setLikeList(formatedList);
    }
    console.log(formatedList);
    setLoading(false);
  };

  return (
    <Container>
      <div>
        <InputDiv
          onBlur={handleClick}
          onFocus={handleClick}
          isSelected={selected}
        >
          <Form onFinish={appendToLike}>
            <div className="logo">
              <Button htmlType="submit">
                <FiCheck />
              </Button>
            </div>
            <div className="holderAndInput">
              <p>{isLike ? 'Like' : 'Dislike'}</p>
              <Form.Item name="description">
                <Input placeholder="placeholder" bordered={false} />
              </Form.Item>
            </div>
          </Form>
        </InputDiv>
        <List
          itemLayout="horizontal"
          dataSource={likeList}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                key={item.key}
                title={isLike ? 'Like' : 'Dislike'}
                description={
                  <p>
                    {item.description}
                    <button
                      type="button"
                      onMouseDown={() => {
                        removeFromLike(item.key);
                      }}
                    >
                      <FiMinus />
                    </button>
                  </p>
                }
              />
            </List.Item>
          )}
        />
        <button
          onClick={() => {
            saveList();
          }}
          className="saveButton"
        >
          Salvar
        </button>
      </div>
    </Container>
  );
};

export default ListComponent;

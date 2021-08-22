import { useThread, useThreadPool } from "./useThreadPool";
import styled from "styled-components";

export const PanelConatiner = styled.div.attrs((props) => ({
  className: props.className,
}))`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const List = styled.ul.attrs((props) => ({
  className: props.className,
}))``;
export const Header = styled.li.attrs((props) => ({
  className: props.className,
}))`
  display: flex;
  flex-direction: row;
`;
export const Item = styled.li.attrs((props) => ({
  className: props.className,
}))`
  display: flex;
  flex-direction: row;
`;
export const Column = styled.div.attrs((props) => ({
  className: props.className,
}))`
  width: 100px;
  height: 50px;
`;

export const Footer = styled.li.attrs((props) => ({
  className: props.className,
}))`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const Panel = () => {
  const pool = useThreadPool();
  const {
    state: { threads, taskList },
    clickRef,
  } = useThread(pool);
  return (
    <PanelConatiner>
      <List>
        <Header>
          <Column>counter</Column>
          <Column>processing</Column>
          <Column>processed</Column>
        </Header>
        {Object.keys(threads).map((ele) => {
          return (
            <Item>
              <Column>{threads[ele].threadIndex}</Column>
              <Column>{threads[ele].currentTask}</Column>
              <Column>{JSON.stringify(threads[ele].processed)}</Column>
            </Item>
          );
        })}
        <Footer>
          <Column>waitings: {taskList.length}</Column>
          <Column>
            <button ref={clickRef}>
              next: {taskList[taskList.length - 1]}
            </button>
          </Column>
        </Footer>
      </List>
    </PanelConatiner>
  );
};

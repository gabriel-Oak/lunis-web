import { FC, MutableRefObject, useLayoutEffect } from 'react';
import { useAssistant } from '../AssistantContext';
import TextBox from '../text-box';
import { ChantContainer, DialogueContainer, ParagraphContainer, Row, TextBoxContainer } from './styles';

const Chat: FC = () => {
  const { entries, containerRef, scrollChat } = useAssistant();


  useLayoutEffect(scrollChat, [entries]);

  return (
    <ChantContainer
      ref={containerRef as MutableRefObject<HTMLDivElement>}
    >
      {entries.map((entry, index) => (
        <Row isUser={entry.author === 'user'} key={index}>
          <DialogueContainer isUser={entry.author === 'user'}>
            {entry.messages.map((speech, i) => (
              <ParagraphContainer key={i}>
                {speech}
              </ParagraphContainer>
            ))}
          </DialogueContainer>
        </Row>
      ))}

      <TextBox />
    </ChantContainer>
  );
}

export default Chat;
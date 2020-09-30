import styled from "@emotion/styled";
import {  DOMAttributes, FC, forwardRef, ForwardRefRenderFunction, KeyboardEvent, MutableRefObject, Ref, useRef, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { animated, useSpring } from 'react-spring'


type Props = Omit<DOMAttributes<HTMLElement>, 'children' | 'dangerouslySetInnerHTML'> & {
    label?: string;
    defaultValue? : string;
}

const Container = styled.div`
  font-family: sans-serif;
  position: relative;
  width: 200px;
`

const Input = styled(animated(TextareaAutosize))`
  font-family: sans-serif;
  position:absolute;
  padding: 3px;
  left:5px;
  top:10px;
  border: none;
  border-bottom: 1px solid #999;
  resize: none;
  font-size: 22px;
  &:focus {
    outline: none;
  }
`

const Label = styled(animated.label)`
  color:#999; 
  font-size:22px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:8px;
  top:10px;
`

const config = { mass: 1, tension: 410, friction: 20 }
const AutoSizeInput: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (props, userRef) => { 
    const { label, defaultValue, ...rest } = props;
    const [isFocused, setFocus] = useState(false);
    const [inputHeight, setInputHeight] = useState(0);
    const [value, setValue] = useState(defaultValue || '');

    const labelAnimation = useSpring({
      config,
      fontSize: isFocused || !!value ? 12 : 22,
      top: isFocused || !!value ? inputHeight + 20 : 10,
    })

    const inputAnimation = useSpring({
      config: {
        ...config,
        tension:500,
        friction: 50
      },
      fontSize: value?.length >= 40 ? 14 : 22,
    })

    const onKeyDownEvent = (event?: KeyboardEvent<HTMLTextAreaElement>): void => {
      if (event?.key === 'Escape') {
        event?.currentTarget?.blur()
      }
    }
    return (
    <Container {...rest}>
      <Input 
        style={{...inputAnimation}}
        ref={userRef}
        value={value} 
        onKeyDown={onKeyDownEvent}
        onHeightChange={(height) => setInputHeight(height)} 
        onChange={(event) => setValue(event.target.value)} 
        onFocus={() => {setFocus(true)}} 
        onBlur={() => {setFocus(false)}} 
      />

      <Label 
        style={{...labelAnimation}}
        >
        {label}
      </Label>
     
    </Container>
    )
}

export default forwardRef(AutoSizeInput);